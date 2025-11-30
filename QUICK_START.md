# 🚀 Quick Start Guide

## ✅ Setup Complete!

All core components have been created. Here's how to start the app:

## 📱 Start the App

### 1. Install Dependencies (if not done)
```bash
npm install
```

### 2. Install iOS Pods (iOS only)
```bash
cd ios && bundle exec pod install && cd ..
```

### 3. Start Metro Bundler
Open a terminal and run:
```bash
npm start -- --reset-cache
```

### 4. Run the App
Open another terminal and run:

**For iOS:**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

---

## 📁 What's Been Created

### ✅ Components
- **MovieCard** - Movie poster card component
- **MovieList** - Horizontal scrolling movie list
- **MovieItem** - Vertical list item for search results
- **Loader** - Loading indicator
- **SearchBar** - Search input component
- **SvgIcon** - SVG icon components for bottom tabs

### ✅ Screens
- **Watch Screen** - Main home screen with movie listings (✅ Implemented)
- **Search Screen** - Search functionality (⏳ Ready for implementation)
- **Details Screen** - Movie details (⏳ Ready for implementation)
- **Trailer Screen** - Video player (⏳ Ready for implementation)
- **Seat Screen** - Seat selection (⏳ Ready for implementation)

### ✅ Types
- **Movie** - Movie data structure
- **MovieGenre** - Genre types
- **Seat** - Seat selection types
- **Cinema** - Cinema/showtime types

---

## 🎨 Design System

All components use:
- **Colors** from `@theme/colors`
- **Fonts** from `@theme/fonts` (Poppins)
- **Consistent styling** matching your design

---

## 🔄 Next Steps

1. **Connect to API** - Replace mock data with real API calls
2. **Implement Search** - Add search functionality
3. **Details Screen** - Build movie details page
4. **Trailer Player** - Add video playback
5. **Seat Selection** - Create seat map UI

---

## 🐛 Troubleshooting

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### iOS build issues
```bash
cd ios
rm -rf build Pods Podfile.lock
bundle exec pod install
cd ..
```

### Android build issues
```bash
cd android
./gradlew clean
cd ..
```

---

## 📚 Component Usage Examples

### MovieCard
```tsx
<MovieCard 
  movie={movie} 
  onPress={() => navigate('Details', { movie })} 
/>
```

### MovieList
```tsx
<MovieList 
  movies={movies} 
  title="Now Playing"
  onMoviePress={(movie) => handlePress(movie)}
/>
```

### SearchBar
```tsx
<SearchBar 
  placeholder="Search movies..."
  onSearch={(query) => handleSearch(query)}
/>
```

---

## 🎯 Current Status

- ✅ Navigation setup
- ✅ Theme & Colors
- ✅ Bottom Tab Bar with SVG icons
- ✅ Watch Screen with movie listings
- ✅ Core components created
- ⏳ API integration needed
- ⏳ Other screens to implement

**You're ready to start!** 🎉


