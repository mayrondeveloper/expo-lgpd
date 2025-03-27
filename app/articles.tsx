import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const mockArticles = [
  {
    id: 1,
    title: 'O que é a LGPD?',
    summary: 'Lei Geral de Proteção de Dados Pessoais no Brasil',
    category: 'Introdução',
    date: '15/05/2023',
    readingTime: '5 min',
    isFavorite: true
  },
];

export default function ArticlesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Todos os Artigos</Text>

      <FlatList
        data={mockArticles}
        renderItem={({ item }) => (
          <Link href={`/article/${item.id}`} asChild>
            <TouchableOpacity style={styles.articleCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.category}>{item.category}</Text>
                <MaterialIcons
                  name={item.isFavorite ? "favorite" : "favorite-outline"}
                  size={20}
                  color={item.isFavorite ? "#FF3B30" : "#ccc"}
                />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.summary}>{item.summary}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.readingTime}>{item.readingTime}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: 20,
  },
});