// app/(tabs)/index.tsx
import { useState } from 'react';
import { View } from 'react-native';
import SearchBar from '@/components/SearchBar';
import SavedArticles from '@/components/SavedArticles';

export default function Saved() {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <SearchBar
          onSearch={(text) => setSearchText(text)}
          onClear={() => setSearchText('')}
        />
      </View>

      <SavedArticles searchQuery={searchText} />
    </View>
  );
}