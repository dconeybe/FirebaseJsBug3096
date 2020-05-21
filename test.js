// This code was copied from https://github.com/firebase/firebase-js-sdk/issues/3096

const firebase = require('@firebase/testing');

describe('Minimal test', () => {
  const projectId = 'project-id';
  let db;
  let ref;

  beforeAll(() => {
    db = firebase.initializeTestApp({ projectId }).firestore();
    ref = db.collection('hello-world');
  });

  afterAll(() => Promise.all(firebase.apps().map((app) => app.delete())));

  test('this tests throws an error and never returns', async () => {
    await expect(await firebase.assertFails(ref.get()));
  });
});
