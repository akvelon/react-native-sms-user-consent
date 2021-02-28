import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { useSmsUserConsent } from 'react-native-sms-user-consent';
import styles from './styles';

export default function App() {
  const [code, setCode] = useState();

  const receivedCode = useSmsUserConsent();

  useEffect(() => {
    if (receivedCode) setCode(receivedCode);
  }, [receivedCode]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native SMS User Consent</Text>
      <Text>Please, enter your verification code:</Text>
      <TextInput value={code} onChangeText={setCode} style={styles.input} />
    </View>
  );
}
