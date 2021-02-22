import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { useSmsUserConsent, retrieveVerificationCode } from 'react-native-sms-user-consent';
import styles from './styles';

export default function App() {
  const [code, setCode] = useState();

  const sms = useSmsUserConsent();

  useEffect(() => {
    const retrievedCode = retrieveVerificationCode(sms);
    if (retrievedCode) {
      setCode(retrievedCode);
    }
  }, [sms]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native SMS User Consent</Text>
      <Text>Please, enter your verification code:</Text>
      <TextInput value={code} onChangeText={setCode} style={styles.input} />
    </View>
  );
}
