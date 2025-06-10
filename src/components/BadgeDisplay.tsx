import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { t } from '../i18n';

export type Badge = {
  id: string;
  title: string;
};

type Props = {
  badges: Badge[];
};

const BadgeDisplay: React.FC<Props> = ({ badges }) => {
  if (!badges.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('badgesEarned')}</Text>
      <View style={styles.badges}>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badge}>
            <Text style={styles.badgeText}>{badge.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BadgeDisplay;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // Using margin on each badge instead of the experimental `gap` property
    // for consistent cross-platform spacing.
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: '#f6c026',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    margin: 4,
  },
  badgeText: {
    color: '#000',
    fontWeight: '700',
  },
});
