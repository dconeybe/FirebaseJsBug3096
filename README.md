# FirebaseJsBug3096
App to reproduce https://github.com/firebase/firebase-js-sdk/issues/3096

## Instructions - Buggy Behavior

1. Clone this Git repository.
1. Open a shell in the cloned directory.
1. `npm install -g jest`
1. `npm install`
1. `jest test.js`

The test will fail with the following error and hang:

```
FIRESTORE (7.14.3) INTERNAL ASSERTION FAILED: value must be undefined or Uint8Array
```

This internal assertion is unexpected and should not be happening.

## Instructions - Expected Behavior

To see the expected behavior, do the following:

1. `git clean -dfx`
1. `rm package-lock.json`
1. `sed -i .bak 's/19.4/15.0/' package.json`
1. `npm install`
1. `jest test.js`

The test will still fail, but with an appropriate message:

```
Expected request to fail, but it succeeded.
```
