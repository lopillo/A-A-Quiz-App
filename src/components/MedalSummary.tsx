import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { t } from '../i18n';
import { getMedalCounts } from '../storage/medalBoard';
import type { MedalCounts } from '../types/score';

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 4 },
  total: { textAlign: 'center', marginTop: 4 },
});

const MedalSummary: React.FC = () => {
  const [counts, setCounts] = useState<MedalCounts>({
    gold: 0,
    silver: 0,
    bronze: 0,
    none: 40,
  });

  useFocusEffect(
    useCallback(() => {
      getMedalCounts().then(setCounts);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">{t('medalSummary')}</Text>
      <View style={styles.row}>
        <Text>{t('goldCount', { count: counts.gold })}</Text>
        <Text>{t('silverCount', { count: counts.silver })}</Text>
        <Text>{t('bronzeCount', { count: counts.bronze })}</Text>
        <Text>{t('noBadgeCount', { count: counts.none })}</Text>
      </View>
      <Text style={styles.total}>40 {t('total')}</Text>
    </View>
  );
};

export default MedalSummary;
