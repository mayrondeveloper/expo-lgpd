// components/LGPDChat.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Linking
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import { DatabaseService } from '@/database/db';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { Link } from 'expo-router';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  articleId?: number; // Adicionado para links de artigos
}

export default function LGPDChat() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const db = useSQLiteContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Mensagem inicial do bot
  useEffect(() => {
    setMessages([{
      id: '1',
      text: 'Olá! Sou seu assistente de LGPD. Posso te ajudar a encontrar informações sobre a Lei de Proteção de Dados. O que você gostaria de saber?',
      isUser: false,
      timestamp: new Date()
    }]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim() || loading) return;

    // Mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // Resposta do bot
    const botResponse = await generateBotResponse(inputText);
    setLoading(false);

    setMessages(prev => [...prev, botResponse]);
  };

  const generateBotResponse = async (question: string): Promise<Message> => {
    try {
      const relevantArticles = await DatabaseService.searchArticles(db, question);

      if (relevantArticles.length === 0) {
        return {
          id: Date.now().toString(),
          text: 'Não encontrei informações específicas sobre isso na LGPD. Você pode reformular sua pergunta ou tentar outro tópico relacionado à proteção de dados.',
          isUser: false,
          timestamp: new Date()
        };
      }

      const firstArticle = relevantArticles[0];
      const summary = firstArticle.summary || 'Clique no link para ver o artigo completo.';

      return {
        id: Date.now().toString(),
        text: `Encontrei este artigo relevante:\n\n📌 ${firstArticle.title}\n\nℹ️ ${summary}`,
        isUser: false,
        timestamp: new Date(),
        articleId: firstArticle.id
      };
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
      return {
        id: Date.now().toString(),
        text: 'Ocorreu um erro ao buscar as informações. Por favor, tente novamente mais tarde.',
        isUser: false,
        timestamp: new Date()
      };
    }
  };

  const renderMessage = useCallback(({ item }: { item: Message }) => {
    return (
      <View style={[
        styles.messageContainer,
        item.isUser ?
          {
            backgroundColor: themeColors.tint,
            alignSelf: 'flex-end',
            borderBottomRightRadius: 0
          } :
          {
            backgroundColor: colorScheme === 'dark' ? '#2E2E2E' : '#e2e8f0',
            alignSelf: 'flex-start',
            borderBottomLeftRadius: 0
          }
      ]}>
        <Text style={[
          styles.messageText,
          item.isUser && { color: themeColors.text }
        ]}>
          {item.text}
        </Text>

        {item.articleId && (
          <Link href={`/article/${item.articleId}`} asChild>
            <TouchableOpacity style={styles.articleLink}>
              <Text style={[styles.linkText, { color: themeColors.tint }]}>
                📖 Ler artigo completo
              </Text>
            </TouchableOpacity>
          </Link>
        )}

        <Text style={[
          styles.timestamp,
          item.isUser && { color: colorScheme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }
        ]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  }, [colorScheme, themeColors]);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.inputContainer, {
          backgroundColor: themeColors.background,
          borderTopColor: colorScheme === 'dark' ? '#333' : '#e2e8f0'
        }]}
      >
        <TextInput
          style={[styles.input, {
            backgroundColor: colorScheme === 'dark' ? '#252525' : '#edf2f7',
            color: themeColors.text
          }]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua pergunta sobre LGPD..."
          placeholderTextColor={themeColors.icon}
          multiline
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: themeColors.tint }]}
          onPress={handleSendMessage}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={themeColors.text} />
          ) : (
            <MaterialIcons name="send" size={24} color={themeColors.text} />
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 8,
  },
  articleLink: {
    marginTop: 8,
    marginBottom: 4,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  timestamp: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});