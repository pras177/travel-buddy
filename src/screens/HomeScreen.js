import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { destinations } from '../data/destinations';

export default function HomeScreen({ navigation, isFavorite }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { destination: item })}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      {isFavorite(item.id) && (
        <View style={styles.favBadge}>
          <Ionicons name="heart" size={14} color="#fff" />
        </View>
      )}
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color="#fdcb6e" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={13} color="#636e72" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.priceText}>{item.price}</Text>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subheader}>
        <Text style={styles.subheaderText}>{destinations.length} destinasi tersedia 🌏</Text>
      </View>
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  subheader: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6 },
  subheaderText: { fontSize: 13, color: '#636e72', fontWeight: '500' },
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, overflow: 'hidden', elevation: 3 },
  cardImage: { width: '100%', height: 180, resizeMode: 'cover' },
  categoryBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: '#00b894', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  categoryText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  favBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#e17055', width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  cardBody: { padding: 14 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardName: { fontSize: 17, fontWeight: '700', color: '#2d3436' },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 13, color: '#636e72', fontWeight: '600', marginLeft: 3 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  locationText: { fontSize: 13, color: '#636e72', marginLeft: 3 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10 },
  priceText: { fontSize: 15, fontWeight: '700', color: '#00b894' },
  durationText: { fontSize: 12, color: '#b2bec3', fontWeight: '500' },
});