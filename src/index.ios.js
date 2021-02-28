const noop = () => {};

export const retrieveVerificationCode = noop;
export const startSmsHandling = noop;
export const useSmsUserConsent = () => '';
export const addErrorListener = noop;
export const useErrorListener = noop;

export default {
  retrieveVerificationCode,
  startSmsHandling,
  useSmsUserConsent,
  addErrorListener,
  useErrorListener,
};
