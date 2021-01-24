import { NativeModules } from 'react-native';

type SmsUserConsentType = {
  multiply(a: number, b: number): Promise<number>;
};

const { SmsUserConsent } = NativeModules;

export default SmsUserConsent as SmsUserConsentType;
