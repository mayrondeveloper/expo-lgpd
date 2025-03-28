// app/(tabs)/articles.tsx
import { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import ArticleCard from '@/components/ArticleCard';
import SearchBar from '@/components/SearchBar';
import { DatabaseService } from '@/database/db';

export default function ArticlesScreen() {
  const db = useSQLiteContext();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const loadedArticles = await DatabaseService.getArticles(db, 20);
        setArticles(loadedArticles);
        setFilteredArticles(loadedArticles);
      } catch (error) {
        console.error('Erro ao carregar artigos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  const handleSearch = async (text: string) => {
    if (!text) {
      const allArticles = await DatabaseService.getArticles(db);
      setFilteredArticles(allArticles);
      return;
    }

    try {
      const searchResults = await DatabaseService.searchArticles(db, text);
      setFilteredArticles(searchResults);
    } catch (error) {
      console.error('Erro na busca:', error);
    }
  };

  const handleClearSearch = async () => {
    const allArticles = await DatabaseService.getArticles(db);
    setFilteredArticles(allArticles);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando artigos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

      {filteredArticles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {loading ? 'Carregando...' : 'Nenhum artigo encontrado'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredArticles}
          renderItem={({ item }) => <ArticleCard article={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});