import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from 'react-native-paper';
import { getHighScore, setHighScore } from '../storage/highScore';
import { RootStackParamList } from '../types/navigation';
import { questions } from '../data/questions';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

const QuizScreen = ({ navigation }: Props) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<number[]>([]);
  const [reviewQueue, setReviewQueue] = useState<number[]>([]);
  const [correctedQuestions, setCorrectedQuestions] = useState<number[]>([]);
  const [reviewMode, setReviewMode] = useState(false);

  const finishQuiz = async (finalScore: number) => {
    const highScore = await getHighScore();
    if (finalScore > highScore) {
      await setHighScore(finalScore);
    }
    navigation.navigate('Result', {
      score: finalScore,
      totalQuestions: questions.length,
    });
  };

  const showSummaryAndFinish = async (finalScore: number, corrected: number[]) => {
    const summaryText = corrected
      .map((i) => `- ${questions[i].text}`)
      .join('\n');
    await new Promise<void>((resolve) => {
      Alert.alert('Corrected Questions', summaryText || 'None', [
        {
          text: 'Continue',
          onPress: () => resolve(),
        },
      ]);
    });
    finishQuiz(finalScore);
  };

  const handleAnswer = async (index: number) => {
    const questionIndex = reviewMode ? reviewQueue[current] : current;
    const isCorrect = index === questions[questionIndex].correctAnswer;

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);

      if (reviewMode) {
        const newQueue = [...reviewQueue];
        newQueue.splice(current, 1);
        setReviewQueue(newQueue);
        setCorrectedQuestions((prev) => [...prev, questionIndex]);

        if (newQueue.length === 0) {
          await showSummaryAndFinish(newScore, [...correctedQuestions, questionIndex]);
          return;
        } else if (current >= newQueue.length) {
          setCurrent(0);
        }
      } else {
        const next = current + 1;
        if (next < questions.length) {
          setCurrent(next);
        } else if (wrongQuestions.length > 0) {
          setReviewMode(true);
          setReviewQueue(wrongQuestions);
          setCurrent(0);
        } else {
          await finishQuiz(newScore);
        }
      }
    } else {
      if (reviewMode) {
        const q = reviewQueue[current];
        const newQueue = [...reviewQueue.slice(0, current), ...reviewQueue.slice(current + 1), q];
        setReviewQueue(newQueue);
        if (current >= newQueue.length) {
          setCurrent(0);
        }
      } else {
        const next = current + 1;
        const newWrong = [...wrongQuestions, questionIndex];
        setWrongQuestions(newWrong);

        if (next < questions.length) {
          setCurrent(next);
        } else {
          setReviewMode(true);
          setReviewQueue(newWrong);
          setCurrent(0);
        }
      }
    }
  };

  const questionIndexToShow = reviewMode ? reviewQueue[current] : current;
  const question = questions[questionIndexToShow];

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card} elevation={2}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.question}>
            {question.text}
          </Text>
        </Card.Content>
      </Card>
      {question.options.map((option, index) => (
        <Button
          key={index}
          mode="contained"
          style={styles.option}
          onPress={() => handleAnswer(index)}
        >
          {option}
        </Button>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  question: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  option: {
    marginVertical: 4,
  },
});

export default QuizScreen;
