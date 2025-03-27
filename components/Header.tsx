import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { getCategoryColor } from '@/utils/categoryStyles';

const Header = ({ name }: { name: string }) => {
  const colors = getCategoryColor(name);

  return (
    <View style={[styles.header, { backgroundColor: colors.bgColor }]}>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textColor} />
        </TouchableOpacity>
      </Link>

      <View style={styles.titleContainer}>
        <MaterialIcons
          name={colors.icon}
          size={28}
          color={colors.textColor}
          style={styles.icon}
        />
        <Text style={[styles.title, { color: colors.textColor }]}>
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 50,
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  }
});

export default Header;