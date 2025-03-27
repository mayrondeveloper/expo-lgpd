import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';
import ArticleList from '@/components/ArticleList';
import mockArticles from '@/data/articles';

export default function CategoryScreen() {
  const { name } = useLocalSearchParams();

  const categoryName = typeof name === 'string'
    ? decodeURIComponent(name)
    : '';

  const categoryArticles = Array.isArray(mockArticles)
    ? mockArticles.filter(article => article.category === categoryName)
    : [];

  if (!categoryName || !mockArticles) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3182ce" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header name={categoryName} />
      <ArticleList articles={categoryArticles} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});