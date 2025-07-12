import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from 'react-native-paper';
import { RootStackParamList } from '../types/navigation';
import { getHighScore } from '../storage/highScore';
import { t } from '../i18n';
import type { OperationCount } from '../types/score';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  card: { marginBottom: 16 },
});

type Props = NativeStackScreenProps<RootStackParamList, 'HighScore'>;

const HighScoreScreen: React.FC<Props> = ({ navigation }) => {
  const [scores, setScores] = useState<OperationCount>({
    add: 0,
    subtract: 0,
    multiply: 0,
    divide: 0,
  });

  useEffect(() => {
    getHighScore().then(setScores);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card} elevation={2}>
        <Card.Content>
          <Text variant="titleLarge">{t('highScores')}</Text>
          <Text>{t('addition')}: {scores.add}</Text>
          <Text>{t('subtraction')}: {scores.subtract}</Text>
          <Text>{t('multiplication')}: {scores.multiply}</Text>
          <Text>{t('division')}: {scores.divide}</Text>
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={() => navigation.goBack()}>
        {t('goHome')}
      </Button>
    </SafeAreaView>
  );
};

export default HighScoreScreen;
