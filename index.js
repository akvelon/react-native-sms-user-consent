import { NativeEventEmitter, NativeModules } from 'react-native';

const { ReactNativeSmsUserConsent } = NativeModules;

const eventEmitter = new NativeEventEmitter(ReactNativeSmsUserConsent);

export async function startSmsHandling() {
  try {
    await ReactNativeSmsUserConsent.startSmsHandling();
  } catch (e) {
    console.error(e);
  }
}

export async function stopSmsHandling() {
  try {
    await ReactNativeSmsUserConsent.stopSmsHandling();
  } catch (e) {
    console.error(e);
  }
}

export function addSmsListener(onSmsReceived) {
  const listener = eventEmitter.addListener('SMS_RETRIEVED', onSmsReceived);
  return () => {
    listener.remove();
  };
}

export function addErrorListener(onErrorReceived) {
  const listener = eventEmitter.addListener(
    'SMS_RETRIEVE_ERROR',
    onErrorReceived
  );
  return () => {
    listener.remove();
  };
}