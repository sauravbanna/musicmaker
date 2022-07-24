import {initializeTestEnvironment, assertFails, assertSucceeds} from '@firebase/rules-unit-testing'
import {setLogLevel, arrayUnion, arrayRemove} from 'firebase/firestore'
import {testEnvSetup} from './Utils'

const PROJECT_ID = "musicmaker-9c83c"

let testEnv = null;

beforeEach(async () => {
    testEnv = await initializeTestEnvironment(testEnvSetup);
})

test("Followers collection can be read when not logged in", async () => {

    expect(readFollowersCollection(db(false), true, 'user1')).resolves.toBeDefined();
})

test("Followers collection can be read when logged in", async () => {

    expect(readFollowersCollection(db(true), true, 'user1')).resolves.toBeDefined();
})

test("The currently logged in user can create their followers doc if they have a doc in users collection", async () => {
    const database = db(true);

    const testFollowersDoc = database.collection("followers").doc("user1");

    expect(assertFails(testFollowersDoc.set({followers: []}))).resolves.toBeDefined();

    const testUserDoc = database.collection("users").doc("user1");

    await testUserDoc.set({about: "Wow"});

    expect(assertSucceeds(testFollowersDoc.set({followers: []}))).resolves.toBeDefined();
})

test("The currently logged in user cannot create other user's followers doc", async () => {
    let database = db(true);

    const testUserDoc = database.collection("users").doc("user1");

    await testUserDoc.set({about: "Wow"});

    database = testEnv.authenticatedContext('user2');

    let testFollowersDoc = database.collection("followers").doc("user1");

    expect(assertFails(testFollowersDoc.set({followers: []}))).resolves.toBeDefined();

    testFollowersDoc = database.collection("followers").doc("user3");

    expect(assertFails(testFollowersDoc.set({followers: []}))).resolves.toBeDefined();



    expect(assertSucceeds(testFollowersDoc.set({followers: []}))).resolves.toBeDefined();
})

test("Any logged in user can update another user's followers doc, but only with their user Id", async () => {
    let database = db(true);

    let testFollowersDoc = database.collection("followers").doc("user1");

    await testFollowersDoc.set({followers: []});

    database = testEnv.authenticatedContext('user2');

    testFollowersDoc = database.collection("followers").doc("user1");

    expect(assertSucceeds(testFollowersDoc.update({followers: arrayUnion("user2")}))).resolves.toBeDefined();

    expect(assertFails(testFollowersDoc.update({followers: arrayUnion("user3")}))).resolves.toBeDefined();

    expect(assertSucceeds(testFollowersDoc.update({followers: arrayRemove("user2")}))).resolves.toBeDefined();

})

test("A logged in user cannot update their own followers doc", async () => {
    let database = db(true);

    let testFollowersDoc = database.collection("followers").doc("user1");

    await testFollowersDoc.set({followers: []});

    expect(assertFails(testFollowersDoc.update({followers: arrayUnion("user1")}))).resolves.toBeDefined();

    expect(assertFails(testFollowersDoc.update({followers: arrayUnion("user2")}))).resolves.toBeDefined();

})

test("Any logged in user cannot update another user's followers doc if already following", async () => {
    let database = db(true);

    let testFollowersDoc = database.collection("followers").doc("user1");

    await testFollowersDoc.set({followers: []});

    database = testEnv.authenticatedContext('user2');

    testFollowersDoc = database.collection("followers").doc("user1");

    expect(assertSucceeds(testFollowersDoc.update({followers: arrayUnion("user2")}))).resolves.toBeDefined();

    expect(assertFails(testFollowersDoc.update({followers: arrayUnion("user2")}))).resolves.toBeDefined();
})

test("Any logged in user cannot update another user's followers doc with more than 1 entry", async () => {
    let database = db(true);

    let testFollowersDoc = database.collection("followers").doc("user1");

    await testFollowersDoc.set({followers: []});

    database = testEnv.authenticatedContext('user2');

    testFollowersDoc = database.collection("followers").doc("user1");

    expect(assertFails(testFollowersDoc.update({followers: arrayUnion("user2", "user3", "user4")}))).resolves.toBeDefined();
})



const readFollowersCollection = (db, pass, userId) => {
    const testFollowersDoc = db.collection("followers").doc(userId);

    return pass ? assertSucceeds(testFollowersDoc.get()) : assertFails(testFollowersDoc.get());
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