import { NativeEventEmitter, NativeModules } from 'react-native';

const { SmsUserConsent } = NativeModules;

const eventEmitter = new NativeEventEmitter(SmsUserConsent);

export async function startSmsHandling() {
  try {
    await SmsUserConsent.startSmsHandling();
  } catch (e) {
    console.error(e);
  }
}

export async function stopSmsHandling() {
  try {
    await SmsUserConsent.stopSmsHandling();
  } catch (e) {
    console.error(e);
  }
}

export function addSmsListener(onSmsReceived: {
  (event: { sms: any }): void;
  (...args: any[]): any;
}) {
  const listener = eventEmitter.addListener('SMS_RETRIEVED', onSmsReceived);
  return () => {
    listener.remove();
  };
}

export function addErrorListener(onErrorReceived: {
  (event: any): void;
  (...args: any[]): any;
}) {
  const listener = eventEmitter.addListener(
    'SMS_RETRIEVE_ERROR',
    onErrorReceived
  );
  return () => {
    listener.remove();
  };
}
