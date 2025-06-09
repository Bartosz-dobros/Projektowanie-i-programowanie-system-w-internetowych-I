// src/firebase-admin.ts
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.FB_SERVICE_KEY) {
    throw new Error('FB_SERVICE_KEY not found in .env');
}

const serviceAccount = JSON.parse(
    Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString()
);

initializeApp({
    credential: cert(serviceAccount),
});

export const db = getFirestore();
export const auth = getAuth();
