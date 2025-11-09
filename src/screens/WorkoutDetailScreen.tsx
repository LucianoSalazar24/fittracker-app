import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/types';
import { WORKOUT_COLORS, WORKOUT_ICONS } from '../constants/constants';
import { formatDate, formatDuration } from '../utils/dateUtils';
import { loadWorkouts, saveWorkouts } from '../utils/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'WorkoutDetail'>;
type WorkoutDetailRouteProp = RouteProp<RootStackParamList, 'WorkoutDetail'>;

const WorkoutDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<WorkoutDetailRouteProp>();
  const { workout } = route.params;

  const color = WORKOUT_COLORS[workout.type];
  const iconName = WORKOUT_ICONS[workout.type];

  // Función para eliminar
  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que querés eliminar este entrenamiento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              // Cargar workouts
              const existingWorkouts = await loadWorkouts();
              
              // Filtrar (eliminar el workout actual)
              const updatedWorkouts = existingWorkouts.filter(w => w.id !== workout.id);
              
              // Guardar
              await saveWorkouts(updatedWorkouts);
              
              // Volver atrás
              Alert.alert('Eliminado', 'El entrenamiento fue eliminado correctamente', [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]);
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el entrenamiento');
              console.error(error);
            }
          },
        },
      ]
    );
  };

  // Función para editar
  const handleEdit = () => {
    navigation.navigate('AddWorkout', { workoutToEdit: workout });
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalle</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Card principal */}
        <View style={[styles.card, { borderLeftColor: color }]}>
          <View style={styles.cardHeader}>
            <Ionicons name={iconName} size={48} color={color} />
            <View style={styles.cardHeaderText}>
              <Text style={styles.type}>{workout.type}</Text>
              <Text style={styles.date}>{formatDate(workout.date)}</Text>
            </View>
          </View>

          {/* Información detallada */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={24} color="#666" />
                <Text style={styles.infoLabel}>Duración</Text>
                <Text style={styles.infoValue}>{formatDuration(workout.duration)}</Text>
              </View>

              <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={24} color="#666" />
                <Text style={styles.infoLabel}>Fecha</Text>
                <Text style={styles.infoValue}>{workout.date}</Text>
              </View>
            </View>
          </View>

          {/* Notas */}
          {workout.notes && (
            <View style={styles.notesSection}>
              <Text style={styles.notesLabel}>Notas</Text>
              <Text style={styles.notesText}>{workout.notes}</Text>
            </View>
          )}
        </View>

        {/* Botones de acción */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="pencil" size={20} color="#fff" />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash" size={20} color="#fff" />
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
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
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 36,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardHeaderText: {
    marginLeft: 16,
    flex: 1,
  },
  type: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  notesSection: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WorkoutDetailScreen;