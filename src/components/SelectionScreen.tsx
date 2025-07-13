import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';
import { t } from '../i18n';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { textAlign: 'center', marginBottom: 16 },
  button: { marginTop: 8 },
});

type Props = NativeStackScreenProps<RootStackParamList, 'Selection'>;

const SelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { playerName, score } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {t('selectOperation')}
      </Text>
      {typeof score === 'number' && (
        <Text variant="titleMedium" style={styles.title}>
          {t('currentScore', { score, total: 10 })}
        </Text>
      )}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Quiz', { operation: 'add', playerName })}
      >
        {t('addition')}
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Quiz', { operation: 'subtract', playerName })}
      >
        {t('subtraction')}
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Quiz', { operation: 'multiply', playerName })}
      >
        {t('multiplication')}
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Quiz', { operation: 'divide', playerName })}
      >
        {t('division')}
      </Button>
      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.navigate('HighScore')}
        icon={({ size, color }) => (
          <MaterialCommunityIcons name="trophy" size={size} color={color} />
        )}
      >
        {t('viewRecords')}
      </Button>
      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.navigate('MedalBoard')}
        icon={({ size, color }) => (
          <MaterialCommunityIcons name="medal" size={size} color={color} />
        )}
      >
        {t('viewMedals')}
      </Button>
    </SafeAreaView>
  );
};

export default SelectionScreen;
