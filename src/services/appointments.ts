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

export interface Appointment {
  id?: string;
  patientId: string;
  doctorId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'consultation' | 'follow-up' | 'emergency';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const appointmentData = {
      ...appointment,
      date: Timestamp.fromDate(appointment.date),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'appointments'), appointmentData);
    return { id: docRef.id, ...appointmentData };
  } catch (error) {
    throw error;
  }
};

export const updateAppointment = async (id: string, appointment: Partial<Appointment>) => {
  try {
    const appointmentRef = doc(db, 'appointments', id);
    const updateData = {
      ...appointment,
      updatedAt: Timestamp.now()
    };

    await updateDoc(appointmentRef, updateData);
    return { id, ...updateData };
  } catch (error) {
    throw error;
  }
};

export const deleteAppointment = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'appointments', id));
  } catch (error) {
    throw error;
  }
};

export const getAppointment = async (id: string): Promise<Appointment | null> => {
  try {
    const docRef = doc(db, 'appointments', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        date: data.date.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Appointment;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const getPatientAppointments = async (patientId: string): Promise<Appointment[]> => {
  try {
    const q = query(
      collection(db, 'appointments'),
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
    })) as Appointment[];
  } catch (error) {
    throw error;
  }
};

export const getDoctorAppointments = async (doctorId: string): Promise<Appointment[]> => {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', doctorId),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as Appointment[];
  } catch (error) {
    throw error;
  }
}; 