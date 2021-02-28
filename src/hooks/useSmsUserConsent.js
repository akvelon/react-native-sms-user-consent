import { useEffect, useState } from 'react';

import { DEFAULT_CODE_LENGTH } from '../constants';
import startSmsHandling from '../startSmsHandling';
import retrieveVerificationCode from '../retrieveVerificationCode';

export default function useSmsUserConsent(codeLength = DEFAULT_CODE_LENGTH) {
  const [code, setCode] = useState('');

  useEffect(() => {
    const stopSmsHandling = startSmsHandling((event) => {
      const receivedSms = event?.sms;
      if (!receivedSms) {
        console.warn('No SMS received!');
        return;
      }

      const retrievedCode = retrieveVerificationCode(receivedSms, codeLength);
      if (!retrievedCode) {
        console.warn('No code retrieved!');
        return;
      }

      setCode(retrievedCode);
    });
    return stopSmsHandling;
  }, [codeLength]);

  return code;
}
