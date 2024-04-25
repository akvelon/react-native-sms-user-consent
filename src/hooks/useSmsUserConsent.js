import { useEffect, useState } from 'react';

import startSmsHandling from '../startSmsHandling';
import retrieveVerificationCode from '../retrieveVerificationCode';

export default function useSmsUserConsent(config) {
  const [code, setCode] = useState('');

  useEffect(() => {
    const stopSmsHandling = startSmsHandling((event) => {
      const receivedSms = event?.sms;
      if (!receivedSms) {
        console.warn('No SMS received!');
        return;
      }

      const retrievedCode = retrieveVerificationCode(receivedSms, config);
      if (!retrievedCode) {
        console.warn('No code retrieved!');
        return;
      }

      setCode(retrievedCode);
    });
    return stopSmsHandling;
  }, [config]);

  return code;
}
