import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {
  startSmsHandling,
  stopSmsHandling,
  addSmsListener,
  addErrorListener,
} from 'react-native-sms-user-consent';

export default function App() {
  const [sms, setSms] = useState('');

  useEffect(() => {
    startSmsHandling();
    return () => {
      stopSmsHandling();
    };
  }, []);

  useEffect(() => {
    const removeSmsListener = addSmsListener((event) => {
      const receivedSms = event?.sms;
      if (!receivedSms) {
        console.warn('No SMS received!');
        return;
      }
      setSms(receivedSms);
    });
    return removeSmsListener;
  }, []);

  useEffect(() => {
    const removeErrorListener = addErrorListener((event) => {
      console.log('Sms retrieve error:', event);
    });
    return removeErrorListener;
  }, []);

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
