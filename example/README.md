# React Native SMS User Consent Example

An example application for "React Native SMS User Consent" library.

## Getting started

```shell
# Install dependencies
yarn

# Run the application
yarn android
# - or -
yarn ios
```

## Troubleshooting


- "Malloc failure" when running `yarn`

    ```
    Libzip Error: @eabdullazyanov/react-native-sms-user-consent@file:../::locator=example%40workspace%3A.: Malloc failure
    ```
  
    This happens when you already have `.yarn` cache and `node_modules` installed for the example. Yarn file crawler
    runs out of memory trying to collect a list of files.

    To fix this, remove local packages and run `yarn` again. 
  
    ```shell
    cd <path_to_library>/example
    rm -rf .yarn node_modules
    yarn
    ```
