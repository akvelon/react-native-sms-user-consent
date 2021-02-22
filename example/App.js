import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {useSmsUserConsent} from 'react-native-sms-user-consent';

export default function App() {
  const sms = useSmsUserConsent();

  return (
    <View style={styles.container}>
      <Text>SMS text: {sms}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
