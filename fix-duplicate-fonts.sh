#!/bin/bash

# Script to fix duplicate font references in Xcode project
# This removes fonts that are already handled by react-native-vector-icons autolinking

echo "🔧 Fixing duplicate font references..."

cd ios

# Clean build folders
echo "Cleaning build folders..."
rm -rf build
rm -rf ~/Library/Developer/Xcode/DerivedData/Abdul_Rehman_Jami_tentwenty_assignment-*

# Reinstall pods (this will properly link fonts via autolinking)
echo "Reinstalling pods..."
bundle exec pod install

echo "✅ Done! Now try building again: npm run ios"

