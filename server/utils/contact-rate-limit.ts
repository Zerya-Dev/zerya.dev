const RATE_WINDOW_MS = 10 * 60_000
const RATE_MAX = 5
const MAX_CLIENTS = 1000

// Per-process protection. Proxy-level limits are needed across multiple instances.
const clients = new Map<string, { count: number, expiresAt: number }>()

export function contactRateLimited(ip: string) {
  const now = Date.now()
  for (const [key, client] of clients) {
    if (client.expiresAt <= now)
      clients.delete(key)
  }
  const client = clients.get(ip)
  if (client) {
    if (client.count >= RATE_MAX)
      return true
    client.count++
    return false
  }
  // Never evict active clients: rotating identities must not reset their limits.
  if (clients.size >= MAX_CLIENTS)
    return true
  clients.set(ip, { count: 1, expiresAt: now + RATE_WINDOW_MS })
  return false
}
