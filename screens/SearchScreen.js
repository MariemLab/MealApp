import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { searchMealByName } from "../api/themealdb";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);

    try {
      const data = await searchMealByName(search);
      setMeals(data);
    } catch (error) {
      console.log("Erreur recherche :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Exemple : chicken"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </Pressable>

      {loading && <ActivityIndicator size="large" />}

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.strMeal}</Text>
              <Text style={styles.category}>{item.strCategory}</Text>
              <Text style={styles.area}>{item.strArea}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8fafc",
  },

  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
  },

  category: {
    color: "#10b981",
    marginTop: 5,
  },

  area: {
    color: "#64748b",
  },
});