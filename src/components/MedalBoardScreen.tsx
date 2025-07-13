import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { getMedalBoard } from '../storage/medalBoard';
import type { MedalBoardMap, BadgeLevel } from '../types/score';
import { t } from '../i18n';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  card: { marginBottom: 16 },
});

const formatBadge = (badge: BadgeLevel): string =>
  badge ? ` - ${badge.charAt(0).toUpperCase() + badge.slice(1)} Medal` : '';

type Props = NativeStackScreenProps<RootStackParamList, 'MedalBoard'>;

const MedalBoardScreen: React.FC<Props> = ({ navigation }) => {
  const [board, setBoard] = useState<MedalBoardMap>({
    add: [],
    subtract: [],
    multiply: [],
    divide: [],
  });

  useFocusEffect(
    useCallback(() => {
      getMedalBoard().then(setBoard);
    }, [])
  );

  const renderList = (op: keyof MedalBoardMap, title: string) => (
    <>
      <Text variant="titleMedium">{title}</Text>
      {board[op].length === 0 && <Text>{t('none')}</Text>}
      {board[op].map((rec, idx) => (
        <Text key={idx}>
          {idx === 0 ? t('gold') : idx === 1 ? t('silver') : t('bronze')}: {rec.score} ({rec.playerName} {rec.date}){formatBadge(rec.badge)}
        </Text>
      ))}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card} elevation={2}>
        <Card.Content>
          <Text variant="titleLarge">{t('medalBoardTitle')}</Text>
          {renderList('add', t('addition'))}
          {renderList('subtract', t('subtraction'))}
          {renderList('multiply', t('multiplication'))}
          {renderList('divide', t('division'))}
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={() => navigation.goBack()}>
        {t('goHome')}
      </Button>
    </SafeAreaView>
  );
};

export default MedalBoardScreen;
