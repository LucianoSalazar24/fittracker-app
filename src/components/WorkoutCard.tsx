import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Workout } from '../types/types';
import { WORKOUT_COLORS, WORKOUT_ICONS } from '../constants/constants';
import { formatDate, formatDuration } from '../utils/dateUtils';

type Props = {
  workout: Workout;      //recibe el objeto workout
  onPress: () => void;  //recibe la funcion cuando se toca
};

const WorkoutCard: React.FC<Props> = ({ workout, onPress }) => {
  const color = WORKOUT_COLORS[workout.type];
  const iconName = WORKOUT_ICONS[workout.type];

  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: color }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Ionicons name={iconName} size={32} color={color} />
        <View style={styles.info}>
          <Text style={styles.type}>{workout.type}</Text>
          <Text style={styles.date}>{formatDate(workout.date)}</Text>
        </View>
        <Text style={styles.duration}>{formatDuration(workout.duration)}</Text>
      </View>
      
      {workout.notes && (
        <Text style={styles.notes} numberOfLines={2}>
          {workout.notes}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  info: {
    flex: 1,
  },
  type: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  duration: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  notes: {
    marginTop: 12,
    fontSize: 14,
    color: '#555',
  },
});

export default WorkoutCard;