export function generateIdempotencyKey() {
  return Date.now() + "-" + Math.random().toString(36).substring(2);
}
