import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, IconButton, Text } from 'react-native-paper';
import { RootStackParamList } from '../types/navigation';
import { t } from '../i18n';
import { useLanguage } from '../i18n/LanguageContext';

export type SecondaryProps = NativeStackScreenProps<RootStackParamList, 'Secondary'>;

const SecondaryScreen: React.FC<SecondaryProps> = ({ navigation }) => {
  useLanguage();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge">{t('selectOperation')}</Text>
        <IconButton
          icon="trophy"
          onPress={() => navigation.navigate('HighScore' as never)}
          accessibilityLabel={t('highScores')}
        />
      </View>
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Quiz', { operation: 'add' })}>
        {t('addition')}
      </Button>
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Quiz', { operation: 'subtract' })}>
        {t('subtraction')}
      </Button>
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Quiz', { operation: 'multiply' })}>
        {t('multiplication')}
      </Button>
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Quiz', { operation: 'divide' })}>
        {t('division')}
      </Button>
    </SafeAreaView>
  );
};

export default SecondaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    marginVertical: 4,
  },
});
