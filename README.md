# FirebaseJsBug3096
App to reproduce https://github.com/firebase/firebase-js-sdk/issues/3096

## Instructions - Buggy Behavior

1. Clone this Git repository.
1. Open a shell in the cloned directory.
1. `npm install -g jest`
1. `npm install`
1. `firebase emulators:start --only firestore`
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
1. `firebase emulators:start --only firestore`
1. `jest test.js`

The test will still fail, but with an appropriate message:

```
Expected request to fail, but it succeeded.
```

## Workaround

A workaround is documented in https://github.com/facebook/jest/issues/7780 and
it worked for me. Below are the instructions to apply the workaround. To see
the workaround, checkout the `workaround` branch.

1. Follow the instructions above to reproduce the issue.
1. `npm i jest-environment-node`
1. Create a file named `__test-utils__/custom-jest-environment.js` and set its
   contents to
   https://github.com/dconeybe/FirebaseJsBug3096/blob/workaround/__test-utils__/custom-jest-environment.js.
1. Add the following to `package.json`:
   ```
   "jest": {
     "testEnvironment": "./__test-utils__/custom-jest-environment.js"
   }
   ```
1. `jest test.js`

The test will still fail, but with a failure not related to an internal error,
which demonstrates that the bug was worked around successfully.
