import { URL } from 'url';

export class SSRFGuard {
  // Allowed Italian official university domain patterns
  private static ALLOWED_DOMAINS = [
    'polimi.it',
    'unibo.it',
    'unipd.it',
    'uniroma1.it',
    'unito.it',
    'universitaly.it',
    'polito.it',
  ];

  static validateTargetURL(targetUrl: string): boolean {
    try {
      const parsed = new URL(targetUrl);

      // Block non-HTTP/HTTPS protocols
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return false;
      }

      const hostname = parsed.hostname.toLowerCase();

      // Block private IP ranges and localhost
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.startsWith('172.16.')
      ) {
        return false;
      }

      // Check if domain ends with an allowed Italian domain
      const isAllowedDomain = this.ALLOWED_DOMAINS.some((allowed) =>
        hostname === allowed || hostname.endsWith(`.${allowed}`),
      );

      return isAllowedDomain;
    } catch {
      return false;
    }
  }
}
