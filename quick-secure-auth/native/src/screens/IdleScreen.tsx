import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { T } from '../tokens';
import { WorkersIllustration } from './WorkersIllustration';

interface Props {
  onLogin: () => void;
}

const CONTENT_WIDTH = 560;

export function IdleScreen({ onLogin }: Props) {
  const { width } = useWindowDimensions();
  const hPad = Math.max(24, (width - CONTENT_WIDTH) / 2);
  const illustrationSize = Math.min(324, Math.round((width - hPad * 2) * 0.578));

  return (
    <View style={[styles.container, { paddingHorizontal: hPad }]}>
      <View style={styles.card}>
        <View style={styles.titleImage}>
          <Text style={styles.headline}>
            {'Create checklists.\nConduct inspections\nGenerate and share reports.'}
          </Text>
          <WorkersIllustration size={illustrationSize} />
        </View>
        <TouchableOpacity style={styles.button} onPress={onLogin} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    alignItems: 'center',
    gap: 229,
  },
  titleImage: {
    alignItems: 'center',
    gap: 64,
    width: '100%',
  },
  headline: {
    fontSize: 34,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -1,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: T.accent,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
});
