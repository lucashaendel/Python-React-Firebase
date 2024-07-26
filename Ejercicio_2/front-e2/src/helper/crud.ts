import { db } from "../firebaseConfig.ts";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

interface Car {
  id?: string;
  make: string;
  model: string;
  year: string;
  favorite: boolean;
}

export const getCars = async (
  setCars: React.Dispatch<React.SetStateAction<Car[]>>
): Promise<void> => {
  const querySnapshot = await getDocs(collection(db, "cars"));
  const carsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Car[];
  setCars(carsData);
};

export const addCar = async (car: Car): Promise<void> => {
  await addDoc(collection(db, "cars"), car);
};

export const updateCar = async (
  carId: string,
  updatedData: Partial<Car>
): Promise<void> => {
  const carRef = doc(db, "cars", carId);
  await updateDoc(carRef, updatedData);
};

export const getCarById = async (carId: string): Promise<Car> => {
  const carRef = doc(db, "cars", carId);
  const carSnap = await getDoc(carRef);
  if (carSnap.exists()) {
    return { id: carSnap.id, ...carSnap.data() } as Car;
  } else {
    throw new Error("No such car!");
  }
};
