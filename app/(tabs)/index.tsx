// app/index.tsx
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Animated  } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import {useRef} from 'react';
import { getCategoryColor } from '@/utils/categoryStyles';


const mockArticles = [
  {
    id: 1,
    title: 'O que é a LGPD?',
    summary: 'Entenda a Lei Geral de Proteção de Dados do Brasil',
    category: 'Introdução',
    isFavorite: true
  },
  {
    id: 2,
    title: 'Direitos dos Titulares',
    summary: 'Conheça os 10 direitos garantidos pela LGPD',
    category: 'Direitos',
    isFavorite: false
  },
  {
    id: 3,
    title: 'Sanções Administrativas',
    summary: 'Multas e penalidades por descumprimento da lei',
    category: 'Sanções',
    isFavorite: true
  },
  {
    id: 4,
    title: 'Dados Sensíveis',
    summary: 'Regras especiais para categorias específicas de dados',
    category: 'Conceitos',
    isFavorite: false
  },
];

const mockCategories = [
  { name: 'Introdução', count: 5 },
  { name: 'Direitos', count: 8 },
  { name: 'Obrigações', count: 6 },
  { name: 'Sanções', count: 4 },
  { name: 'Jurisprudência', count: 12 },
];

const getCategoryIcon = (name: string) => {
  switch(name) {
    case 'Introdução': return 'start';
    case 'Direitos': return 'gavel';
    case 'Obrigações': return 'shield';
    case 'Sanções': return 'warning';
    case 'Jurisprudência': return 'bookmarks';
    default: return 'folder';
  }
};



export default function HomeScreen() {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lei LGPD - Digital</Text>
        <Text style={styles.subtitle}>Tudo sobre proteção de dados no Brasil</Text>
      </View>

      <Link href="/search" asChild>
        <TouchableOpacity style={styles.searchBar}>
          <MaterialIcons name="search" size={24} color="#666" />
          <Text style={styles.searchText}>Buscar artigos, conceitos...</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Artigos em Destaque</Text>
          <Link href="/articles" asChild>
            <TouchableOpacity style={styles.seeAll}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <FlatList
          horizontal
          data={mockArticles}
          renderItem={({ item }) => (
            <Link href={`/article/${item.id}`} asChild>
              <TouchableOpacity style={styles.articleCard}>
                <View style={styles.favoriteIcon}>
                  <MaterialIcons
                    name={item.isFavorite ? "favorite" : "favorite-outline"}
                    size={20}
                    color={item.isFavorite ? "#FF3B30" : "#ccc"}
                  />
                </View>
                <Text style={styles.articleCategory}>{item.category}</Text>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <Text style={styles.articleSummary}>{item.summary}</Text>
              </TouchableOpacity>
          </Link>
        )}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.articlesContainer}
      />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore por Categorias</Text>
        </View>

       <FlatList
         data={mockCategories}
         scrollEnabled={false}
         renderItem={({ item }) => {
           const colors = getCategoryColor(item.name);
           return (
               <Link href={`/categories/${encodeURIComponent(item.name)}`} asChild>
               <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.8}
                style={{...styles.categoryCard,
                  backgroundColor: colors.bgColor,
                  borderLeftWidth: 4,
                  borderLeftColor: colors.iconColor
                }}>
                 <View style={{...styles.categoryIconContainer,
                   backgroundColor: `${colors.iconColor}20` }}>
                   <MaterialIcons
                     name={colors.icon}
                     size={20}
                     color={colors.iconColor}
                   />
                 </View>
                 <View style={styles.categoryTextContainer}>
                   <Text style={{...styles.categoryName, color: colors.textColor }}>
                     {item.name}
                   </Text>
                   <Text style={styles.categoryCount}>
                     {item.count} artigos disponíveis
                   </Text>
                 </View>
                 <MaterialIcons
                   name="chevron-right"
                   size={24}
                   color={colors.iconColor}
                 />
               </TouchableOpacity>
             </Link>
           );
         }}
         keyExtractor={(item) => item.name}
       />
      </View>

      <View style={styles.newsletterCard}>
        <Text style={styles.newsletterTitle}>Fique por dentro!</Text>
        <Text style={styles.newsletterText}>Receba atualizações sobre LGPD diretamente no seu e-mail</Text>
        <TouchableOpacity style={styles.newsletterButton}>
          <Text style={styles.newsletterButtonText}>Assinar Newsletter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a365d',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 10,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3748',
  },
  articlesContainer: {
    paddingRight: 16,
  },
  articleCard: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteIcon: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  articleCategory: {
    color: '#4299e1',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 8,
  },
  articleSummary: {
    color: '#718096',
    fontSize: 14,
    lineHeight: 20,
  },
  categoriesGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  newsletterCard: {
    backgroundColor: '#3182ce',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  newsletterTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  newsletterText: {
    color: '#ebf8ff',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  newsletterButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  newsletterButtonText: {
    color: '#3182ce',
    fontWeight: '600',
  },
  sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    categoryCard: {
       flexDirection: 'row',
       alignItems: 'center',
       borderRadius: 12,
       padding: 16,
       marginBottom: 12,
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 1 },
       shadowOpacity: 0.1,
       shadowRadius: 3,
       elevation: 2,
     },
     categoryIconContainer: {
       borderRadius: 8,
       width: 40,
       height: 40,
       justifyContent: 'center',
       alignItems: 'center',
       marginRight: 16,
     },
     categoryTextContainer: {
       flex: 1,
     },
     categoryName: {
       fontSize: 16,
       fontWeight: '600',
       marginBottom: 4,
     },
     categoryCount: {
       fontSize: 13,
       color: '#718096',
     },
    categoryIcon: {
      opacity: 0.8,
    },
    seeAll: {
      color: '#3182ce',
      fontWeight: '500',
      fontSize: 14,
    },
});