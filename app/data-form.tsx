import { background, Fonts } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { saveUserData as saveUserDataFirebase } from '@/services/firestoreService';
import { saveUserData as saveUserDataLocal } from '@/utils/storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function DataFormScreen() {
  const router = useRouter();
  const { completeProfile, userId } = useAuth();
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [studyProgram, setStudyProgram] = useState('');
  const [batch, setBatch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !nim || !studyProgram || !batch) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate NIM is a number
    if (isNaN(Number(nim))) {
      Alert.alert('Error', 'NIM must be a number');
      return;
    }

    // Validate Batch is a number
    if (isNaN(Number(batch))) {
      Alert.alert('Error', 'Batch must be a number');
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        name,
        nim,
        studyProgram,
        batch,
      };

      // Save to AsyncStorage (local)
      await saveUserDataLocal(userData);
      
      // Save to Firebase if userId is available
      if (userId) {
        await saveUserDataFirebase(userId, {
          name,
          nim: parseInt(nim),
          studyProgram,
          batch: parseInt(batch),
        });
      }
      
      // Mark profile as completed
      await completeProfile();
      
      Alert.alert(
        'Success',
        'Personal data saved successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Hima Vote</Text>
      <Text style={styles.subtitle}>Complete your personal data</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#1A3A52"
          value={name}
          onChangeText={setName}
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="NIM"
          placeholderTextColor="#1A3A52"
          value={nim}
          onChangeText={setNim}
          keyboardType="numeric"
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="Study Program"
          placeholderTextColor="#1A3A52"
          value={studyProgram}
          onChangeText={setStudyProgram}
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="Batch"
          placeholderTextColor="#1A3A52"
          value={batch}
          onChangeText={setBatch}
          keyboardType="numeric"
          editable={!isLoading}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Sign up</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.Black,
    color: '#1A3A52',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: Fonts.Medium,
    color: '#1A3A52',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: '#D4E4F0',
    borderWidth: 1,
    borderColor: '#1A3A52',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: Fonts.Medium,
    color: '#1A3A52',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2B5278',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Fonts.Bold,
  },
});