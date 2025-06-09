import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { questions } from '../data/questions';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

const QuizScreen = ({ navigation }: Props) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (index: number) => {
    const isCorrect = index === questions[current].correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      navigation.navigate('Result', { score: newScore, totalQuestions: questions.length });
    }
  };

  const question = questions[current];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.text}</Text>
      {question.options.map((option, index) => (
        <Button key={index} title={option} onPress={() => handleAnswer(index)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  question: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default QuizScreen;
