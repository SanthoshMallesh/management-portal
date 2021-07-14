import { ENABLE_AUTHENTICATION } from '../constants/Config';

/**
 * Capitalize String
 *
 * @param s
 * @returns
 */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function logout(): void {
  if (ENABLE_AUTHENTICATION) {
    sessionStorage.clear();
    window.location.href = '/.auth/logout';
  }
}
