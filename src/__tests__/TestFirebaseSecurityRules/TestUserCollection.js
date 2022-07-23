import {initializeTestEnvironment, assertFails, assertSucceeds} from '@firebase/rules-unit-testing'
import {setLogLevel} from 'firebase/firestore'
import {testEnvSetup} from './Utils'

const PROJECT_ID = "musicmaker-9c83c"

let testEnv = null;

beforeEach(async () => {
    testEnv = await initializeTestEnvironment(testEnvSetup);
})

test("Users collection can be read when not logged in", async () => {

    expect(readUsersCollection(db(false), true, 'TestUserId')).resolves.toBeDefined();
})

test("Users collection can be read when logged in", async () => {

    expect(readUsersCollection(db(true), true, 'TestUserId')).resolves.toBeDefined();

})

test("Users collection cannot be written to when not logged in", async () => {

    const testUserDoc = db(false).collection("users").doc('user1');

    expect(assertFails(testUserDoc.set({username: "user1"}))).resolves.toBeDefined();
})

test("A user can create their own doc in users collection", async () => {
    const testUserDoc = db(true).collection("users").doc('user1');

    expect(assertSucceeds(testUserDoc.set({followers: []}))).resolves.toBeDefined();

    //expect(assertSucceeds(testUserDoc.update({posts: db.FieldValue.arrayUnion("109920")}))).resolves.toBeDefined();

})

test("A user cannot create another user's doc in users collection", async () => {
    const testUserDoc = db(true).collection("users").doc('user2');

    expect(assertFails(testUserDoc.set({followers: []}))).resolves.toBeDefined();

    //expect(assertFails(testUserDoc.update({posts: db.FieldValue.arrayUnion("109920")}))).resolves.toBeDefined();
})

test("Only the logged in user can update their own doc fields (except followers, followersCount)", async () => {
    const testUserDoc = db(true).collection("users").doc('user1');

    await testUserDoc.set({about: "just here"});

    expect(assertSucceeds(testUserDoc.set({about: "wow"}))).resolves.toBeDefined();
})

test("A logged in user cannot update another user's doc", async () => {
    let testUserDoc = db(true).collection("users").doc('user1');

    await testUserDoc.set({about: "wow"});

    const newDb = testEnv.authenticatedContext("user2").firestore();
    setLogLevel('silent');

    testUserDoc = newdb.collection("users").doc('user1');

    expect(assertFails(testUserDoc.set({about: "anything"}))).resolves.toBeDefined();

})

test("A logged in user can update another user's followers and followersCount by 1", async () => {
    let testUserDoc = db(true).collection("users").doc('user1');

    await testUserDoc.set({followers: [], followersCount: 0});

    const newDb = testEnv.authenticatedContext("user2").firestore();
    setLogLevel('silent');

    testUserDoc = newdb.collection("users").doc('user1');

    expect(assertSucceeds(testUserDoc.set({followers: ["user2"], followersCount: 1}))).resolves.toBeDefined();

    expect(assertSucceeds(testUserDoc.set({followers: [], followersCount: 0}))).resolves.toBeDefined();
})

test("A logged in user cannot update another user's followers and followersCount by more than 1", async () => {
    let testUserDoc = db(true).collection("users").doc('user1');

    await testUserDoc.set({followers: [], followersCount: 0});

    const newDb = testEnv.authenticatedContext("user2").firestore();
    setLogLevel('silent');

    testUserDoc = newdb.collection("users").doc('user1');

    expect(assertFails(testUserDoc.set({followers: ["user2", "user3", "user4"], followersCount: 7}))).resolves.toBeDefined();

    expect(assertFails(testUserDoc.set({followers: ["user4"], followersCount: 2}))).resolves.toBeDefined();
})

test("A logged in user cannot update another user's followers and followersCount by different numbers", async () => {
    let testUserDoc = db(true).collection("users").doc('user1');

    await testUserDoc.set({followers: [], followersCount: 0});

    const newDb = testEnv.authenticatedContext("user2").firestore();
    setLogLevel('silent');

    testUserDoc = newdb.collection("users").doc('user1');

    expect(assertFails(testUserDoc.set({followers: ["user2"], followersCount: 0}))).resolves.toBeDefined();

    expect(assertFails(testUserDoc.set({followers: [], followersCount: 1}))).resolves.toBeDefined();
})



const readUsersCollection = (db, pass, userId) => {
    const testUserDoc = db.collection("users").doc(userId);

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