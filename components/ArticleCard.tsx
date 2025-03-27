import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function ArticleCard({ article }) {
  return (
    <Link href={`/article/${article.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.category}>{article.category}</Text>
          <MaterialIcons
            name={article.isFavorite ? "favorite" : "favorite-outline"}
            size={20}
            color={article.isFavorite ? "#FF3B30" : "#ccc"}
          />
        </View>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.summary}>{article.summary}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
});