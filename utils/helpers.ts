// LIBRARIES
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge' ;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FetchFromApiOptions {
  method?: string;
  body?: any;
}

export async function fetchFromApi(endpoint: string, options: FetchFromApiOptions = {}) {
  const { method, body } = { method: 'POST', body: null, ...options };
  const response = await fetch(endpoint, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}
