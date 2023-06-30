import * as admin from 'firebase-admin';
import { config } from '../config';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: `https://${config.firebase.project_id}.firebaseio.com`
});

export const db = admin.firestore();