import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Surface, Text } from 'react-native-paper';
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
      <SafeAreaView style={styles.safeArea}>
        <Surface style={styles.overlay} elevation={4}>
          {/* Cartoon mascot image */}
          <Image
            source={require('../../assets/images/adaptive-icon.png')}
            style={styles.logo}
          />

          {/* Colorful header */}
          <Text variant="headlineMedium" style={styles.title}>
            📚 A&A Lern-Mathe-App
          </Text>
          <Text style={styles.highScore}>High Score: {highScore}</Text>

          {/* Start button */}
          <Button mode="contained" onPress={() => navigation.navigate('Quiz')}>
            Starte dein Quiz!
          </Button>
        </Surface>
      </SafeAreaView>
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
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
  highScore: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});
