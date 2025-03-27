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

  async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version'
    );
    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }
    if (currentDbVersion === 0) {
      await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
  `);
      await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'hello', 1);
      await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'world', 2);
      await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'Mayron', 3);
      currentDbVersion = 1;
    }
    // if (currentDbVersion === 1) {
    //   Add more migrations
    // }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    console.log(db);
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Suspense fallback={<>Aguarde...</>}>
            <SQLiteProvider databaseName="lgpd.db" onInit={migrateDbIfNeeded}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="article/[id]"
                  options={{
                    title: 'Artigo',
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
