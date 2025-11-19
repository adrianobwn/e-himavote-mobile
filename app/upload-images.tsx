import { background, Fonts } from '@/constants/theme';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function UploadImagesScreen() {
  const router = useRouter();

  // Paslon images state
  const [paslon1Ketua, setPaslon1Ketua] = useState<string | null>(null);
  const [paslon1Wakil, setPaslon1Wakil] = useState<string | null>(null);
  const [paslon2Ketua, setPaslon2Ketua] = useState<string | null>(null);
  const [paslon2Wakil, setPaslon2Wakil] = useState<string | null>(null);

  const pickImage = async (setter: (value: string | null) => void) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!paslon1Ketua || !paslon1Wakil || !paslon2Ketua || !paslon2Wakil) {
      Alert.alert('Error', 'Please upload all candidate images');
      return;
    }

    // TODO: Save images to Firebase Storage or your backend
    Alert.alert('Success', 'Images uploaded successfully!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload Candidate Images</Text>
      <Text style={styles.subtitle}>Upload photos for all candidates</Text>

      {/* Paslon 1 */}
      <Text style={styles.paslonTitle}>Paslon 1</Text>
      <View style={styles.paslonContainer}>
        <View style={styles.candidateBox}>
          <Text style={styles.candidateLabel}>Ketua</Text>
          <TouchableOpacity 
            style={styles.imageBox}
            onPress={() => pickImage(setPaslon1Ketua)}
          >
            {paslon1Ketua ? (
              <Image source={{ uri: paslon1Ketua }} style={styles.candidateImage} />
            ) : (
              <Text style={styles.uploadText}>Tap to upload</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.candidateBox}>
          <Text style={styles.candidateLabel}>Wakil Ketua</Text>
          <TouchableOpacity 
            style={styles.imageBox}
            onPress={() => pickImage(setPaslon1Wakil)}
          >
            {paslon1Wakil ? (
              <Image source={{ uri: paslon1Wakil }} style={styles.candidateImage} />
            ) : (
              <Text style={styles.uploadText}>Tap to upload</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Paslon 2 */}
      <Text style={styles.paslonTitle}>Paslon 2</Text>
      <View style={styles.paslonContainer}>
        <View style={styles.candidateBox}>
          <Text style={styles.candidateLabel}>Ketua</Text>
          <TouchableOpacity 
            style={styles.imageBox}
            onPress={() => pickImage(setPaslon2Ketua)}
          >
            {paslon2Ketua ? (
              <Image source={{ uri: paslon2Ketua }} style={styles.candidateImage} />
            ) : (
              <Text style={styles.uploadText}>Tap to upload</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.candidateBox}>
          <Text style={styles.candidateLabel}>Wakil Ketua</Text>
          <TouchableOpacity 
            style={styles.imageBox}
            onPress={() => pickImage(setPaslon2Wakil)}
          >
            {paslon2Wakil ? (
              <Image source={{ uri: paslon2Wakil }} style={styles.candidateImage} />
            ) : (
              <Text style={styles.uploadText}>Tap to upload</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Images</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: background.light.background,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.Black,
    color: '#1A3A52',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
    color: '#1A3A52',
    textAlign: 'center',
    marginBottom: 40,
  },
  paslonTitle: {
    fontSize: 20,
    fontFamily: Fonts.Bold,
    color: '#1A3A52',
    marginTop: 20,
    marginBottom: 15,
  },
  paslonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
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
  uploadText: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: '#1A3A52',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#2B5278',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Fonts.Bold,
  },
  cancelButton: {
    backgroundColor: '#E8F0F7',
    borderWidth: 1,
    borderColor: '#1A3A52',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  cancelButtonText: {
    color: '#1A3A52',
    fontSize: 18,
    fontFamily: Fonts.Bold,
  },
  bottomPadding: {
    height: 40,
  },
});
