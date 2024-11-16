import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

let firebaseApp;

export async function getAccessToken(serviceAccountKey) {
  if (!firebaseApp && getApps().length === 0) {
    firebaseApp = initializeApp({
      credential: cert(serviceAccountKey)
    });
  }

  const auth = getAuth();
  const token = await auth.createCustomToken('server');
  return token;
}