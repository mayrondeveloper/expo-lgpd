// layout
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, Suspense, useState } from 'react';
import 'react-native-reanimated';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text } from 'react-native';
import { DatabaseService } from '@/database/db'

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Suspense fallback={<>Aguarde...</>}>
            <SQLiteProvider databaseName="lgpd.db" onInit={DatabaseService.initializeDatabase}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="article/[id]"
                  options={{
                    title: '',
                    presentation: 'modal'
                  }}
                />
                <Stack.Screen name="categories/[name]/index" options={{ headerShown: false }} />
              </Stack>
            </SQLiteProvider>
          </Suspense>
        </ThemeProvider>
  );
}
