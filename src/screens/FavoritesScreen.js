import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FavoritesScreen({ favorites, removeFromFavorites }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('HomeTab', { screen: 'Detail', params: { destination: item } })}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <View>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={12} color="#636e72" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeFromFavorites(item.id)}>
          <Ionicons name="trash-outline" size={18} color="#e17055" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorit Saya</Text>
        {favorites.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{favorites.length}</Text>
          </View>
        )}
      </View>
      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={64} color="#b2bec3" />
          <Text style={styles.emptyTitle}>Belum ada favorit</Text>
          <Text style={styles.emptySubtext}>Tap ikon hati di halaman detail untuk menyimpan destinasi favoritmu</Text>
          <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate('HomeTab')}>
            <Text style={styles.exploreText}>Jelajahi Destinasi</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#00b894', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  countBadge: { backgroundColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  countText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  listContent: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 14, marginBottom: 12, flexDirection: 'row', overflow: 'hidden', elevation: 2 },
  cardImage: { width: 100, height: 100, resizeMode: 'cover' },
  cardBody: { flex: 1, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { fontSize: 16, fontWeight: '700', color: '#2d3436', marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  locationText: { fontSize: 12, color: '#636e72', marginLeft: 3 },
  priceText: { fontSize: 13, fontWeight: '700', color: '#00b894' },
  removeButton: { padding: 8, borderRadius: 8, backgroundColor: '#fff5f3' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#2d3436', marginTop: 16, marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#b2bec3', textAlign: 'center', lineHeight: 22 },
  exploreButton: { marginTop: 24, backgroundColor: '#00b894', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12 },
  exploreText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});