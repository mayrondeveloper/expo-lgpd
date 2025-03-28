import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3182ce',
        headerShown: false,
      }}>
    <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={24} color={color} />
            ),
          }}
        />
      <Tabs.Screen
        name="highlights"
        options={{
          title: 'Destaques',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="stars" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          title: 'Artigos',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="article" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Salvos',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bookmark" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
              name="chat"
              options={{
                title: 'Assistente',
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="chat" size={24} color={color} />
                ),
              }}
            />
    </Tabs>
  );
}