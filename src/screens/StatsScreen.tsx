import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Workout, WorkoutType } from '../types/types';
import { loadWorkouts } from '../utils/storage';
import { WORKOUT_COLORS, WORKOUT_ICONS } from '../constants/constants';
import { formatDuration } from '../utils/dateUtils';

const StatsScreen = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const savedWorkouts = await loadWorkouts();
    setWorkouts(savedWorkouts);
    setLoading(false);
  };

  // Calcular estadísticas generales
  const totalWorkouts = workouts.length;
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
  const averageDuration = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0;

  // Calcular estadísticas por tipo
  const statsByType = workouts.reduce((acc, workout) => {
    if (!acc[workout.type]) {
      acc[workout.type] = { count: 0, totalMinutes: 0 };
    }
    acc[workout.type].count += 1;
    acc[workout.type].totalMinutes += workout.duration;
    return acc;
  }, {} as Record<WorkoutType, { count: number; totalMinutes: number }>);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando estadísticas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Estadísticas</Text>
        </View>

        {/* Resumen general */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen General</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="barbell" size={32} color="#007AFF" />
              <Text style={styles.statValue}>{totalWorkouts}</Text>
              <Text style={styles.statLabel}>Entrenamientos</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="time" size={32} color="#FF6B6B" />
              <Text style={styles.statValue}>{formatDuration(totalMinutes)}</Text>
              <Text style={styles.statLabel}>Tiempo Total</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="stats-chart" size={32} color="#4ECDC4" />
              <Text style={styles.statValue}>{formatDuration(averageDuration)}</Text>
              <Text style={styles.statLabel}>Promedio</Text>
            </View>
          </View>
        </View>

        {/* Estadísticas por tipo */}
        {totalWorkouts > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Por Tipo de Ejercicio</Text>
            
            {Object.entries(statsByType).map(([type, stats]) => {
              const color = WORKOUT_COLORS[type];
              const iconName = WORKOUT_ICONS[type];
              const percentage = Math.round((stats.count / totalWorkouts) * 100);

              return (
                <View key={type} style={styles.typeCard}>
                  <View style={styles.typeHeader}>
                    <View style={styles.typeInfo}>
                      <Ionicons name={iconName} size={24} color={color} />
                      <Text style={styles.typeName}>{type}</Text>
                    </View>
                    <Text style={styles.typePercentage}>{percentage}%</Text>
                  </View>

                  <View style={styles.typeStats}>
                    <View style={styles.typeStat}>
                      <Text style={styles.typeStatValue}>{stats.count}</Text>
                      <Text style={styles.typeStatLabel}>sesiones</Text>
                    </View>
                    <View style={styles.typeStat}>
                      <Text style={styles.typeStatValue}>{formatDuration(stats.totalMinutes)}</Text>
                      <Text style={styles.typeStatLabel}>total</Text>
                    </View>
                    <View style={styles.typeStat}>
                      <Text style={styles.typeStatValue}>
                        {formatDuration(Math.round(stats.totalMinutes / stats.count))}
                      </Text>
                      <Text style={styles.typeStatLabel}>promedio</Text>
                    </View>
                  </View>

                  {/* Barra de progreso */}
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${percentage}%`, backgroundColor: color }
                      ]} 
                    />
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Mensaje si no hay datos */}
        {totalWorkouts === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="stats-chart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>Sin estadísticas</Text>
            <Text style={styles.emptyMessage}>
              Comenzá a registrar entrenamientos para ver tus estadísticas
            </Text>
          </View>
        )}
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  typeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  typePercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  typeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  typeStat: {
    alignItems: 'center',
  },
  typeStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  typeStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default StatsScreen;