import { DEFAULT_CODE_LENGTH } from './constants';

export default function retrieveVerificationCode(sms, config) {
  const codeRegExp = getRegExp(config);
  const code = sms?.match(codeRegExp)?.[0];
  return code ?? null;
}

function getRegExp(config) {
  if (typeof config === 'string') {
    return new RegExp(config, 'm');
  }

  const codeLength = typeof config === 'number' ? config : DEFAULT_CODE_LENGTH;
  return new RegExp(`\\d{${codeLength}}`, 'm');
}
