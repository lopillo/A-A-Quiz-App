import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import BadgeDisplay, { Badge } from './BadgeDisplay';
import { RootStackParamList } from '../types/navigation';
import type { Operation, OperationCount } from '../types/score';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ navigation, route }: Props) {
  const { scores, totals } = route.params;

  const operationNames: Record<Operation, string> = {
    add: 'Addition',
    subtract: 'Subtraction',
    multiply: 'Multiplication',
    divide: 'Division',
  };

  const getEarnedBadges = (): Badge[] => {
    const badges: Badge[] = [];
    (Object.keys(scores) as Operation[]).forEach((op) => {
      const total = totals[op];
      if (!total) {
        return;
      }
      const percentage = scores[op] / total;
      let level: 'Gold' | 'Silver' | 'Bronze' | null = null;
      if (percentage === 1) {
        level = 'Gold';
      } else if (percentage >= 0.8) {
        level = 'Silver';
      } else if (percentage >= 0.5) {
        level = 'Bronze';
      }
      if (level) {
        badges.push({
          id: `${op}-${level.toLowerCase()}`,
          title: `${level} Badge (${operationNames[op]})`,
        });
      }
    });
    return badges;
  };

  const badges = getEarnedBadges();

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card} elevation={2}>
        <Card.Content>
          <Text variant="titleMedium">
            Your Score: {Object.values(scores).reduce((a, b) => a + b, 0)} /{' '}
            {Object.values(totals).reduce((a, b) => a + b, 0)}
          </Text>
          <BadgeDisplay badges={badges} />
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={() => navigation.navigate('Home')}>
        Go back to Home
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});

