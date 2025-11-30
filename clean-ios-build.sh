#!/bin/bash

echo "🧹 Cleaning iOS build..."

# Clean Metro cache
echo "Cleaning Metro cache..."
rm -rf /tmp/metro-* 2>/dev/null
rm -rf /tmp/haste-* 2>/dev/null

# Clean iOS build
echo "Cleaning iOS build folder..."
cd ios
rm -rf build
rm -rf Pods
rm -rf Podfile.lock

# Clean Xcode derived data
echo "Cleaning Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/Abdul_Rehman_Jami_tentwenty_assignment-* 2>/dev/null

# Reinstall pods
echo "Reinstalling CocoaPods..."
bundle exec pod install

echo "✅ Clean complete! Now try: npm run ios"

