import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';

import { DEFAULT_CODE_LENGTH, Events } from './constants';

/*
Technically, the SMS receiving data flow consists of two parts:

1) System -> Native
This part uses the native SMS User Consent API to show the consent prompt and retrieves the SMS.

2) Native -> JS
This part emits an event to JS side with the SMS using default React Native event emitter, so that JS side is able to subscribe to the event and receive the SMS.
*/

const {ReactNativeSmsUserConsent} = NativeModules;

const eventEmitter = new NativeEventEmitter(ReactNativeSmsUserConsent);

async function startNativeSmsListener() {
  try {
    await ReactNativeSmsUserConsent.startNativeSmsListener();
  } catch (e) {
    console.error(e);
  }
}

async function stopNativeSmsListener() {
  try {
    await ReactNativeSmsUserConsent.stopNativeSmsListener();
  } catch (e) {
    console.error(e);
  }
}

export function startSmsHandling(onSmsReceived) {
  startNativeSmsListener();
  const jsListener = eventEmitter.addListener(
    Events.AKV_SMS_RETRIEVED,
    onSmsReceived,
  );

  function stopSmsHandling() {
    stopNativeSmsListener();
    jsListener.remove();
  }

  return stopSmsHandling;
}

export function useSmsUserConsent() {
  const [sms, setSms] = useState('');

  useEffect(() => {
    const stopSmsHandling = startSmsHandling((event) => {
      const receivedSms = event?.sms;
      if (!receivedSms) {
        console.warn('No SMS received!');
        return;
      }
      setSms(receivedSms);
    });
    return stopSmsHandling;
  }, []);

  return sms;
}

export function addErrorListener(onErrorReceived) {
  const listener = eventEmitter.addListener(
    Events.SMS_RETRIEVE_ERROR,
    onErrorReceived,
  );

  function removeErrorListener() {
    listener.remove();
  }

  return removeErrorListener;
}

export function useErrorListener(onErrorReceived) {
   useEffect(() => {
    const removeErrorListener = addErrorListener(onErrorReceived);
    return removeErrorListener;
  }, []);
}

export function retrieveVerificationCode(sms, codeLength = DEFAULT_CODE_LENGTH) {
  const codeRegExp = new RegExp(`\\d{${codeLength}}`, 'm');
  const code = sms?.match(codeRegExp)?.[0];
  return code ?? null;
}
