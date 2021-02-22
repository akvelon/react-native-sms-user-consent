import {NativeEventEmitter, NativeModules} from 'react-native';

import Events from './constants/Events';

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
    Events.SMS_RETRIEVED,
    onSmsReceived,
  );

  function stopSmsHandling() {
    stopNativeSmsListener();
    jsListener.remove();
  }

  return stopSmsHandling;
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
