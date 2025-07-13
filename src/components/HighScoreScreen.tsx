import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from 'react-native-paper';
import { RootStackParamList } from '../types/navigation';
import { getHighScore } from '../storage/highScore';
import { t } from '../i18n';
import type { OperationRecordMap, BadgeLevel } from '../types/score';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  card: { marginBottom: 16 },
});

const formatBadge = (badge: BadgeLevel): string =>
  badge ? ` - ${badge.charAt(0).toUpperCase() + badge.slice(1)} Badge` : '';

type Props = NativeStackScreenProps<RootStackParamList, 'HighScore'>;

const HighScoreScreen: React.FC<Props> = ({ navigation }) => {
  const [scores, setScores] = useState<OperationRecordMap>({
    add: { score: 0, playerName: '', date: '', badge: null },
    subtract: { score: 0, playerName: '', date: '', badge: null },
    multiply: { score: 0, playerName: '', date: '', badge: null },
    divide: { score: 0, playerName: '', date: '', badge: null },
  });

  useFocusEffect(
    useCallback(() => {
      getHighScore().then(setScores);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card} elevation={2}>
        <Card.Content>
          <Text variant="titleLarge">{t('highScores')}</Text>
          <Text>
            {t('addition')}: {scores.add.score} ({scores.add.playerName} {scores.add.date}){formatBadge(scores.add.badge)}
          </Text>
          <Text>
            {t('subtraction')}: {scores.subtract.score} ({scores.subtract.playerName} {scores.subtract.date}){formatBadge(scores.subtract.badge)}
          </Text>
          <Text>
            {t('multiplication')}: {scores.multiply.score} ({scores.multiply.playerName} {scores.multiply.date}){formatBadge(scores.multiply.badge)}
          </Text>
          <Text>
            {t('division')}: {scores.divide.score} ({scores.divide.playerName} {scores.divide.date}){formatBadge(scores.divide.badge)}
          </Text>
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={() => navigation.goBack()}>
        {t('goHome')}
      </Button>
    </SafeAreaView>
  );
};

export default HighScoreScreen;
