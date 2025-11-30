/**
 * Search Bar Component
 * Search input with icon
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search movies...',
  onSearch,
  onFocus,
  value,
  onChangeText,
}) => {
  const [searchQuery, setSearchQuery] = useState(value || '');

  const handleChangeText = (text: string) => {
    setSearchQuery(text);
    onChangeText?.(text);
  };

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onChangeText?.('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={handleChangeText}
          onFocus={onFocus}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Icon name="close" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.md,
    color: colors.textPrimary,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;


