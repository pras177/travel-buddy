import {
  View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetailScreen({ route, navigation, addToFavorites, removeFromFavorites, isFavorite }) {
  const { destination } = route.params;
  const favorited = isFavorite(destination.id);

  const toggleFavorite = () => {
    if (favorited) removeFromFavorites(destination.id);
    else addToFavorites(destination);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.image }} style={styles.heroImage} />
          <View style={styles.imageInfo}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{destination.category}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#fdcb6e" />
              <Text style={styles.ratingText}>{destination.rating}</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.name}>{destination.name}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={15} color="#00b894" />
                <Text style={styles.location}>{destination.location}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.favButton, favorited && styles.favButtonActive]}
              onPress={toggleFavorite}
            >
              <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={22} color={favorited ? '#fff' : '#e17055'} />
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoCard}>
              <Ionicons name="cash-outline" size={20} color="#00b894" />
              <Text style={styles.infoLabel}>Estimasi Biaya</Text>
              <Text style={styles.infoValue}>{destination.price}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="time-outline" size={20} color="#6c5ce7" />
              <Text style={styles.infoLabel}>Durasi</Text>
              <Text style={styles.infoValue}>{destination.duration}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tentang Destinasi</Text>
            <Text style={styles.description}>{destination.description}</Text>
          </View>
          <TouchableOpacity
            style={[styles.ctaButton, favorited && styles.ctaButtonFavorited]}
            onPress={toggleFavorite}
          >
            <Ionicons name={favorited ? 'heart-dislike-outline' : 'heart-outline'} size={18} color="#fff" />
            <Text style={styles.ctaText}>{favorited ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={18} color="#636e72" />
            <Text style={styles.backText}>Kembali ke Daftar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  imageContainer: { position: 'relative', height: 280 },
  heroImage: { width: '100%', height: 280, resizeMode: 'cover' },
  imageInfo: { position: 'absolute', bottom: 16, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
  categoryBadge: { backgroundColor: '#00b894', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  categoryText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  ratingBadge: { backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
  ratingText: { color: '#fff', fontSize: 13, fontWeight: '700', marginLeft: 4 },
  content: { padding: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  titleBlock: { flex: 1, marginRight: 12 },
  name: { fontSize: 26, fontWeight: '800', color: '#2d3436', marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  location: { fontSize: 14, color: '#636e72', marginLeft: 4 },
  favButton: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#e17055', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  favButtonActive: { backgroundColor: '#e17055', borderColor: '#e17055' },
  infoRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  infoCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 14, alignItems: 'center', elevation: 2 },
  infoLabel: { fontSize: 11, color: '#b2bec3', marginTop: 6, fontWeight: '600' },
  infoValue: { fontSize: 13, color: '#2d3436', fontWeight: '700', marginTop: 2, textAlign: 'center' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#2d3436', marginBottom: 10 },
  description: { fontSize: 15, lineHeight: 24, color: '#636e72' },
  ctaButton: { backgroundColor: '#00b894', borderRadius: 14, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  ctaButtonFavorited: { backgroundColor: '#e17055' },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700', marginLeft: 6 },
  backButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  backText: { color: '#636e72', fontSize: 14, fontWeight: '500', marginLeft: 4 },
});