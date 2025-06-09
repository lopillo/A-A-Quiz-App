import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ navigation, route }: Props) {
  const { score, totalQuestions } = route.params;

  return (
    <View>
      <Text>
        Your Score: {score} / {totalQuestions}
      </Text>
      <Button title="Go back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

