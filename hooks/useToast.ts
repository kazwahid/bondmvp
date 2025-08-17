"use client";

export type Toast = {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  durationMs?: number;
};

const EVENT_NAME = "bond:toast";

export function showToast(message: string, type: Toast["type"] = "info", durationMs = 2500) {
  const toast: Toast = { id: crypto.randomUUID(), message, type, durationMs };
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: toast }));
  }
}

export function subscribeToasts(handler: (t: Toast) => void) {
  const listener = (e: Event) => handler((e as CustomEvent).detail as Toast);
  window.addEventListener(EVENT_NAME, listener as EventListener);
  return () => window.removeEventListener(EVENT_NAME, listener as EventListener);
}

