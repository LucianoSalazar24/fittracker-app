import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Task = { id: string; title: string; completed: boolean };

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis tareas</Text>

      <View style={{ marginBottom: 8 }}>
        <Button
          title="Agregar demo"
          onPress={() =>
            setTasks([
              { id: "1", title: "Comprar pan", completed: false },
              { id: "2", title: "Estudiar RN", completed: false },
            ])
          }
        />
      </View>

      <View style={{ marginBottom: 8 }}>
        <Button
          title="Limpiar"
          onPress={() => setTasks([])}
        />
      </View>

      <View style={{ marginBottom: 8 }}>
  <Button
    title="Agregar una pendiente"
    onPress={() =>
      setTasks([
        { id: "3", title: "Terminar el codigo", completed: false },
        { id: "4", title: "Comprar verdura", completed: false },
      ])
    }
  />
</View>
      <View style={{ marginBottom: 8 }}>
        <Button
        title="Vaciar"
        onPress={() => setTasks([])}
       />
      </View>


      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTask(item.id)}>
            <Text
              style={{
                paddingVertical: 8,
                textDecorationLine: item.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 8 }}>
            No hay tareas todavía
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 12,
  },
});

export default App;