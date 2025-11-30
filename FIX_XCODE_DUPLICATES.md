# 🔧 Fix Xcode Duplicate Fonts - Step by Step

## The Problem
Xcode is trying to copy the same font files twice because they're referenced in multiple places.

## ✅ Solution: Remove Duplicates in Xcode

### Step 1: Open Xcode
```bash
open ios/Abdul_Rehman_Jami_tentwenty_assignment.xcworkspace
```

### Step 2: Remove Duplicate Font References

1. In Xcode, click on the **project name** in the left navigator (blue icon at the top)
2. Select the **"Abdul_Rehman_Jami_tentwenty_assignment"** target
3. Click on **"Build Phases"** tab
4. Expand **"Copy Bundle Resources"**
5. Look for duplicate font files (MaterialIcons.ttf, AntDesign.ttf, etc.)
6. **Remove** any vector icon fonts (MaterialIcons, AntDesign, Entypo, etc.)
   - These are handled by the RNVectorIcons pod automatically
7. **Keep only** Poppins fonts if they appear there

### Step 3: Clean and Build

1. Press **⇧⌘K** (Clean Build Folder)
2. Press **⌘B** (Build)

## Alternative: Command Line Fix

If you prefer command line, you can try:

```bash
# Clean everything
cd ios
rm -rf build
rm -rf Pods
rm Podfile.lock
cd ..

# Remove DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData/Abdul_Rehman_Jami_tentwenty_assignment-*

# Reinstall
cd ios
bundle exec pod install
cd ..

# Try building again
npm run ios
```

## ✅ Current Status

- ✅ react-native.config.js: Only Poppins fonts
- ✅ Info.plist: Only Poppins fonts
- ✅ react-native-vector-icons: Auto-links fonts via CocoaPods
- ⚠️ Xcode project: May have duplicate references (needs manual cleanup)

## 📝 Important Note

`react-native-vector-icons` fonts are **automatically** handled by the CocoaPods pod. They should NOT be in:
- ❌ Your app target's "Copy Bundle Resources"
- ❌ Info.plist (for vector icons - only Poppins should be there)

They ARE automatically included by the RNVectorIcons pod, so they'll work without manual configuration!

