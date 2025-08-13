import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp,
  DocumentData 
} from 'firebase/firestore';
import { db } from './firebase';

export interface EmailData {
  email: string;
  timestamp: Date;
  status: 'active' | 'unsubscribed';
}

export interface FirestoreEmailData {
  email: string;
  timestamp: Timestamp;
  status: 'active' | 'unsubscribed';
}

// Add a new email to Firestore
export const addEmail = async (email: string): Promise<void> => {
  try {
    await addDoc(collection(db, 'emails'), {
      email,
      timestamp: Timestamp.now(),
      status: 'active'
    });
  } catch (error) {
    console.error('Error adding email:', error);
    throw error;
  }
};

// Get all emails from Firestore
export const getAllEmails = async (): Promise<EmailData[]> => {
  try {
    const q = query(collection(db, 'emails'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as FirestoreEmailData;
      return {
        email: data.email,
        timestamp: data.timestamp.toDate(),
        status: data.status
      };
    });
  } catch (error) {
    console.error('Error getting emails:', error);
    throw error;
  }
};

// Get emails count
export const getEmailsCount = async (): Promise<number> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'emails'));
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting emails count:', error);
    throw error;
  }
};
