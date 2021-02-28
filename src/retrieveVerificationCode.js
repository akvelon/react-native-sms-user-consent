import { DEFAULT_CODE_LENGTH } from './constants';

export default function retrieveVerificationCode(sms, codeLength = DEFAULT_CODE_LENGTH) {
  const codeRegExp = new RegExp(`\\d{${codeLength}}`, 'm');
  const code = sms?.match(codeRegExp)?.[0];
  return code ?? null;
}
