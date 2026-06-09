import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { searchMealByName } from "../api/themealdb";

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setSearched(false);
    try {
      const data = await searchMealByName(search);
      setMeals(data || []);
      setSearched(true);
    } catch (error) {
      console.log("Erreur recherche :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Ex : chicken, pasta..."
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            if (!text.trim()) {
              setMeals([]);
              setSearched(false);
            }
          }}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          style={styles.input}
        />
        <Pressable style={styles.searchBtn} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="white" />
        </Pressable>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 30 }} />
      )}

      {!loading && !searched && (
        <View style={styles.empty}>
          <Ionicons name="restaurant-outline" size={50} color="#94a3b8" />
          <Text style={styles.emptyText}>Cherchez une recette</Text>
          <Text style={styles.emptySubtext}>Par nom : chicken, pasta, beef...</Text>
        </View>
      )}

      {!loading && searched && meals.length === 0 && (
        <View style={styles.empty}>
          <Ionicons name="sad-outline" size={50} color="#94a3b8" />
          <Text style={styles.emptyText}>Aucune recette trouvée</Text>
          <Text style={styles.emptySubtext}>Essayez un autre mot-clé</Text>
        </View>
      )}

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Details", { idMeal: item.idMeal })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.strMeal}</Text>
              <View style={styles.tags}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.strCategory}</Text>
                </View>
                <View style={[styles.tag, styles.tagGray]}>
                  <Text style={styles.tagText}>{item.strArea}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 15,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },

  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 15,
  },

  searchBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  empty: {
    alignItems: "center",
    marginTop: 60,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#334155",
    marginTop: 10,
  },

  emptySubtext: {
    color: "#94a3b8",
    marginTop: 5,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: 100,
    height: 100,
  },

  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },

  tags: {
    flexDirection: "row",
    gap: 6,
  },

  tag: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  tagGray: {
    backgroundColor: "#f1f5f9",
  },

  tagText: {
    fontSize: 12,
    color: "#334155",
    fontWeight: "500",
  },
});