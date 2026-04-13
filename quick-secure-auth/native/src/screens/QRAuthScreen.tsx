import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { T } from '../tokens';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

const BASE_PATTERN = [
  [1,1,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,1,0,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,0,0,1,1,1,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,0,1,0,1,1,1,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0],
  [1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0],
  [0,1,0,0,0,1,0,1,1,0,1,0,0,1,0,0,1,0,1],
  [1,0,1,1,0,0,1,0,1,1,1,0,1,1,0,1,0,1,0],
  [0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,0,0],
  [1,0,1,1,1,0,1,0,1,1,1,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,0,1,0,0,0,1,1,0,1,0,0,0,1,0],
  [1,0,1,1,1,0,1,0,1,0,0,0,1,0,0,0,0,1,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,0,1,0,0],
  [1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,0,0,1,0],
];

function generatePattern(): number[][] {
  return BASE_PATTERN.map(row =>
    row.map(cell => (Math.random() < 0.06 ? (cell === 1 ? 0 : 1) : cell))
  );
}

export function QRAuthScreen({ onComplete, onBack }: Props) {
  const [pattern, setPattern] = useState(BASE_PATTERN);
  const [timer, setTimer] = useState(30);

  const refresh = useCallback(() => {
    setPattern(generatePattern());
    setTimer(30);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          setPattern(generatePattern());
          return 30;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const cellSize = 13;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.centreArea}>
        <Text style={styles.instruction}>Scan this code with your SafetyCulture app</Text>

        <Pressable onPress={onComplete} style={styles.qrCard}>
          <View>
            {pattern.map((row, ri) => (
              <View key={ri} style={{ flexDirection: 'row' }}>
                {row.map((cell, ci) => (
                  <View
                    key={ci}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: cell ? T.textDefault : 'transparent',
                    }}
                  />
                ))}
              </View>
            ))}
          </View>
        </Pressable>

        <Text style={styles.workerText}>
          Scanning for: <Text style={styles.workerName}>Any registered worker</Text>
        </Text>

        <View style={styles.refreshRow}>
          <Text style={styles.timerText}>Refreshes in {timer}s</Text>
          <TouchableOpacity onPress={refresh} style={styles.refreshBtn}>
            <Text style={styles.refreshBtnText}>↻  Refresh now</Text>
          </TouchableOpacity>
        </View>
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
  backBtn: {
    position: 'absolute',
    top: 52,
    left: 32,
  },
  backBtnText: {
    fontSize: 15,
    color: T.accentText,
    fontFamily: 'NotoSans_400Regular',
  },
  centreArea: {
    alignItems: 'center',
  },
  instruction: {
    fontSize: 20,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    marginBottom: 24,
    textAlign: 'center',
    maxWidth: 340,
  },
  qrCard: {
    backgroundColor: T.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
    marginBottom: 20,
  },
  workerText: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
    marginBottom: 12,
  },
  workerName: {
    fontFamily: 'NotoSans_700Bold',
    color: T.textWeak,
  },
  refreshRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  timerText: {
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    color: T.textPlaceholder,
  },
  refreshBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: T.border,
    backgroundColor: T.surface,
  },
  refreshBtnText: {
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    color: T.accentText,
  },
});
