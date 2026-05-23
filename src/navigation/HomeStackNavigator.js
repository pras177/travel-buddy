import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator({ addToFavorites, removeFromFavorites, isFavorite }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#00b894' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
      }}
    >
      <Stack.Screen name="Home" options={{ title: 'Destinations' }}>
        {(props) => <HomeScreen {...props} isFavorite={isFavorite} />}
      </Stack.Screen>
      <Stack.Screen name="Detail" options={{ title: 'Detail Destinasi' }}>
        {(props) => (
          <DetailScreen
            {...props}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorite={isFavorite}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}