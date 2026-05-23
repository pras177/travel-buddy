import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  Image, StyleSheet, SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { destinations } from '../data/destinations';

const CATEGORIES = ['Semua', 'Pantai', 'Gunung', 'Budaya', 'Diving', 'Danau', 'Alam'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const navigation = useNavigation();

  const filtered = destinations.filter((d) => {
    const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.location.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || d.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('HomeTab', { screen: 'Detail', params: { destination: item } })}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#fdcb6e" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color="#636e72" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cari Destinasi</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#b2bec3" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Cari nama atau lokasi..." placeholderTextColor="#b2bec3" value={query} onChangeText={setQuery} />
        {query.length > 0 && <TouchableOpacity onPress={() => setQuery('')}><Ionicons name="close-circle" size={18} color="#b2bec3" /></TouchableOpacity>}
      </View>
      <FlatList
        data={CATEGORIES}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryChip, selectedCategory === item && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[styles.chipText, selectedCategory === item && styles.chipTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.resultCount}>{filtered.length} destinasi ditemukan</Text>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color="#b2bec3" />
            <Text style={styles.emptyText}>Destinasi tidak ditemukan</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#00b894', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginTop: 14, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, elevation: 2 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#2d3436' },
  categoryList: { paddingHorizontal: 16, paddingVertical: 12 },
  categoryChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e0e0e0', marginRight: 8 },
  categoryChipActive: { backgroundColor: '#00b894', borderColor: '#00b894' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#636e72' },
  chipTextActive: { color: '#fff' },
  resultCount: { paddingHorizontal: 20, fontSize: 12, color: '#b2bec3', marginBottom: 4, fontWeight: '500' },
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 14, marginBottom: 12, flexDirection: 'row', overflow: 'hidden', elevation: 2 },
  cardImage: { width: 90, height: 90, resizeMode: 'cover' },
  cardBody: { flex: 1, padding: 12, justifyContent: 'space-between' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { fontSize: 15, fontWeight: '700', color: '#2d3436' },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, color: '#636e72', fontWeight: '600', marginLeft: 3 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 12, color: '#636e72', marginLeft: 3 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoryBadge: { backgroundColor: '#e8faf5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  categoryText: { color: '#00b894', fontSize: 10, fontWeight: '700' },
  priceText: { fontSize: 12, fontWeight: '700', color: '#00b894' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#636e72', marginTop: 16 },
});