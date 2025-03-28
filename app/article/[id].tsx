import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { DatabaseService } from '@/database/db';
import SaveButton from '@/components/saveButton';
import { MaterialIcons } from '@expo/vector-icons';
import { getCategoryColorForCard } from '@/utils/categoryStyles';

export default function ArticleDetail() {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const [article, setArticle] = useState<Article | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      const articleId = Number(id);
      const loadedArticle = await DatabaseService.getArticleById(db, articleId);
      setArticle(loadedArticle);

      const saved = await DatabaseService.isArticleSaved(db, articleId);
      setIsSaved(saved);
    };

    loadArticle();
  }, [id]);

  const handleToggleSave = async () => {
    if (!article) return;

    await DatabaseService.toggleFavorite(db, article.id);
    setIsSaved(!isSaved);
  };

  if (!article) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando artigo...</Text>
      </View>
    );
  }

  const categoryColors = getCategoryColorForCard(article.category);

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.categoryContainer}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColors.bgColor }]}>
            <Text style={[styles.categoryText, { color: categoryColors.textColor }]}>
              {article.category}
            </Text>
          </View>
          <SaveButton articleId={article.id} />
        </View>

        <Text style={styles.title}>{article.title}</Text>

        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <MaterialIcons name="calendar-today" size={16} color="#718096" />
            <Text style={styles.metaText}>{article.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialIcons name="schedule" size={16} color="#718096" />
            <Text style={styles.metaText}>{article.readingTime}</Text>
          </View>
        </View>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        {article.summary && (
          <>
            <Text style={styles.subtitle}>Resumo</Text>
            <Text style={styles.text}>{article.summary}</Text>
          </>
        )}

        <Text style={styles.subtitle}>Conteúdo</Text>
        <Text style={styles.text}>{article.content}</Text>

        {article.tags && (
          <>
            <Text style={styles.subtitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {article.tags.split(',').map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag.trim()}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="share" size={20} color="#3182ce" />
          <Text style={styles.actionText}>Compartilhar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="file-download" size={20} color="#3182ce" />
          <Text style={styles.actionText}>Salvar PDF</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  loadingText: {
    fontSize: 16,
    color: '#4a5568',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: 16,
    lineHeight: 32,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#718096',
  },
  content: {
    padding: 24,
    paddingTop: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginTop: 8,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4a5568',
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#ebf8ff',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#3182ce',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#edf2f7',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
  },
  actionText: {
    color: '#3182ce',
    fontWeight: '500',
    fontSize: 14,
  },
});