/**
 * A configuration for the verification code parser.
 * Can accept either a length of a digit-only code, or a string with custom RegExp pattern.
 */
type VerificationCodeConfig = number | string;

/**
 * Retrieves the verification code from an SMS if there is any.
 *
 * @param sms Contents of the SMS to parse.
 * @param config A configuration for a verification code parser. Defaults to a 6-digit code if not provided.
 */
declare function retrieveVerificationCode(
  sms: string,
  config?: VerificationCodeConfig,
): string | null;

/**
 * Starts the native SMS listener that will show the SMS User Consent system prompt. If the user allowed reading the
 * SMS, then the onSmsReceived callback is called. onSmsReceived receives the event object containing the SMS.
 *
 * Returns stopSmsHandling function that stops showing the system prompt and stops SMS handling.
 *
 * @param onSmsReceived A callback invoked when user allowed to read a received SMS.
 */
declare function startSmsHandling(
  onSmsReceived: (event?: StartSmsHandlingEvent) => void,
): () => void;

/**
 * React hook that starts SMS handling and provides the received code as its return value, which is the empty string
 * initially. Stops handling SMS messages on unmount. Uses startSmsHandling and retrieveVerificationCode internally.
 *
 * This hook is the way to go in most cases. Alternatively, you can use startSmsHandling and retrieveVerificationCode
 * directly if dealing with something that is not a functional component or you need some more flexibility.
 *
 * On iOS it just returns the empty string, so no additional code to handle iOS is needed.
 *
 * @param config A configuration for a verification code parser.  Defaults to a 6-digit code if not provided.
 */
declare function useSmsUserConsent(config?: VerificationCodeConfig): string;

declare function addErrorListener(onErrorReceived: ErrorListener): () => void;

declare function useErrorListener(onErrorReceived: ErrorListener): void;

declare interface StartSmsHandlingEvent {
  sms?: string;
}

declare type ErrorListener = (error?: ErrorPayload) => void;

declare type ErrorPayload =
  | { NULL_ACTIVITY: string }
  | { NULL_BROADCAST_RECEIVER: string }
  | { COULD_NOT_HANDLE_BROADCAST: string }
  | { CONSENT_TIMEOUT: string }
  | { CONSENT_CANCELED: string };

export {
  retrieveVerificationCode,
  startSmsHandling,
  useSmsUserConsent,
  addErrorListener,
  useErrorListener,
};

export type { StartSmsHandlingEvent, ErrorListener, ErrorPayload };
