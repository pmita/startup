// LIBRARIES
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge' ;
// UTILS
import { firebaseAuth } from './firebase';
// TYPES
import { FetchFromApiOptions } from '@/types/index';

// FUNCTIONS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchFromApi(endpoint: string, options: FetchFromApiOptions = {}) {
  const { method, body } = { method: 'POST', body: null, ...options };

  // authenticated requests
  const user = firebaseAuth.currentUser;
  const authenticationToken = user && (await user.getIdToken());

  const response = await fetch(endpoint, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    // headers: {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${authenticationToken}`,
    // },
    headers: new Headers({ 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authenticationToken}`
    })
  });

  return response.json();
}
