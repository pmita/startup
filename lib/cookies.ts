// PACKAGES
import Cookies from 'js-cookie';

export function getAuthToken(): string | undefined {
  return Cookies.get('__session');
}

export function removeAuthToken(): void {
  return Cookies.remove('__session');
}

export function setAuthToken(token: string): string | undefined {
  return Cookies.set('__session', token, {
    expires: 5, // 5 days
    secure: true,
    path: '/',
    http: true,
  });
}