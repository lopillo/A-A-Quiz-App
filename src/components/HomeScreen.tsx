import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { getHighScore } from '../storage/highScore';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [highScore, setHighScoreState] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getHighScore().then(setHighScoreState);
    }, [])
  );

  return (
    <ImageBackground
      source={require('../../assets/images/icon.png')} // bright background (can be your own)
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Cartoon mascot image */}
        <Image
          source={require('../../assets/images/adaptive-icon.png')}
          style={styles.logo}
        />

        {/* Colorful header */}
        <Text style={styles.title}>📚 A&A Lern-Mathe-App</Text>
        <Text style={styles.highScore}>High Score: {highScore}</Text>

        {/* Wooden sign-like button */}
        <TouchableOpacity
          style={styles.woodButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.buttonText}>▶️ Starte dein Quiz!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0066cc',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff6600',
    marginBottom: 30,
    textAlign: 'center',
  },
  woodButton: {
    backgroundColor: '#5C4033',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderWidth: 3,
    borderColor: '#3B2F2F',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
    transform: [{ rotate: '-1deg' }],
  },
  buttonText: {
    color: '#fff9dc',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  highScore: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});
