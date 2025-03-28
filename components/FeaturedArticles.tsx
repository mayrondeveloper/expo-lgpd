// components/FeaturedArticles.tsx
import { View, Text, FlatList } from 'react-native';
import ArticleCard from '@/components/ArticleCard';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { DatabaseService } from '@/database/db';

interface FeaturedArticlesProps {
  searchQuery?: string;
}

export default function FeaturedArticles({ searchQuery = '' }: FeaturedArticlesProps) {
  const db = useSQLiteContext();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        // Carrega todos os artigos do banco de dados
        const loadedArticles = await DatabaseService.getArticles(db, 8);
        setArticles(loadedArticles);
      } catch (error) {
        console.error('Erro ao carregar artigos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  useEffect(() => {
    // Filtra os artigos conforme a busca
    if (searchQuery) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchQuery, articles]);

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Carregando artigos...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 16 }}>
        Artigos em Destaque
      </Text>

      {filteredArticles.length === 0 ? (
        <Text style={{ padding: 16 }}>
          {searchQuery ? 'Nenhum artigo encontrado' : 'Nenhum artigo disponível'}
        </Text>
      ) : (
        <FlatList
          data={filteredArticles}
          renderItem={({ item }) => <ArticleCard article={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      )}
    </View>
  );
}