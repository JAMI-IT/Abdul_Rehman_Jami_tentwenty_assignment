/**
 * Search Bar Component
 * Search input with icon
 */

import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
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
  value = '',
  onChangeText,
}) => {
  const handleChangeText = (text: string) => {
    onChangeText?.(text);
  };

  const handleSearch = () => {
    onSearch?.(value);
  };

  const handleClear = () => {
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
          value={value}
          onChangeText={handleChangeText}
          onFocus={onFocus}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {value.length > 0 && (
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
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 52,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    minHeight: 44,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.md,
    color: colors.textPrimary,
    padding: 0,
    margin: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
  },
});

export default SearchBar;
