"use client";

import { useEffect } from "react";

/**
 * Background Keep-Alive Heartbeat component.
 * Pings /api/cron/keepalive every 5 minutes while the browser window is active.
 * Ensures the PostgreSQL database and connection poolers remain active with 0s cold starts.
 */
export default function KeepAliveHeartbeat() {
  useEffect(() => {
    // Initial gentle ping on component mount
    const ping = async () => {
      try {
        await fetch("/api/cron/keepalive", { cache: "no-store" });
      } catch {
        // Silently swallow network hiccups
      }
    };

    void ping();

    // 5-minute interval (300,000 ms)
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && !document.hidden) {
        void ping();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
