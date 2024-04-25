# React Native SMS User Consent

React Native wrapper for Android's SMS User Consent API, ready to use in React Native apps with minimum effort. The purpose of SMS User Consent API is to provide one-tap auto-filling of SMS verification codes.

## iOS

SMS User Consent API exists only on Android, so this package is Android-only. Calling this package's APIs on iOS is no-op.

If you want auto-filling on iOS, `textContentType="oneTimeCode"` for `TextInput` is the way to go. Basically, this is the only way for iOS.

## Getting started

Install [the package](https://www.npmjs.com/package/@eabdullazyanov/react-native-sms-user-consent):

```
yarn add @eabdullazyanov/react-native-sms-user-consent
```

or

```
npm install @eabdullazyanov/react-native-sms-user-consent
```

## Basic usage

```javascript
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';

import { useSmsUserConsent } from '@eabdullazyanov/react-native-sms-user-consent';

const Example = () => {
  const [code, setCode] = useState();

  const retrievedCode = useSmsUserConsent();

  useEffect(() => {
    if (retrievedCode) setCode(retrievedCode);
  }, [retrievedCode]);

  return <TextInput value={code} onChangeText={setCode} />;
};
```

In the example we use a controlled `TextInput` for the code entry. `retrievedCode` equals to the empty string initially, and whenever an SMS is handled `retrievedCode` receives the code from it. We use the `useEffect` to update the input value when an SMS is handled.

### Customise verification code parser

Set the length of the validation code:

```typescript
const retrievedCode = useSmsUserConsent(4);
// e.g. code = 1234
```

Provide a custom regular expression:

```typescript
const retrievedCode = useSmsUserConsent('[A-Z0-9]{5}');
// e.g. code = A12B3
```

## API

### useSmsUserConsent()

```typescript
useSmsUserConsent(config: number | string): string
```

React hook that starts SMS handling and provides the received code as its return value, which is the empty string initially. Stops handling SMS messages on unmount. Uses `startSmsHandling` and `retrieveVerificationCode` internally.

This hook is the way to go in most cases. Alternatively, you can use `startSmsHandling` and `retrieveVerificationCode` directly if dealing with something that is not a functional component or you need some more flexibility.

On iOS it just returns the empty string, so no additional code to handle iOS is needed.

Accepts an optional `config` parameter. In case if it's a number, it defines the length of the code. In case if it is a string, it defines a custom RegExp to parse the code.

### startSmsHandling()

```typescript
startSmsHandling(onSmsReceived: (event: {sms?: string}) => void): (
  stopSmsHandling(): void
)
```

Starts the native SMS listener that will show the SMS User Consent system prompt. If the user allowed reading the SMS, then the `onSmsReceived` callback is called. `onSmsReceived` receives the event object containing the SMS.

Returns `stopSmsHandling` function that stops showing the system prompt and stops SMS handling.

### retrieveVerificationCode()

```typescript
retrieveVerificationCode(sms: string, config: number | string): string | null
```

Retrieves the verification code from an SMS if there is any.

Accepts an optional `config` parameter. In case if it's a number, it defines the length of the code. In case if it is a string, it defines a custom RegExp to parse the code.

---

*You can import the whole API as one object if you prefer*

```javascript
import SmsUserConsent from 'react-native-sms-user-consent';

// ...
SmsUserConsent.useSmsUserConsent();
// ...
```

## Help

If you have any ideas about the project or found a bug or have a question, feel free to create an issue with all the relevant information. We are engaged to response ASAP. The following info will make it faster to resolve issues:

1. Device or emulator model
2. Android version
3. Your environment info - output of the `npx react-native info` command

## Contribution

PRs are always welcome. If you're feeling like contributing to the project, please do. It would be great to have all the relevant information with the PR.

To make changes, you'll need to follow these steps:

1. clone the repo
2. make changes
3. test the changes
4. create a PR
5. 🥳
