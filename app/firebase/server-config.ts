import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

// Ensure that the private key is properly formatted
const formattedPrivateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(/\\n/g, '\n');

const serviceAccount = {
  type: process.env.NEXT_PUBLIC_TYPE || "",
  project_id: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID || "",
  private_key: formattedPrivateKey || "",
  client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL || "",
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID || "",
  auth_uri: process.env.NEXT_PUBLIC_AUTH_URI || "",
  token_uri: process.env.NEXT_PUBLIC_TOKEN_URI || "",
  auth_provider_x509_cert_url:
    process.env.NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL || "",
  client_x509_cert_url: process.env.NEXT_PUBLIC_CLIENT_X509_CERT_URL || "",
  universe_domain: process.env.NEXT_PUBLIC_UNIVERSAL_DOMAIN || "",
};

const firebaseAdminConfig = {
  credential: cert(serviceAccount as object),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase Admin SDK
const adminApp = !getApps().length
  ? initializeApp(firebaseAdminConfig)
  : getApp();
const defaultAuth = getAuth(adminApp);
const defaultDatabase = getDatabase(adminApp);

export { adminApp, defaultAuth, defaultDatabase };
