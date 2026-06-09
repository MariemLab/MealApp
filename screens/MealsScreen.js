import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";

import { getMealsByCategory } from "../api/themealdb";

export default function MealsScreen({ route, navigation }) {
  const { category } = route.params;

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      const data = await getMealsByCategory(category);
      setMeals(data);
    } catch (error) {
      console.log("Erreur repas :", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Plats de la catégorie: {category}</Text>
      
      <FlatList
        data={meals}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", { idMeal: item.idMeal })
            }
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strMeal}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  row: {
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#f1f1f1",
    borderRadius: 14,
    marginBottom: 15,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 150,
  },

  title: {
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    fontWeight: "500",
  },

});