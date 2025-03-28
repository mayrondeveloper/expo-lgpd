import { FlatList, StyleSheet } from 'react-native';
import ArticleCard from '@/components/ArticleCard';
import { View, Text } from 'react-native';

const ArticleList = ({ articles }: { articles: typeof mockArticles }) => {
  if (articles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum artigo encontrado</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => <ArticleCard article={item} variant="list" />}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
  }
});

export default ArticleList;