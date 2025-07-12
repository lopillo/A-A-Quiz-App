import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from 'react-native-paper';
import { getHighScore, setHighScore } from '../storage/highScore';
import { RootStackParamList } from '../types/navigation';
import { generateQuestions } from '../data/questions';
import type { OperationCount, Operation, OperationRecordMap } from '../types/score';
import { t, type TranslationKey } from '../i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

const QuizScreen = ({ navigation, route }: Props) => {
  const allQuestions = useMemo(() => generateQuestions(), []);
  const { playerName } = route.params;
  const selectedOp = route.params?.operation ?? 'all';
  const activeQuestions =
    selectedOp === 'all'
      ? allQuestions
      : allQuestions.filter((q) => q.operation === selectedOp);
  const QUESTIONS_PER_CYCLE = 10;
  const totalCycles = Math.ceil(activeQuestions.length / QUESTIONS_PER_CYCLE);

  const [cycle, setCycle] = useState(0);
  const [current, setCurrent] = useState(0); // question index within cycle
  const [score, setScore] = useState(0);
  const [scoreByOp, setScoreByOp] = useState<OperationCount>({
    add: 0,
    subtract: 0,
    multiply: 0,
    divide: 0,
  });
  const [totals, setTotals] = useState<OperationCount>({
    add: 0,
    subtract: 0,
    multiply: 0,
    divide: 0,
  });
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const finishQuiz = async (finalScores: OperationCount, finalTotals: OperationCount) => {
    const highScore = await getHighScore();
    const updated: OperationRecordMap = { ...highScore };
    let changed = false;
    (Object.keys(finalScores) as Operation[]).forEach((op) => {
      if (finalScores[op] > highScore[op].score) {
        updated[op] = {
          score: finalScores[op],
          playerName,
          date: new Date().toISOString(),
        };
        changed = true;
      }
    });
    if (changed) {
      await setHighScore(updated);
    }
    navigation.navigate('Result', {
      scores: finalScores,
      totals: finalTotals,
    });
  };
  const handleAnswer = async (index: number) => {
    const questionIndex = cycle * QUESTIONS_PER_CYCLE + current;
    const question = activeQuestions[questionIndex];
    const isCorrect = index === question.correctAnswer;
    const op: Operation = question.operation;

    setFeedback(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => setFeedback(null), 800);

    setTotals((prev) => ({ ...prev, [op]: prev[op] + 1 }));

    if (isCorrect) {
      setScore((s) => s + 1);
      setScoreByOp((prev) => ({ ...prev, [op]: prev[op] + 1 }));
    } else {
      setMistakes((m) => m + 1);
    }

    const next = current + 1;
    if (next < QUESTIONS_PER_CYCLE && questionIndex + 1 < activeQuestions.length) {
      setCurrent(next);
      return;
    }

    // Cycle finished
    if (mistakes + (isCorrect ? 0 : 1) > 0) {
      await finishQuiz(
        isCorrect ? { ...scoreByOp, [op]: scoreByOp[op] + 1 } : scoreByOp,
        { ...totals, [op]: totals[op] + 1 }
      );
    } else if (cycle + 1 < totalCycles) {
      // next cycle
      setCycle(cycle + 1);
      setCurrent(0);
      setMistakes(0);
    } else {
      await finishQuiz(
        isCorrect ? { ...scoreByOp, [op]: scoreByOp[op] + 1 } : scoreByOp,
        { ...totals, [op]: totals[op] + 1 }
      );
    }
  };

  const questionIndexToShow = cycle * QUESTIONS_PER_CYCLE + current;
  const question = activeQuestions[questionIndexToShow];

  return (
    <SafeAreaView style={styles.container}>
      {feedback && (
        <View
          style={[
            styles.feedbackContainer,
            feedback === 'correct' ? styles.correct : styles.wrong,
          ]}
          pointerEvents="none"
        >
          <Text style={styles.feedbackText}>{feedback === 'correct' ? '✓' : '✕'}</Text>
        </View>
      )}
      <Card style={styles.card} elevation={2}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.question}>
            {t(question.textKey as TranslationKey, { a: question.a, b: question.b })}
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
  feedbackContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 16,
    padding: 8,
  },
  feedbackText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  correct: {
    backgroundColor: '#4caf50',
  },
  wrong: {
    backgroundColor: '#f44336',
  },
});

export default QuizScreen;
