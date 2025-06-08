import React from 'react';
import { View, Text, Button } from 'react-native';

export default function QuizScreen({ navigation }) {
  return (
    <View>
      <Text>What is 2 + 2?</Text>
      <Button title="Show Result" onPress={() => navigation.navigate('Result')} />
    </View>
  );
}
