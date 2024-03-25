/**
 * Retrieves the verification code from an SMS if there is any.
 *
 * @param sms Contents of the SMS to parse.
 * @param codeLength A length of the code in SMS. Defaults to 6 if not provided.
 */
declare function retrieveVerificationCode(sms: string, codeLength?: number): string | null;

/**
 * Starts the native SMS listener that will show the SMS User Consent system prompt. If the user allowed reading the
 * SMS, then the onSmsReceived callback is called. onSmsReceived receives the event object containing the SMS.
 *
 * Returns stopSmsHandling function that stops showing the system prompt and stops SMS handling.
 *
 * @param onSmsReceived A callback invoked when user allowed to read a received SMS.
 */
declare function startSmsHandling(onSmsReceived: (event?: StartSmsHandlingEvent) => void): () => void;

/**
 * React hook that starts SMS handling and provides the received code as its return value, which is the empty string
 * initially. Stops handling SMS messages on unmount. Uses startSmsHandling and retrieveVerificationCode internally.
 *
 * This hook is the way to go in most cases. Alternatively, you can use startSmsHandling and retrieveVerificationCode
 * directly if dealing with something that is not a functional component or you need some more flexibility.
 *
 * On iOS it just returns the empty string, so no additional code to handle iOS is needed.
 *
 * @param codeLength A length of the code in SMS. Defaults to 6 if not provided.
 */
declare function useSmsUserConsent(codeLength?: number): string;

declare function addErrorListener(onErrorReceived: ErrorListener): () => void;

declare function useErrorListener(onErrorReceived: ErrorListener): void;

declare interface StartSmsHandlingEvent {
    sms?: string;
}

declare type ErrorListener = (error?: ErrorPayload) => void;

declare type ErrorPayload =
    { NULL_ACTIVITY: string }
    | { NULL_BROADCAST_RECEIVER: string }
    | { COULD_NOT_HANDLE_BROADCAST: string }
    | { CONSENT_TIMEOUT: string }
    | { CONSENT_CANCELED: string }

export {
    retrieveVerificationCode,
    startSmsHandling,
    useSmsUserConsent,
    addErrorListener,
    useErrorListener,
}

export type {
    StartSmsHandlingEvent,
    ErrorListener,
    ErrorPayload,
}
