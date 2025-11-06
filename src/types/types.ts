// Defino todos los datos que voy a usar en la app
// Se definen los cinco tipos de entrenamiento que puede tener la app
export type WorkoutType = 'Cardio' | 'Fuerza' | 'Yoga' | 'Funcional' | 'Otro';

export interface Workout {
    id: string;
    type: WorkoutType;
    date: string; // Formato ISO
    duration: number; // minutos
    notes?: string;
}

// Voy a definir que pantallas existen en el navigate y los parametros que acepta
export type RootStackParamList = {
    MainTabs: undefined;
    AddWorkout: undefined;
    WorkoutDetail: { workout: Workout };
};

// Defino las tres pestañas del tabs navigation
export type MainTabParamList = {
    ThisWeek: undefined;
    History: undefined;
    Stats: undefined;
};