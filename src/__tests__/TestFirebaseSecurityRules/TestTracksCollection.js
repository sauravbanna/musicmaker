import {initializeTestEnvironment, assertFails, assertSucceeds} from '@firebase/rules-unit-testing'
import {setLogLevel} from 'firebase/firestore'
import {testEnvSetup} from './Utils'

const PROJECT_ID = "musicmaker-9c83c"

let testEnv = null;

beforeEach(async () => {
    testEnv = await initializeTestEnvironment(testEnvSetup);
})

test("Tracks collection can be read when not logged in", async () => {

    expect(readTracksCollection(db(false), true, 'track1')).resolves.toBeDefined();
})

test("Tracks collection can be read when logged in", async () => {

    expect(readTracksCollection(db(true), true, 'track1')).resolves.toBeDefined();
})

test("New track can be created when logged in if track request is by logged in user", async () => {
    const testUserDoc = db(true).collection("tracks").doc("track1");

    expect(assertSucceeds(testUserDoc.set({author: 'user1'}))).resolves.toBeDefined();
})

test("New track cannot be created when logged in if track request is not by logged in user", async () => {
    const testUserDoc = db(true).collection("tracks").doc("track1");

    expect(assertFails(testUserDoc.set({author: 'user2'}))).resolves.toBeDefined();
})

test("New track cannot be created when not logged in", async () => {

    const testUserDoc = db(false).collection("tracks").doc("track1");

    expect(assertFails(testUserDoc.set({author: 'user1'}))).resolves.toBeDefined();
})

test("Track fields (except likes) can be updated by owner only", async () => {
    let testUserDoc = db(true).collection("tracks").doc("track1");

    await testUserDoc.set({authorId: 'user1'});

    expect(assertSucceeds(testUserDoc.set({title: 'title1'}))).resolves.toBeDefined();

    const newDb = testEnv.authenticatedContext('user2').firestore();

    testUserDoc = newDb.collection("tracks").doc('track1');

    expect(assertFails(testUserDoc.set({title: 'user2'}))).resolves.toBeDefined();
})




const readTracksCollection = (db, pass, trackId) => {
    const testUserDoc = db.collection("tracks").doc(trackId);

    return pass ? assertSucceeds(testUserDoc.get()) : assertFails(testUserDoc.get());
}

const db = (loggedIn) => {
    const db = loggedIn ? testEnv.authenticatedContext('user1').firestore() : testEnv.unauthenticatedContext().firestore();
    setLogLevel('silent');
    return db;
}

afterEach(() => {
    testEnv.clearFirestore();
})

afterAll(async () => {
    testEnv.cleanup();
})