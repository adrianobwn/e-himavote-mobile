import { background, Fonts } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { getUserData as getUserDataFirebase } from '@/services/firestoreService';
import { getUserData as getUserDataLocal, type UserData } from '@/utils/storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { userEmail, logout, userId } = useAuth();
  const router = useRouter();
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Coba load dari Firebase dulu
      if (userId) {
        const firebaseData = await getUserDataFirebase(userId);
        if (firebaseData) {
          setUserData(firebaseData);
          setLoading(false);
          return;
        }
      }
      
      // Fallback ke local storage
      const localData = await getUserDataLocal();
      setUserData(localData);
    } catch (error) {
      console.error('Error loading user data:', error);
      // Fallback ke local storage jika Firebase error
      const localData = await getUserDataLocal();
      setUserData(localData);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const handleVote = (paslon: number) => {
    Alert.alert(
      'Konfirmasi',
      `Apakah Anda yakin memilih Paslon ${paslon}?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Ya',
          onPress: () => {
            // TODO: Save vote to Firebase
            Alert.alert('Sukses', `Terima kasih telah memilih Paslon ${paslon}!`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
        {/* Header */}
        <Text style={styles.mainTitle}>Welcome to</Text>
      <Text style={styles.appTitle}>E-Hima Vote</Text>
      <Text style={styles.userName}>{userEmail}</Text>

      {/* Data Mahasiswa Card */}
      {loading ? (
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color="#2B5278" />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      ) : userData ? (
        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>Data Mahasiswa</Text>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Name</Text>
            <Text style={styles.dataValue}>: {userData.name}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>NIM</Text>
            <Text style={styles.dataValue}>: {userData.nim}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Study Program</Text>
            <Text style={styles.dataValue}>: {userData.studyProgram}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Batch</Text>
            <Text style={styles.dataValue}>: {userData.batch}</Text>
          </View>
        </View>
      ) : null}

      {/* Pemilihan Section */}
      <Text style={styles.pemilihanTitle}>Pemilihan Ketua</Text>
      <Text style={styles.pemilihanTitle}>Himpunan Informatika</Text>
      <Text style={styles.pemilihanSubtitle}>Pilih pemimpin terbaik yang akan memajukan Himpunan Informatika untuk periode mendatang.</Text>

      {/* Paslon 1 */}
      <Text style={styles.paslonTitle}>Paslon 1</Text>
      <View style={styles.paslonContainer}>
        <View style={styles.candidateBox}>
          <Text style={styles.candidateLabel}>Ketua</Text>
          <View style={styles.imageBox}>
            <Image 
              source={require('@/assets/images/paslon1-ketua.png')} 
              style={styles.candidateImage}
            />
          </View>
        </View>

        <View style={styles.candidateBox}>
          <Text style={styles.candidateLabel}>Wakil Ketua</Text>
          <View style={styles.imageBox}>
            <Image 
              source={require('@/assets/images/paslon1-wakil.png')} 
              style={styles.candidateImage}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.voteButton} onPress={() => handleVote(1)}>
        <Text style={styles.voteButtonText}>Pilih Paslon 1</Text>
      </TouchableOpacity>

      {/* Paslon 2 */}
      <Text style={styles.paslonTitle}>Paslon 2</Text>
      <View style={styles.paslonContainer}>
        <View style={styles.candidateBox}>
          <Text style={styles.candidateLabel}>Ketua</Text>
          <View style={styles.imageBox}>
            <Image 
              source={require('@/assets/images/paslon2-ketua.png')} 
              style={styles.candidateImage}
            />
          </View>
        </View>

        <View style={styles.candidateBox}>
          <Text style={styles.candidateLabel}>Wakil Ketua</Text>
          <View style={styles.imageBox}>
            <Image 
              source={require('@/assets/images/paslon2-wakil.png')} 
              style={styles.candidateImage}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.voteButton} onPress={() => handleVote(2)}>
        <Text style={styles.voteButtonText}>Pilih Paslon 2</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: background.light.background,
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontFamily: Fonts.Black,
    color: '#1A3A52',
    textAlign: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontFamily: Fonts.Black,
    color: '#1A3A52',
    textAlign: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontFamily: Fonts.Medium,
    color: '#2B5278',
    marginBottom: 30,
  },
  dataCard: {
    backgroundColor: '#D4E4F0',
    borderWidth: 2,
    borderColor: '#1A3A52',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  loadingCard: {
    backgroundColor: '#D4E4F0',
    borderWidth: 2,
    borderColor: '#1A3A52',
    borderRadius: 10,
    padding: 40,
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: '#1A3A52',
    marginTop: 10,
  },
  dataTitle: {
    fontSize: 18,
    fontFamily: Fonts.Bold,
    color: '#1A3A52',
    marginBottom: 15,
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dataLabel: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: '#1A3A52',
    width: 120,
  },
  dataValue: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: '#1A3A52',
    flex: 1,
  },
  pemilihanTitle: {
    fontSize: 22,
    fontFamily: Fonts.Black,
    color: '#1A3A52',
    textAlign: 'center',
    lineHeight: 28,
  },
  pemilihanSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: '#1A3A52',
    textAlign: 'center',
    lineHeight: 16,
  },
  paslonTitle: {
    fontSize: 18,
    fontFamily: Fonts.Bold,
    color: '#1A3A52',
    marginTop: 30,
    marginBottom: 15,
  },
  paslonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  candidateBox: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  candidateLabel: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: '#1A3A52',
    marginBottom: 10,
  },
  imageBox: {
    width: 140,
    height: 180,
    backgroundColor: '#E8F0F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1A3A52',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  candidateImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  voteButton: {
    backgroundColor: '#2B5278',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  voteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.Bold,
  },
  logoutButton: {
    backgroundColor: '#DC143C',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.Bold,
  },
  bottomPadding: {
    height: 40,
  },
});