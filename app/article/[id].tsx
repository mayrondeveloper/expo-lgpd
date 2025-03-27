// app/article/[id].tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const mockArticleDetails = {
  1: {
    title: 'O que é a LGPD?',
    content: `A Lei Geral de Proteção de Dados Pessoais (LGPD), Lei nº 13.709/2018, é a legislação brasileira que regula as atividades de tratamento de dados pessoais.

## Principais características:
- Aplicável a qualquer operação de tratamento de dados
- Inspirada no GDPR europeu
- Entrou em vigor em setembro de 2020
- Fiscalizada pela ANPD (Autoridade Nacional de Proteção de Dados)

## Âmbito de aplicação:
A LGPD se aplica a:
1. Todo tratamento realizado no Brasil
2. Dados coletados no Brasil
3. Tratamento com finalidade de oferta de bens/serviços no Brasil`,
    category: 'Introdução',
    date: '15/05/2023',
    author: 'Equipe LGPD Explorer',
    isFavorite: true
  },
  2: {
    title: 'Direitos dos Titulares',
    content: `A LGPD estabelece dez direitos básicos para os titulares de dados pessoais.

## Direitos garantidos:
1. Confirmação da existência de tratamento
2. Acesso aos dados
3. Correção de dados incompletos ou inexatos
4. Anonimização, bloqueio ou eliminação de dados desnecessários
5. Portabilidade dos dados
6. Eliminação dos dados tratados com consentimento
7. Informação sobre compartilhamento
8. Revogação do consentimento
9. Revisão de decisões automatizadas
10. Oposição ao tratamento realizado com base em legítimo interesse

Estes direitos podem ser exercidos mediante requisição ao controlador dos dados.`,
    category: 'Direitos',
    date: '22/05/2023',
    author: 'Equipe LGPD Explorer',
    isFavorite: false
  }
};

export default function ArticleScreen() {
  const { id } = useLocalSearchParams();
  const article = mockArticleDetails[id as keyof typeof mockArticleDetails];

  if (!article) {
    return (
      <View style={styles.container}>
        <Text>Artigo não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <MaterialIcons
                name={article.isFavorite ? "favorite" : "favorite-outline"}
                size={24}
                color={article.isFavorite ? "#FF3B30" : "#000"}
              />
            </TouchableOpacity>
          )
        }}
      />

      <View style={styles.header}>
        <Text style={styles.category}>{article.category}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.meta}>Publicado em {article.date}</Text>
          <Text style={styles.meta}>•</Text>
          <Text style={styles.meta}>{article.author}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {article.content.split('\n\n').map((paragraph, index) => (
          <Text key={index} style={
            paragraph.startsWith('##') ? styles.subtitle : styles.text
          }>
            {paragraph.replace('##', '')}
          </Text>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="share" size={20} color="#3182ce" />
          <Text style={styles.actionText}>Compartilhar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="bookmark" size={20} color="#3182ce" />
          <Text style={styles.actionText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 16,
  },
  category: {
    color: '#4299e1',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a365d',
    marginBottom: 12,
    lineHeight: 32,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    color: '#718096',
    fontSize: 14,
    marginRight: 8,
  },
  content: {
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3748',
    marginTop: 24,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2d3748',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 26
  },
  actionText: {
    color: '#3182ce',
    marginLeft: 8,
    fontWeight: '500',
  },
});