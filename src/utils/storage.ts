import AsyncStorage from '@react-native-async-storage/async-storage';
import { Workout } from '../types/types';

const WORKOUTS_KEY = '@fittracker_workouts';

// Guardar entrenamientos
export const saveWorkouts = async (workouts: Workout[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(workouts);
    await AsyncStorage.setItem(WORKOUTS_KEY, jsonValue);
  } catch (error) {
    console.error('Error al guardar entrenamientos:', error);
  }
};

// Cargar entrenamientos
export const loadWorkouts = async (): Promise<Workout[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(WORKOUTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error al cargar entrenamientos:', error);
    return [];
  }
};

// Limpiar todos los datos de entrenamientos
export const clearWorkouts = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(WORKOUTS_KEY);
  } catch (error) {
    console.error('Error al limpiar entrenamientos:', error);
  }
};