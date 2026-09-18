import { requirePermission } from "@/lib/auth/permissions";
import { NextResponse } from "next/server";

const allowed = new Map([["image/jpeg", "jpg"], ["image/png", "png"], ["image/webp", "webp"], ["application/pdf", "pdf"]]);
const matchesSignature = (type: string, bytes: Uint8Array) => {
  if (type === "application/pdf") return String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-";
  if (type === "image/png") return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/webp") return String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  return false;
};

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { supabase, user } = await requirePermission("consultations.manage");
    const { id } = await context.params;
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ success: false, message: "Invalid consultation." }, { status: 400 });
    const form = await request.formData(); const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ success: false, message: "Select a file to upload." }, { status: 400 });
    if (!allowed.has(file.type) || file.size === 0 || file.size > 10 * 1024 * 1024) return NextResponse.json({ success: false, message: "Use a JPEG, PNG, WebP, or PDF file up to 10 MB." }, { status: 400 });
    const buffer = await file.arrayBuffer(); const bytes = new Uint8Array(buffer);
    if (!matchesSignature(file.type, bytes)) return NextResponse.json({ success: false, message: "The file contents do not match its declared type." }, { status: 400 });
    const { data: consultation } = await supabase.from("consultations").select("id").eq("id", id).maybeSingle();
    if (!consultation) return NextResponse.json({ success: false, message: "Consultation not found." }, { status: 404 });
    const path = `${id}/${user.id}/${crypto.randomUUID()}.${allowed.get(file.type)}`;
    const { error: uploadError } = await supabase.storage.from("consultation-attachments").upload(path, buffer, { contentType: file.type, upsert: false });
    if (uploadError) throw uploadError;
    const safeName = file.name.replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 180) || "attachment";
    const { error } = await supabase.from("consultation_messages").insert({ consultation_id: id, sender_id: user.id, body: `Shared ${safeName}`, attachment_path: path, attachment_type: file.type === "application/pdf" ? "document" : "image", metadata: { name: safeName, sizeBytes: file.size, size: `${(file.size / 1_048_576).toFixed(1)} MB`, mimeType: file.type } });
    if (error) { await supabase.storage.from("consultation-attachments").remove([path]); throw error; }
    return NextResponse.json({ success: true }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error"; const status = message === "UNAUTHORIZED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ success: false, message: status === 500 ? "Unable to upload the attachment." : message }, { status });
  }
}
