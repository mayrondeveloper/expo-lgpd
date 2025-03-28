// components/LGPDChat.tsx
import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import { DatabaseService } from '@/database/db';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function LGPDChat() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const db = useSQLiteContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

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

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    const botResponse = await generateBotResponse(inputText);

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      isUser: false,
      timestamp: new Date()
    }]);
    setLoading(false);
  };

  const generateBotResponse = async (question: string): Promise<Message> => {
    try {
      // Limpa e prepara a query
      const cleanQuery = question.trim().toLowerCase();

      // Busca otimizada
      const relevantArticles = await DatabaseService.searchArticles(db, cleanQuery);

      if (!relevantArticles || relevantArticles.length === 0) {
        return {
          id: Date.now().toString(),
          text: 'Não encontrei informações sobre direitos dos titulares. Você pode tentar perguntar de outra forma, como:\n\n• "Quais direitos tenho sobre meus dados?"\n• "O que a LGPD diz sobre acesso a dados?"\n\nOu explore a seção "Direitos" no menu.',
          isUser: false,
          timestamp: new Date()
        };
      }

      // Melhor resultado (lógica aprimorada)
      const bestMatch = relevantArticles.find(article =>
        article.title.toLowerCase().includes('direito') ||
        article.category.toLowerCase() === 'direitos'
      ) || relevantArticles[0];

      return {
        id: Date.now().toString(),
        text: `Aqui está o que encontrei sobre direitos dos titulares:\n\n` +
              `📌 ${bestMatch.title}\n\n` +
              `ℹ️ ${bestMatch.summary || 'Resumo não disponível'}\n\n` +
              `🔍 Dica: Veja os artigos ${bestMatch.id} e seguintes para detalhes completos.`,
        isUser: false,
        timestamp: new Date(),
        articleId: bestMatch.id
      };

    } catch (error) {
      console.error('Erro na busca:', error);
      return {
        id: Date.now().toString(),
        text: 'Estou tendo dificuldades para acessar o banco de dados. Por favor, tente novamente mais tarde ou verifique a seção "Direitos" manualmente.',
        isUser: false,
        timestamp: new Date()
      };
    }
  };

 return (
     <View style={[styles.container, { backgroundColor: themeColors.background }]}>
       <FlatList
         ref={flatListRef}
         data={messages}
         keyExtractor={(item) => item.id}
         renderItem={({ item }) => (
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
             <Text style={[
               styles.timestamp,
               item.isUser && { color: colorScheme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }
             ]}>
               {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </Text>
           </View>
         )}
         contentContainerStyle={styles.messagesContainer}
         onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
       />

       <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={[styles.inputContainer, { backgroundColor: themeColors.background, borderTopColor: colorScheme === 'dark' ? '#333' : '#e2e8f0' }]}
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
   },
   timestamp: {
     fontSize: 12,
     marginTop: 4,
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