import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface MedicalRecord {
  id?: string;
  patientId: string;
  doctorId: string;
  date: Date;
  diagnosis: string;
  treatment: string;
  medications: string[];
  notes: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const createMedicalRecord = async (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const recordData = {
      ...record,
      date: Timestamp.fromDate(record.date),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'medicalRecords'), recordData);
    return { id: docRef.id, ...recordData };
  } catch (error) {
    throw error;
  }
};

export const updateMedicalRecord = async (id: string, record: Partial<MedicalRecord>) => {
  try {
    const recordRef = doc(db, 'medicalRecords', id);
    const updateData = {
      ...record,
      updatedAt: Timestamp.now()
    };

    await updateDoc(recordRef, updateData);
    return { id, ...updateData };
  } catch (error) {
    throw error;
  }
};

export const deleteMedicalRecord = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'medicalRecords', id));
  } catch (error) {
    throw error;
  }
};

export const getMedicalRecord = async (id: string): Promise<MedicalRecord | null> => {
  try {
    const docRef = doc(db, 'medicalRecords', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        date: data.date.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as MedicalRecord;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const getPatientMedicalRecords = async (patientId: string): Promise<MedicalRecord[]> => {
  try {
    const q = query(
      collection(db, 'medicalRecords'),
      where('patientId', '==', patientId),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as MedicalRecord[];
  } catch (error) {
    throw error;
  }
}; 