import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
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
    <View>
      <Text>
        Your Score: {score} / {totalQuestions}
      </Text>
      <BadgeDisplay badges={badges} />
      <Button title="Go back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

