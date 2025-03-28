import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import SaveButton from '@/components/saveButton';
import {getCategoryColorForCard} from '@/utils/categoryStyles.ts';

export default function ArticleCard({ article }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColorForCard(article.category).bgColor }]}>
          <Text style={[styles.categoryText, { color: getCategoryColorForCard(article.category).textColor }]}>
            {article.category}
          </Text>
        </View>
        <SaveButton articleId={article.id} />
      </View>

      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.summary}>{article.summary}</Text>

      <View style={styles.footer}>
        <View style={styles.readingTime}>
          <MaterialIcons name="schedule" size={14} color="#718096" />
          <Text style={styles.metaText}>{article.readingTime}</Text>
        </View>
        <Link href={`/article/${article.id}`} asChild>
          <TouchableOpacity style={styles.readMore}>
            <Text style={styles.readMoreText}>Ler mais</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#3182ce" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
    lineHeight: 24,
  },
  summary: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
    paddingTop: 12,
  },
  readingTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 4,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 14,
    color: '#3182CE',
    fontWeight: '600',
    marginRight: 4,
  },
});