import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from 'react-native-paper';
import { RootStackParamList } from '../types/navigation';
import { updateHighScoreIfNeeded } from '../storage/highScore';
import type { MathQuestion } from '../data/questions';
import { t, type TranslationKey } from '../i18n';
import { useLanguage } from '../i18n/LanguageContext';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  card: { marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  question: { flex: 1 },
  result: { fontSize: 20, marginLeft: 8 },
  correct: { color: '#4caf50' },
  wrong: { color: '#f44336' },
  score: { textAlign: 'center', marginBottom: 8 },
  button: { marginTop: 8 },
});

type Props = NativeStackScreenProps<RootStackParamList, 'RoundSummary'>;

const RoundSummaryScreen: React.FC<Props> = ({ navigation, route }) => {
  const { questions, results, allCorrect, playerName, score, totals, scores } =
    route.params;
  useLanguage();

  const [showAnimation, setShowAnimation] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderRow = (q: MathQuestion, idx: number) => (
    <View key={idx} style={styles.row}>
      <Text style={styles.question}>
        {t(q.textKey as TranslationKey, { a: q.a, b: q.b })}
      </Text>
      <Text
        style={[
          styles.result,
          results[idx] ? styles.correct : styles.wrong,
        ]}
      >
        {results[idx] ? '✔' : '✘'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {showAnimation && (
        <LottieView
          source={
            allCorrect
              ? require('../../assets/lottie/success.json')
              : require('../../assets/lottie/failure.json')
          }
          autoPlay
          loop={false}
          style={{ width: 200, height: 200, alignSelf: 'center' }}
        />
      )}
      <Card style={styles.card} elevation={2}>
        <Card.Content>
          <Text variant="titleLarge">{t('roundSummary')}</Text>
          {questions.map(renderRow)}
        </Card.Content>
      </Card>
      <Text variant="titleMedium" style={styles.score}>
        {t('roundScore', { score, total: questions.length })}
      </Text>
      {allCorrect ? (
        <>
          <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
            {t('continue')}
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Home')}
            style={styles.button}
          >
            {t('goHome')}
          </Button>
        </>
      ) : (
        <Button
          mode="contained"
          onPress={async () => {
            if (totals && scores) {
              await updateHighScoreIfNeeded(scores, totals, playerName);
            }
            navigation.replace('Selection', { playerName, score });
          }}
        >
          {t('backToSelection')}
        </Button>
      )}
    </SafeAreaView>
  );
};

export default RoundSummaryScreen;
