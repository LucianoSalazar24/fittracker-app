export const WORKOUT_TYPES = ['Cardio', 'Fuerza', 'Yoga', 'Funcional', 'Otro'] as const;

export const WORKOUT_COLORS: Record<string, string> = {
    Cardio: '#ff0000',
    Fuerza: '#0d0cb5',
    Yoga: '#ffcc00',
    Funcional: '#27E837',
    Otro: '#9818d6',
}

// Configuración de íconos usando vector-icons
export const WORKOUT_ICONS: Record<string, { library: string; name: string }> = {
  Cardio: { library: 'MaterialCommunityIcons', name: 'run' },
  Fuerza: { library: 'MaterialCommunityIcons', name: 'dumbbell' },
  Yoga: { library: 'MaterialCommunityIcons', name: 'yoga' },
  Funcional: { library: 'MaterialCommunityIcons', name: 'human-handsup' },
  Otro: { library: 'Ionicons', name: 'fitness' },
};