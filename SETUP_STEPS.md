# 🎬 Movie App Setup & Development Steps

## 📋 Quick Start Guide

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Install iOS Pods (iOS only)
```bash
cd ios && bundle exec pod install && cd ..
```

### Step 3: Start Metro Bundler
```bash
npm start -- --reset-cache
```

### Step 4: Run the App
```bash
# iOS
npm run ios

# Android
npm run android
```

---

## 🏗️ Component Architecture

### Screen Structure
- **Watch Screen** - Main movie browsing (Home)
- **Search Screen** - Search movies by category/keyword
- **Details Screen** - Movie details page
- **Trailer Screen** - Video player for trailers
- **Seat Screen** - Cinema seat selection

### Component Hierarchy
```
src/
├── components/
│   ├── common/
│   │   ├── Loader.tsx          ✅ Created
│   │   ├── MovieCard.tsx       ✅ Created
│   │   └── SvgIcon.tsx         ✅ Created
│   ├── movie/
│   │   ├── MovieItem.tsx       ✅ Created
│   │   ├── MovieList.tsx       ✅ Created
│   │   └── MoviePoster.tsx     ⏳ To Create
│   ├── search/
│   │   ├── SearchBar.tsx       ⏳ To Create
│   │   └── CategoryGrid.tsx    ⏳ To Create
│   └── seat/
│       ├── SeatMap.tsx         ⏳ To Create
│       └── SeatLegend.tsx      ⏳ To Create
└── screens/
    ├── Watch/                  ✅ Created (needs implementation)
    ├── Search/                 ✅ Created (needs implementation)
    ├── Details/                ✅ Created (needs implementation)
    ├── Trailer/                ✅ Created (needs implementation)
    └── Seat/                   ✅ Created (needs implementation)
```

---

## 🎨 Design System

### Colors
- Primary: `#2E2739` (Dark purple background)
- Background: `#F6F6FA` (Light background)
- Text Primary: `#2E2739`
- Text Secondary: `#827D88`
- Accent Blue: `#61C3F2`
- Accent Teal: `#15D2BC`

### Typography
- Font Family: Poppins
- Sizes: xs(12), sm(14), md(16), lg(18), xl(20), xxl(24), title(32)

---

## 📱 Implementation Order

1. ✅ **Setup** - Navigation, Theme, Colors, Fonts
2. ⏳ **Watch Screen** - Movie list with posters
3. ⏳ **Movie Components** - Card, List, Poster
4. ⏳ **Search Screen** - Search bar + categories
5. ⏳ **Details Screen** - Movie info + trailer button
6. ⏳ **Trailer Screen** - Video player
7. ⏳ **Seat Screen** - Seat selection UI

---

## 🚀 Next Steps

1. Implement Watch Screen with movie listings
2. Create reusable MovieCard component
3. Add Search functionality
4. Build Details screen
5. Implement Trailer player
6. Create Seat selection UI


