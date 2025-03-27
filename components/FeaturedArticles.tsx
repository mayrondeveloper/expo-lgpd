// components/FeaturedArticles.tsx
import { View, Text, FlatList } from 'react-native';
import mockArticles from '@/data/articles';
import ArticleCard from '@/components/ArticleCard';

interface FeaturedArticlesProps {
  searchQuery?: string;
}

export default function FeaturedArticles({ searchQuery = '' }: FeaturedArticlesProps) {
  const filteredArticles = mockArticles?.filter(article => {
    if (!searchQuery) return true;
    return (
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 16 }}>
        Artigos em Destaque
      </Text>
      <FlatList
        horizontal
        data={filteredArticles || []}
        renderItem={({ item }) => <ArticleCard article={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}