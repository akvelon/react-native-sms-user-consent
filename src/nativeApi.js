import { NativeEventEmitter, NativeModules } from 'react-native';

export const { ReactNativeSmsUserConsent } = NativeModules;

export const eventEmitter = new NativeEventEmitter(ReactNativeSmsUserConsent);
