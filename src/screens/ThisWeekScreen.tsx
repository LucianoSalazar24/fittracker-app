import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Workout } from '../types/types';
import WorkoutCard from '../components/WorkoutCard';
import EmptyState from '../components/EmptyState';

const ThisWeekScreen = () => {
  // array de entrenamientos
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: '1',
      type: 'Cardio',
      date: '2025-10-20',
      duration: 45,
      notes: 'Running matutino por el parque'
    },
    {
      id: '2',
      type: 'Fuerza',
      date: '2025-10-22',
      duration: 60,
      notes: 'Día de espalda y biceps'
    },
    {
      id: '3',
      type: 'Yoga',
      date: '2025-10-23',
      duration: 30,
    },
    {
      id: '4',
      type:'Funcional',
      date:'2025-10-24',
      duration: 40,
      notes:'Circuito Funcional'
    }
  ]);

  // Función que se ejecuta al tocar una tarjeta
  const handleWorkoutPress = (workout: Workout) => {
    Alert.alert(
      workout.type,
      `Duración: ${workout.duration} minutos\nFecha: ${workout.date}\n${workout.notes || 'Sin notas'}`
    );
  };

  // Función que se ejecuta al tocar el botón +
  const handleAddPress = () => {
    Alert.alert('Próximamente', 'Acá vas a poder agregar un nuevo entrenamiento');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Esta Semana</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Ionicons name="add-circle" size={32} color="#007AFF" />
        </TouchableOpacity>
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
            iconName="barbell-outline"
            title="No hay entrenamientos"
            message="Tocá el botón + para agregar tu primer entrenamiento de la semana"
          />
        }
        contentContainerStyle={workouts.length === 0 ? styles.emptyList : styles.list}
      />
    </View>
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
  },
  emptyList: {
    flex: 1,
  },
});

export default ThisWeekScreen;