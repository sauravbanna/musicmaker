import firebase, {initializeTestEnvironment, assertFails, assertSucceeds} from '@firebase/rules-unit-testing'
import {getApps} from 'firebase/app'
import fs from 'fs'

const PROJECT_ID = "musicmaker-9c83c"

let testEnv = null;

beforeEach(async () => {
    testEnv = await initializeTestEnvironment({
        projectId: PROJECT_ID,
        firestore: {
            host: "localhost",
            port: 8080,
            rules: fs.readFileSync('firestore.rules', 'utf-8'),
        }
    });
})

test("Users collection can be read when not logged in", async () => {

    const db = testEnv.unauthenticatedContext().firestore();

    const testUserDoc = db.collection("usernames").doc("TestUser");

    const docPromise = assertFails(testUserDoc.get());

    expect(docPromise).resolves.toBeDefined();
})

afterEach(async () => {
    await testEnv.unauthenticatedContext().firestore().terminate();
    await testEnv.unauthenticatedContext().firestore().clearPersistence();
})