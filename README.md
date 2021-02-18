# React Native SMS User Consent

React Native wrapper for Android's SMS User Consent API, ready to use in React Native components with minimum effort.

## Getting started

Will be available after uploading to NPM.

## Basic usage

First of all, we should start the SMS receive process with `startSmsHandling` so that native part knows that it should handle SMS-messages and show the consent system modal to the user when the SMS is received. In order to stop handling SMS-messages we call `stopSmsHandling`. The common case to use it is when the Two-factor auth component is unmounted.

Also, we should call `addSmsListener` with a callback in order to receive the actual SMS and use it in our app. `addSmsListener` method returns the `removeSmsListener` method that should be called whenever we want to stop receiving SMS-messages in our component.

```javascript
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { startSmsHandling, stopSmsHandling, addSmsListener } from 'react-native-sms-user-consent';

function MyComponent() {
  const [sms, setSms] = useState('');

  useEffect(() => {
    startSmsHandling();
    return () => {
      stopSmsHandling();
    };
  }, []);

  useEffect(() => {
    const removeSmsListener = addSmsListener((event) => {
      const receivedSms = event?.sms;
      if (!receivedSms) {
        console.warn('No SMS received!');
        return;
      }
      setSms(receivedSms);
    });
    return removeSmsListener;
  }, []);

  return <Text>SMS text: {sms}</Text>;
}
```

## API

The package provides the following methods:

### startSmsHandling

```typescript
startSmsHandling(): void
```

Starts handling SMS messages from the native part; shows the system SMS consent modal when the message containing the one-time code is received.

### stopSmsHandling

```typescript
stopSmsHandling(): void
```

Stops handling SMS messages from the native part and showing the system SMS consent modal to the user.

### addSmsListener

```typescript
addSmsListener(
  onSmsReceived: (?event: { ?sms: string }) => Function
): void
```

Starts handling SMS messages on the JS part, receives a callback that handles the actual SMS message and uses it in the app. Returns `removeSmsListener` method that stops receiving messages.

## Help

If you have any ideas about the project or found a bug or have a question, feel free to create an issue with all the relevant information. We are engaged to response ASAP.

## Contribution

PRs are always welcome. If you're feeling like contributing to the project, please do. It woudld be great to have all the relevant information with the PR.

To make changes, you'll need to follow these steps:
1) clone the repo
2) go to `/example` folder
3) run `yarn` and `npx react-native run-android` to build and view the example project
4) make changes
5) repeat steps 3 and 4 until the desired result is achieved
6) create a PR
7) 🥳
