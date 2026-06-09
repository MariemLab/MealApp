import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

import { getMealDetails } from "../api/themealdb";

export default function DetailsScreen({ route }) {
  const { idMeal } = route.params;

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    try {
      const data = await getMealDetails(idMeal);
      setMeal(data);
    } catch (error) {
      console.log("Erreur détails :", error);
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = () => {
    if (!meal) return [];

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          id: i,
          name: ingredient,
          measure: measure || "",
        });
      }
    }

    return ingredients;
  };

  const getInstructions = () => {
    if (!meal?.strInstructions) return [];

    return meal.strInstructions
      .split(".")
      .map((step) => step.trim())
      .filter((step) => step.length > 0);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!meal) {
    return (
      <View style={styles.center}>
        <Text>Recette introuvable</Text>
      </View>
    );
  }

  const ingredients = getIngredients();
  const instructions = getInstructions();

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

      <Text style={styles.title}>{meal.strMeal}</Text>

      <Text style={styles.subtitle}>
        {meal.strCategory} • {meal.strArea}
      </Text>

      <Text style={styles.sectionTitle}>Ingredients</Text>

      {ingredients.map((item) => (
        <View key={item.id} style={styles.ingredientRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.ingredientName}>{item.name}</Text>
          <Text style={styles.measure}>{item.measure}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Instructions</Text>

      {instructions.map((step, index) => (
        <View key={index} style={styles.stepRow}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>

          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 230,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    paddingHorizontal: 15,
    marginTop: 15,
  },

  subtitle: {
    color: "#777",
    paddingHorizontal: 15,
    marginTop: 5,
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 15,
  },

  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  bullet: {
    fontSize: 22,
    marginRight: 10,
  },

  ingredientName: {
    flex: 1,
    fontSize: 16,
  },

  measure: {
    fontSize: 15,
    color: "#777",
  },

  stepRow: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  stepNumberText: {
    color: "#fff",
    fontWeight: "bold",
  },

  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
});