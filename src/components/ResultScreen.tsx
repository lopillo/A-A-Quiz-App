import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ navigation }: Props) {

  return (
    <View>
      <Text>Result Screen</Text>
      <Button title="Go back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

