// components/SearchBar.tsx
import { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps {
  onSearch: (text: string) => void;
  onClear: () => void;
}

export default function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
    onClear();
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={20} color="#666" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Buscar artigos..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          onSearch(text);
        }}
        returnKeyType="search"
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <MaterialIcons name="close" size={18} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 16,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 8,
  },
  clearButton: {
    padding: 4,
  },
});