// Server-authoritative in-memory / cache store for attempts and entitlements

declare global {
  var __fort_entitlements_store: Record<string, any[]> | undefined;
  var __fort_attempts_store: Record<string, any> | undefined;
}

if (!global.__fort_entitlements_store) {
  global.__fort_entitlements_store = {};
}

if (!global.__fort_attempts_store) {
  global.__fort_attempts_store = {};
}

export function getEntitlementsStore(): Record<string, any[]> {
  return global.__fort_entitlements_store!;
}

export function getAttemptsStore(): Record<string, any> {
  return global.__fort_attempts_store!;
}
