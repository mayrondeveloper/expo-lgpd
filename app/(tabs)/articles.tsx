// app/(tabs)/articles.tsx
import { useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { mockArticles } from '@/data/articles';
import ArticleCard from '@/components/ArticleCard';
import SearchBar from '@/components/SearchBar';

export default function ArticlesScreen() {
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);

  const handleSearch = (text: string) => {
    if (!text) {
      setFilteredArticles(mockArticles);
      return;
    }

    const filtered = mockArticles.filter(article => {
      const searchText = text.toLowerCase();
      return (
        article.title.toLowerCase().includes(searchText) ||
        article.content.toLowerCase().includes(searchText) ||
        article.category.toLowerCase().includes(searchText)
      );
    });

    setFilteredArticles(filtered);
  };

  const handleClearSearch = () => {
    setFilteredArticles(mockArticles);
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
      
      {filteredArticles && filteredArticles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum artigo encontrado</Text>
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