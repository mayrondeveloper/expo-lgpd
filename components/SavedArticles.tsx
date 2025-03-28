import { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import ArticleCard from '@/components/ArticleCard';
import { useSQLiteContext } from 'expo-sqlite';
import { DatabaseService } from '@/database/db';
import { useFocusEffect } from '@react-navigation/native';

export default function SavedArticles() {
  const db = useSQLiteContext();
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Função para carregar artigos salvos
  const loadSavedArticles = useCallback(async () => {
    try {
      const articles = await DatabaseService.getFavoriteArticles(db);
      setSavedArticles(articles);
    } catch (error) {
      console.error('Error loading saved articles:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [db]);

  // Atualiza quando a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      loadSavedArticles();
    }, [loadSavedArticles])
  );

  // Efeito inicial
  useEffect(() => {
    loadSavedArticles();
  }, [loadSavedArticles]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando artigos salvos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Artigos Salvos</Text>
      
      {savedArticles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum artigo salvo ainda</Text>
        </View>
      ) : (
        <FlatList
          data={savedArticles}
          renderItem={({ item }) => <ArticleCard article={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                loadSavedArticles();
              }}
              colors={['#3182CE']}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    color: '#1a365d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});