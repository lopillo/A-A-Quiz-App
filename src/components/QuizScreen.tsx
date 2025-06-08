import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

const QuizScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Quiz Screen</Text>
      <Button title="Finish Quiz" onPress={() => navigation.navigate('Result')} />
    </View>
  );
};

export default QuizScreen;
