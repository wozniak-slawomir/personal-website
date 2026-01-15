/**
 * Survey utilities
 */

// TODO: Improve IP detection
export function getClientIP(event: { node: { req: { headers: Record<string, string | string[] | undefined> } } }): string {
    const headers = event.node.req.headers;

    const xForwardedFor = headers['x-forwarded-for'];
    if (xForwardedFor) {
        const ips = Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor;
        return ips.split(',')[0].trim();
    }

    const xRealIP = headers['x-real-ip'];
    if (xRealIP) {
        return Array.isArray(xRealIP) ? xRealIP[0] : xRealIP;
    }

    return 'unknown';
}

export function validateTIPIAnswer(value: unknown): value is number {
    return typeof value === 'number' && value >= 1 && value <= 5 && Number.isInteger(value);
}
