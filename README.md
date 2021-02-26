## React Native SMS User Consent

React Native wrapper for Android's SMS User Consent API, ready to use in React Native components with minimum effort.

## Getting started

Will be available after uploading to NPM.

## Basic usage

```javascript
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';

import { useSmsUserConsent, retrieveVerificationCode } from 'react-native-sms-user-consent';

const Example = () => {
  const [code, setCode] = useState();

  const sms = useSmsUserConsent();

  useEffect(() => {
    const retrievedCode = retrieveVerificationCode(sms);
    if (retrievedCode) {
      setCode(retrievedCode);
    }
  }, [sms]);

  return <TextInput value={code} onChangeText={setCode} />;
}

```

In the example we use a controlled `TextInput` for the code entry. `sms` equals to the empty string initially, and whenever an SMS is handled `sms` receives its content. We use the `useEffect` to update the value when an SMS is handled. Inside the effect we use the `retrieveVerificationCode` method to retrieve the code from the SMS and update the input value with it.

## API

### useSmsUserConsent()

```typescript
useSmsUserConsent(): string
```

React hook that starts SMS handling and provides the handled SMS as its return value, which is the empty string initially. Stops handling SMS messages on unmount. Uses `startSmsHandling` internally.

This hook is the way to go in most cases. Alternatively, you could use `startSmsHandling` if dealing with something that is not a functional component or you need some more flexibility.

### startSmsHandling()

```typescript
type Event = {
  sms?: string;
}

startSmsHandling(onSmsReceived: (event: {sms?: string}) => void): (
  stopSmsHandling(): void
)
```

Starts the native SMS listener that will show the SMS User Consent system prompt. If the user has allowed reading the SMS, then the `onSmsReceived` callback is called. `onSmsReceived` receives the event object containing the SMS.

Returns `stopSmsHandling` function that stops showing the system prompt and stops SMS handling.

### retrieveVerificationCode()

```typescript
retrieveVerificationCode(sms: string, codeLength: number = 6): string | null
```

Retrieves the verification code from an SMS if there is any.

## Help

If you have any ideas about the project or found a bug or have a question, feel free to create an issue with all the relevant information. We are engaged to response ASAP.

## Contribution

PRs are always welcome. If you're feeling like contributing to the project, please do. It would be great to have all the relevant information with the PR.

To make changes, you'll need to follow these steps:
1) clone the repo
2) go to `/example` folder
3) run `yarn` and `npx react-native run-android` to build and view the example project
4) make changes
5) repeat steps 3 and 4 until the desired result is achieved
6) create a PR
7) 🥳
