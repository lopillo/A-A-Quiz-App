import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import BadgeDisplay, { Badge } from './BadgeDisplay';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ navigation, route }: Props) {
  const { score, totalQuestions } = route.params;

  const getEarnedBadges = (): Badge[] => {
    const percentage = score / totalQuestions;

    if (percentage === 1) {
      return [{ id: 'gold', title: 'Gold Badge' }];
    }
    if (percentage >= 0.8) {
      return [{ id: 'silver', title: 'Silver Badge' }];
    }
    if (percentage >= 0.5) {
      return [{ id: 'bronze', title: 'Bronze Badge' }];
    }
    return [];
  };

  const badges = getEarnedBadges();

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card} elevation={2}>
        <Card.Content>
          <Text variant="titleMedium">
            Your Score: {score} / {totalQuestions}
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

