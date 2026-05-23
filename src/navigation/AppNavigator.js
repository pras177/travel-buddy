import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (destination) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === destination.id);
      if (exists) return prev;
      return [...prev, destination];
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'SearchTab') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'FavoritesTab') {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00b894',
          tabBarInactiveTintColor: '#b2bec3',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            paddingBottom: 6,
            paddingTop: 6,
            height: 62,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          headerShown: false,
        })}
      >
        <Tab.Screen name="HomeTab" options={{ tabBarLabel: 'Home' }}>
          {() => (
            <HomeStackNavigator
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isFavorite={isFavorite}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="SearchTab" options={{ tabBarLabel: 'Search' }}>
          {() => (
            <SearchScreen
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isFavorite={isFavorite}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="FavoritesTab"
          options={{
            tabBarLabel: 'Favorites',
            tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
            tabBarBadgeStyle: { backgroundColor: '#00b894', color: '#fff', fontSize: 10 },
          }}
        >
          {() => (
            <FavoritesScreen
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}