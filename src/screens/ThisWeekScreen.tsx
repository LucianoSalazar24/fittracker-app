import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Workout } from '../types/types';
import WorkoutCard from '../components/WorkoutCard';
import EmptyState from '../components/EmptyState';
import { loadWorkouts, saveWorkouts } from '../utils/storage';
import { isThisWeek } from '../utils/dateUtils';

// Helper para generar fechas relativas a hoy para los datos iniciales
const getRelativeISO = (offsetDays: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ThisWeekScreen = () => {
  const navigation = useNavigation();
  
  // Estado: array de entrenamientos
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos al iniciar la app
  useEffect(() => {
    loadInitialData();
  }, []);

  // Recargar datos cuando la pantalla recibe foco
  useFocusEffect(
    React.useCallback(() => {
      loadInitialData();
    }, [])
  );

  const loadInitialData = async () => {
    const savedWorkouts = await loadWorkouts();
    let allWorkouts = savedWorkouts;
    
    // Si no hay datos guardados, usar datos de ejemplo
    if (savedWorkouts.length === 0) {
      const initialWorkouts: Workout[] = [
        {
          id: '1',
          type: 'Cardio',
          date: getRelativeISO(-2),
          duration: 45,
          notes: 'Running matutino por el parque'
        },
        {
          id: '2',
          type: 'Fuerza',
          date: getRelativeISO(-1),
          duration: 60,
          notes: 'Día de espalda y biceps'
        },
        {
          id: '3',
          type: 'Yoga',
          date: getRelativeISO(0),
          duration: 30,
        },
        {
          id: '4',
          type: 'Funcional',
          date: getRelativeISO(-3),
          duration: 40,
          notes: 'Circuito de Funcional'
        }
      ];
      allWorkouts = initialWorkouts;
      await saveWorkouts(initialWorkouts);
    }
    
    // Ordenar por fecha: más reciente primero
    const sortedWorkouts = allWorkouts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Filtrar para mostrar solo los de esta semana
    const thisWeeksWorkouts = sortedWorkouts.filter(w => isThisWeek(w.date));
    setWorkouts(thisWeeksWorkouts);
    setLoading(false);
  };

  // Función que navega al detalle de un entrenamiento
  const handleWorkoutPress = (workout: Workout) => {
    (navigation as any).navigate('WorkoutDetail', { workout });
  };

  // Función que se ejecuta al tocar el botón +
  const handleAddPress = () => {
    navigation.navigate('AddWorkout' as never);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando entrenamientos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con título y botón */}
      <View style={styles.header}>
        <Text style={styles.title}>Esta Semana</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Ionicons name="add-circle" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Lista de entrenamientos */}
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutCard 
            workout={item} 
            onPress={() => handleWorkoutPress(item)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            iconName="barbell-outline"
            title="No hay entrenamientos"
            message="Tocá el botón + para agregar tu primer entrenamiento de la semana"
          />
        }
        contentContainerStyle={workouts.length === 0 ? styles.emptyList : styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 4,
  },
  list: {
    paddingVertical: 8,
    paddingBottom: 20,
  },
  emptyList: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ThisWeekScreen;