import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const questions = [
  {
    question: 'Is React Native built by Facebook?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    question: 'Is Expo used for building React Native apps?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
];

export default function QuizScreen({ navigation }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const handleSelect = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      navigation.navigate('Result', { score: score + (option === questions[current].answer ? 1 : 0), total: questions.length });
    }
  };

  const q = questions[current];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <Text>{q.question}</Text>
      {q.options.map((option) => (
        <Button key={option} title={option} onPress={() => handleSelect(option)} />
      ))}
    </View>
  );
}
