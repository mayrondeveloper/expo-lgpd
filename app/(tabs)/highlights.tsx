// app/(tabs)/index.tsx
import { useState } from 'react';
import { View } from 'react-native';
import SearchBar from '@/components/SearchBar';
import FeaturedArticles from '@/components/FeaturedArticles';

export default function Highlights() {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={{ flex: 1, marginBottom: 80}}>
      <View style={{ padding: 16 }}>
        <SearchBar
          onSearch={(text) => setSearchText(text)}
          onClear={() => setSearchText('')}
        />
      </View>

      <FeaturedArticles searchQuery={searchText} />
    </View>
  );
}