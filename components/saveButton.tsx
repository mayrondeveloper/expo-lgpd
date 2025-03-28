// components/SaveButton.tsx
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import { useState, useEffect } from 'react';
import { DatabaseService } from '@/database/db';

export default function SaveButton({ articleId }: { articleId: number }) {
  const db = useSQLiteContext();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function checkSavedStatus() {
      const saved = await DatabaseService.isArticleSaved(db, articleId);
      setIsSaved(saved);
    }
    checkSavedStatus();
  }, [articleId]);

  const handleToggleSave = async () => {
    await DatabaseService.toggleFavorite(db, articleId);
    setIsSaved(!isSaved);
  };

  return (
    <TouchableOpacity onPress={handleToggleSave}>
      <MaterialIcons
        name={isSaved ? "bookmark" : "bookmark-outline"}
        size={24}
        color={isSaved ? "#3182CE" : "#A0AEC0"}
      />
    </TouchableOpacity>
  );
}