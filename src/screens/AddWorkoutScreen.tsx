import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WorkoutType, Workout, RootStackParamList } from '../types/types';
import { WORKOUT_TYPES } from '../constants/constants';
import { getTodayISO } from '../utils/dateUtils';
import { loadWorkouts, saveWorkouts } from '../utils/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddWorkout'>;

const AddWorkoutScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddWorkout'>>();
  
  // Detectar si estamos editando
  const workoutToEdit = route.params?.workoutToEdit;
  const isEditing = !!workoutToEdit;
  
  const [type, setType] = useState<WorkoutType>(
    workoutToEdit?.type ?? (WORKOUT_TYPES[0] ?? ('Cardio' as WorkoutType))
  );
  const [duration, setDuration] = useState(
    workoutToEdit?.duration.toString() ?? ''
  );
  const [date, setDate] = useState(
    workoutToEdit?.date ?? getTodayISO()
  );
  const [notes, setNotes] = useState(
    workoutToEdit?.notes ?? ''
  );
  
  // Estados de error
  const [durationError, setDurationError] = useState('');
  const [dateError, setDateError] = useState('');

  // Validar duración
  const validateDuration = (value: string): boolean => {
    const num = parseInt(value);
    if (!value || value.trim() === '') {
      setDurationError('La duración es obligatoria');
      return false;
    }
    if (isNaN(num) || num <= 0) {
      setDurationError('Debe ser un número mayor a 0');
      return false;
    }
    if (num > 300) {
      setDurationError('Máximo 300 minutos (5 horas)');
      return false;
    }
    setDurationError('');
    return true;
  };

  // Validar fecha
  const validateDate = (value: string): boolean => {
    if (!value || value.trim() === '') {
      setDateError('La fecha es obligatoria');
      return false;
    }
    
    // Verificar formato YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) {
      setDateError('Formato inválido (YYYY-MM-DD)');
      return false;
    }

    // Verificar que no sea fecha futura
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    if (selectedDate > today) {
      setDateError('No puede ser una fecha futura');
      return false;
    }

    setDateError('');
    return true;
  };

  // Manejar guardado
  const handleSave = async () => {
    const isDurationValid = validateDuration(duration);
    const isDateValid = validateDate(date);

    if (!isDurationValid || !isDateValid) {
      Alert.alert('Error', 'Por favor corregí los errores antes de guardar');
      return;
    }

    try {
      // Cargar workouts existentes
      const existingWorkouts = await loadWorkouts();
      
      if (isEditing && workoutToEdit) {
        // MODO EDICIÓN: Actualizar workout existente
        const updatedWorkouts = existingWorkouts.map(w =>
          w.id === workoutToEdit.id
            ? {
                ...w,
                type,
                duration: parseInt(duration),
                date,
                notes: notes.trim() || undefined,
              }
            : w
        );
        
        await saveWorkouts(updatedWorkouts);
        
        Alert.alert('¡Actualizado!', 'El entrenamiento fue actualizado correctamente', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        // MODO CREAR: Agregar nuevo workout
        const newWorkout: Workout = {
          id: Date.now().toString(),
          type,
          duration: parseInt(duration),
          date,
          notes: notes.trim() || undefined,
        };

        const updatedWorkouts = [...existingWorkouts, newWorkout];
        await saveWorkouts(updatedWorkouts);

        Alert.alert('¡Éxito!', 'Entrenamiento guardado correctamente', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el entrenamiento');
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {isEditing ? 'Editar Entrenamiento' : 'Nuevo Entrenamiento'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          {/* Tipo de ejercicio */}
          <View style={styles.field}>
            <Text style={styles.label}>Tipo de ejercicio *</Text>
            <View style={styles.typeSelector}>
              {WORKOUT_TYPES.map((workoutType) => (
                <TouchableOpacity
                  key={workoutType}
                  style={[
                    styles.typeButton,
                    type === workoutType && styles.typeButtonActive,
                  ]}
                  onPress={() => setType(workoutType as WorkoutType)}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      type === workoutType && styles.typeButtonTextActive,
                    ]}
                  >
                    {workoutType}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Duración */}
          <View style={styles.field}>
            <Text style={styles.label}>Duración (minutos) *</Text>
            <TextInput
              style={[styles.input, durationError ? styles.inputError : null]}
              placeholder="Ej: 45"
              keyboardType="numeric"
              value={duration}
              onChangeText={(text) => {
                setDuration(text);
                if (durationError) validateDuration(text);
              }}
              onBlur={() => validateDuration(duration)}
            />
            {durationError ? (
              <Text style={styles.errorText}>{durationError}</Text>
            ) : null}
          </View>

          {/* Fecha */}
          <View style={styles.field}>
            <Text style={styles.label}>Fecha *</Text>
            <TextInput
              style={[styles.input, dateError ? styles.inputError : null]}
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={(text) => {
                setDate(text);
                if (dateError) validateDate(text);
              }}
              onBlur={() => validateDate(date)}
            />
            {dateError ? (
              <Text style={styles.errorText}>{dateError}</Text>
            ) : null}
            <Text style={styles.hint}>Formato: Año-Mes-Día (ej: 2025-10-22)</Text>
          </View>

          {/* Notas */}
          <View style={styles.field}>
            <Text style={styles.label}>Notas (opcional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ej: Me sentí muy bien hoy"
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
              textAlignVertical="top"
            />
          </View>

          {/* Botón Guardar */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar Entrenamiento</Text>
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
  cancelButton: {
    padding: 4,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 60,
  },
  form: {
    padding: 16,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 100,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  hint: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddWorkoutScreen;