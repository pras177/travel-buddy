# Travel Buddy 🌏

Multi-screen React Native app dengan React Navigation — destinasi wisata Indonesia di genggaman kamu.

## Screenshots

> Paste 2–3 screenshot dari Expo Go di sini (HomeScreen, DetailScreen, FavoritesScreen)

## Features

- **Bottom Tab Navigation** — 3 tab: Home, Search, Favorites
- **Stack Navigator di setiap Tab** — nested navigation dengan back stack yang benar
- **Route Params** — data destinasi di-pass ke DetailScreen via `navigation.navigate()`
- **10 Destinasi Wisata Indonesia** — dengan image, harga, rating, highlights
- **Filter Kategori** — filter di HomeScreen (Island, Adventure, Culture, Nature)
- **Search Functionality** — real-time search by nama, lokasi, dan kategori
- **Add to Favorites** — simpan/hapus destinasi favorit dengan state global (Context API)
- **Favorites Badge** — live count di tab icon Favorit
- **Nested Navigation di SearchTab** — Search → SearchDetail (bonus)
- **@expo/vector-icons** — Ionicons untuk semua tab icon dan UI icon
- **Responsive Layout** — Safe Area support untuk iPhone dan Android

## Tech Stack

- React Native + Expo (~51)
- React Navigation 6
  - `@react-navigation/native`
  - `@react-navigation/bottom-tabs`
  - `@react-navigation/stack`
- React Context API (global favorites state)
- StyleSheet (no third-party UI library)
- @expo/vector-icons (Ionicons)

## Struktur Navigasi

```
NavigationContainer
└── BottomTabNavigator
    ├── HomeTab → HomeStack
    │   ├── HomeScreen      ← FlatList destinasi + filter kategori
    │   └── DetailScreen    ← Hero image + info lengkap + tombol favorit
    │
    ├── SearchTab → SearchStack        [Bonus: nested navigation]
    │   ├── SearchScreen    ← Real-time search + quick chips
    │   └── SearchDetail    ← DetailScreen (shared component)
    │
    └── FavTab → FavStack
        ├── FavoritesScreen ← List favorit + badge count
        └── FavDetail       ← DetailScreen (shared component)
```

## How to Run

1. Clone repo:
   ```bash
   git clone https://github.com/[USERNAME]/travel-buddy.git
   cd travel-buddy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan Expo:
   ```bash
   npx expo start
   ```

4. Scan QR code di Expo Go (iOS/Android)

## Struktur File

```
travel-buddy/
├── App.js                          # Entry point + FavoritesProvider
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js         # Semua navigator (Tab + Stack)
│   ├── screens/
│   │   ├── HomeScreen.js           # Tab Home + filter kategori
│   │   ├── DetailScreen.js         # Detail destinasi (hero image)
│   │   ├── SearchScreen.js         # Search + quick chips
│   │   └── FavoritesScreen.js      # Daftar favorit
│   ├── components/
│   │   └── DestinationCard.js      # Card reusable
│   ├── context/
│   │   └── FavoritesContext.js     # Global state favorites
│   ├── data/
│   │   └── destinations.js         # 10 destinasi data
│   └── theme.js                    # Colors, spacing, radius, shadow
├── package.json
├── app.json
└── babel.config.js
```

## Author

[Nama Kamu] — [NIM] — [Kelas]
