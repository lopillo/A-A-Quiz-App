import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
      <Text style={styles.heading}>Badges Earned:</Text>
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
    gap: 8,
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: '#f6c026',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#000',
    fontWeight: '700',
  },
});
