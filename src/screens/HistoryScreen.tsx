import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Workout } from '../types/types';
import WorkoutCard from '../components/WorkoutCard';
import EmptyState from '../components/EmptyState';
import { loadWorkouts } from '../utils/storage';

const HistoryScreen = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos al iniciar
  useEffect(() => {
    loadData();
  }, []);

  // Recargar datos cuando la pantalla recibe foco
  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const savedWorkouts = await loadWorkouts();
    // Ordenado por fecha, desde el mas reciente
    const sortedWorkouts = savedWorkouts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setWorkouts(sortedWorkouts);
    setLoading(false);
  };

  const handleWorkoutPress = (workout: Workout) => {
    Alert.alert(
      workout.type,
      `Duración: ${workout.duration} minutos\nFecha: ${workout.date}\n${workout.notes || 'Sin notas'}`
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando historial...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Historial</Text>
        <Text style={styles.count}>{workouts.length} entrenamientos</Text>
      </View>

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
            iconName="calendar-outline"
            title="Sin historial"
            message="Todavía no registraste ningún entrenamiento"
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
  count: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  list: {
    paddingVertical: 8,
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

export default HistoryScreen;