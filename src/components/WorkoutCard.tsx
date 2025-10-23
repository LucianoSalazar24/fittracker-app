import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Workout } from '../types/types';
import { WORKOUT_COLORS, WORKOUT_ICONS } from '../constants/constants';
import { formatDate, formatDuration } from '../utils/dateUtils';

type Props = {
  workout: Workout;
  onPress: () => void;
};

const WorkoutCard: React.FC<Props> = ({ workout, onPress }) => {
  const color = WORKOUT_COLORS[workout.type];
  const iconConfig = WORKOUT_ICONS[workout.type];

  // Renderizar el ícono según la librería
  const renderIcon = () => {
    if (iconConfig.library === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons 
          name={iconConfig.name as any} 
          size={32} 
          color={color} 
        />
      );
    } else if (iconConfig.library === 'Ionicons') {
      return (
        <Ionicons 
          name={iconConfig.name as any} 
          size={32} 
          color={color} 
        />
      );
    }
    return null;
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: color }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
        <View style={styles.headerText}>
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
  },
  iconContainer: {
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  type: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: '#666',
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
    lineHeight: 20,
  },
});

export default WorkoutCard;