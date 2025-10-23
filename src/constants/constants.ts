export const WORKOUT_TYPES = ['Cardio', 'Fuerza', 'Yoga', 'Funcional', 'Otro'] as const;

export const WORKOUT_COLORS: Record<string, string> = {
    Cardio: '#ff0000',
    Fuerza: '#0d0cb5',
    Yoga: '#ffcc00',
    Funcional: '#27E837',
    Otro: '#9818d6',
}

// Nombres simples de iconos de Ionicons
export const WORKOUT_ICONS: Record<string, any> = {
  Cardio: 'fitness-outline',
  Fuerza: 'barbell-outline',
  Yoga: 'flower-outline',
  Funcional: 'body-outline',
  Otro: 'flash-outline',
};