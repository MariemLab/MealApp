import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { getCategories } from "../api/themealdb";

export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log("Erreur catégories :", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("Meals", {
                category: item.strCategory,
              })
            }
          >
            <Image
              source={{ uri: item.strCategoryThumb }}
              style={styles.image}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.strCategory}</Text>
              <Text numberOfLines={2} style={styles.desc}>
                {item.strCategoryDescription}
              </Text>
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
    padding: 15,
    backgroundColor: "#f8fafc",
  },

  searchButton: {
    backgroundColor: "#10b981",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },

  searchText: {
    color: "white",
    fontWeight: "bold",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
    elevation: 3,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  desc: {
    color: "#64748b",
    marginTop: 5,
  },
});