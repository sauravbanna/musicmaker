import {initializeTestEnvironment, assertFails, assertSucceeds, RulesTestEnvironment} from '@firebase/rules-unit-testing'
import {setLogLevel, arrayUnion, arrayRemove} from 'firebase/firestore'
import {testEnvSetup} from './Utils'

const PROJECT_ID = "musicmaker-9c83c"

let testEnv = initializeTestEnvironment(testEnvSetup);

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

test("A logged in user can create their own doc in users collection", async () => {
    const testUserDoc = db(true).collection("users").doc('user1');

    expect(assertSucceeds(testUserDoc.set({following: []}))).resolves.toBeUndefined();

})

test("A logged in user cannot create their own doc with more than 0 following", async () => {
    const testUserDoc = db(true).collection("users").doc('user1');

    expect(assertFails(testUserDoc.set({following: ["user2"]}))).resolves.toBeDefined();
})

test("A logged in user cannot create another user's doc in users collection", async () => {
    const testUserDoc = db(true).collection("users").doc('user2');

    expect(assertFails(testUserDoc.set({following: []}))).resolves.toBeDefined();

})

test("Only the logged in user can update their own doc fields", async () => {
    const testUserDoc = db(true).collection("users").doc('user1');

    await testUserDoc.set({about: "just here", following: []});

    expect(assertSucceeds(testUserDoc.update({about: "wow"}))).resolves.toBeUndefined();

    //expect(assertSucceeds(testUserDoc.update({following: arrayUnion("musicmaker")}))).resolves.toBeUndefined();
})

test("The logged in user cannot update their following by more than 1", async () => {
    const testUserDoc = db(true).collection("users").doc('user1');

    await testUserDoc.set({following: []});

    expect(assertSucceeds(testUserDoc.update({following: arrayUnion("musicmaker")}))).resolves.toBeUndefined();

    expect(assertSucceeds(testUserDoc.update({following: arrayUnion("user5")}))).resolves.toBeUndefined();

    //expect(assertSucceeds(testUserDoc.update({following: arrayRemove("user5")}))).resolves.toBeUndefined();

    expect(assertFails(testUserDoc.update({following: arrayUnion("user2", "user3", "user4")}))).resolves.toBeDefined();

    expect(assertFails(testUserDoc.update({following: arrayRemove("user3", "user4")}))).resolves.toBeDefined();
})

test("The logged in user cannot add existing user to their following", async () => {
    const testUserDoc = db(true).collection("users").doc('user1');

    await testUserDoc.set({following: []});

    expect(assertSucceeds(testUserDoc.update({following: arrayUnion("musicmaker")}))).resolves.toBeUndefined();

    expect(assertFails(testUserDoc.update({following: arrayUnion("musicmaker")}))).resolves.toBeDefined();
    expect(true).toBe(true);
})




test("A logged in user cannot update another user's doc", async () => {
    let testUserDoc = db(true).collection("users").doc('user1');

    await testUserDoc.set({about: "wow"});

    const newDb = testEnv.authenticatedContext("user2").firestore();
    setLogLevel('silent');

    testUserDoc = newdb.collection("users").doc('user1');

    expect(assertFails(testUserDoc.update({about: "anything", following: []}))).resolves.toBeDefined();

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