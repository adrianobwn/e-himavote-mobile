import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isAuthenticated, isLoading, hasCompletedProfile } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    'OutrequeBlack': require('../assets/fonts/OutrequeBlack.ttf'),
    'OutrequeBold': require('../assets/fonts/OutrequeBold.ttf'),
    'OutrequeMedium': require('../assets/fonts/OutrequeMedium.ttf'),
  });

  useEffect(() => {
    if (isLoading || !fontsLoaded) return;

    const inAuthGroup = segments[0] === '(tabs)' || segments[0] === 'data-form';
    const inLoginGroup = segments[0] === 'login' || segments[0] === 'register';

    if (!isAuthenticated) {
      // User belum login
      if (inAuthGroup) {
        // Coba akses protected routes
        router.replace('/login');
      } else if (!inLoginGroup) {
        // Bukan di login/register page, redirect ke login
        router.replace('/login');
      }
    } else {
      // User sudah login
      if (!hasCompletedProfile) {
        // Belum isi form, harus ke data-form
        if (segments[0] !== 'data-form') {
          router.replace('/data-form');
        }
      } else {
        // Sudah isi form, harus ke home
        if (segments[0] === 'data-form' || inLoginGroup) {
          router.replace('/(tabs)');
        }
      }
    }

    SplashScreen.hideAsync();
  }, [isAuthenticated, isLoading, hasCompletedProfile, segments, fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="data-form" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}