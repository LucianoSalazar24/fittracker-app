import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Workout, RootStackParamList } from '../types/types';
import WorkoutCard from '../components/WorkoutCard';
import EmptyState from '../components/EmptyState';
import { loadWorkouts, saveWorkouts } from '../utils/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const ThisWeekScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  
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
    
    // Si no hay datos guardados, usar datos de ejemplo
    if (savedWorkouts.length === 0) {
      const initialWorkouts: Workout[] = [
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
          type: 'Funcional',
          date: '2025-10-24',
          duration: 40,
          notes: 'Circuito de funcional en casa'
        }
      ];
      setWorkouts(initialWorkouts);
      await saveWorkouts(initialWorkouts);
    } else {
      setWorkouts(savedWorkouts);
    }
    
    setLoading(false);
  };

  // Función que se ejecuta al tocar una tarjeta
  const handleWorkoutPress = (workout: Workout) => {
    Alert.alert(
      workout.type,
      `Duración: ${workout.duration} minutos\nFecha: ${workout.date}\n${workout.notes || 'Sin notas'}`
    );
  };

  // Función que se ejecuta al tocar el botón +
  const handleAddPress = () => {
    navigation.navigate('AddWorkout');
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