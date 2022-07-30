import {initializeTestEnvironment, assertFails, assertSucceeds} from '@firebase/rules-unit-testing'
import {setLogLevel, arrayUnion, arrayRemove, increment, serverTimestamp} from 'firebase/firestore'
import {testEnvSetup} from './Utils'

const PROJECT_ID = "musicmaker-9c83c"

let testEnv = null;

beforeEach(async () => {
    testEnv = await initializeTestEnvironment(testEnvSetup);
})

test("Feedback collection can be read when not logged in", async () => {

    expect(readFeedbackCollection(db(false), true, 'user1')).resolves.toBeDefined();
})

test("Feedback collection can be read when logged in", async () => {

    expect(readFeedbackCollection(db(true), true, 'user1')).resolves.toBeDefined();
})

test("Feedback collection cannot be written to when not logged in", async () => {
    const database = db(false);

    const testFeedbackDoc = database.collection("feedback").doc("track1");

    expect(assertFails(testFeedbackDoc.set({comments: [], likes: 0}))).resolves.toBeDefined();

})

test("New doc in feedback can be made if track's author is currently logged in user", async () => {
    getTestFeedbackDocRef();

    const testFeedbackDoc = db(true).collection("feedback").doc("track1");

    expect(assertSucceeds(testFeedbackDoc.set({comments: [], likes: 0}))).resolves.toBeUndefined();
})

test("New doc in feedback cannot be made if track's author is not currently logged in user", async () => {
    getTestFeedbackDocRef();

    const testFeedbackDoc = testEnv.authenticatedContext('user2').firestore().collection("feedback").doc("track1");

    expect(assertFails(testFeedbackDoc.set({comments: [], likes: 0}))).resolves.toBeDefined();
})

test("Currently logged in user can only like / unlike once", async () => {

    makeTestFeedbackDoc();

    const testFeedbackDoc = db(true).collection("feedback").doc("track1");

    expect(assertSucceeds(testFeedbackDoc.update({likes: arrayUnion("user1")}))).resolves.toBeDefined();
    expect(assertFails(testFeedbackDoc.update({likes: arrayUnion("user1")}))).resolves.toBeDefined();
    expect(assertSucceeds(testFeedbackDoc.update({likes: arrayRemove("user1")}))).resolves.toBeDefined();
    expect(assertFails(testFeedbackDoc.update({likes: arrayUnion("user1", "user1")}))).resolves.toBeDefined();

})

test("Only current user can add / remove their name to / from likes array", async () => {

    makeTestFeedbackDoc();

    const testFeedbackDoc = db(true).collection("feedback").doc("track1");

    expect(assertSucceeds(testFeedbackDoc.update({likes: arrayUnion("user1")}))).resolves.toBeDefined();
    expect(assertFails(testFeedbackDoc.update({likes: arrayUnion("user2")}))).resolves.toBeDefined();
    expect(assertSucceeds(testFeedbackDoc.update({likes: arrayRemove("user1")}))).resolves.toBeDefined();
})

test("Feedback doc comments can be updated by any logged in user, but only by 1 entry each time", async () => {

    makeTestFeedbackDoc();

    const testFeedbackDoc = db(true).collection("feedback").doc("track1");

    expect(assertSucceeds(testFeedbackDoc.update({comments: arrayUnion(
        {name: "user1", body: "wow", userId: "user1", date: serverTimestamp()}
    )}))).resolves.toBeDefined();

    expect(assertFails(testFeedbackDoc.update({comments: arrayUnion(
        {name: "user1", body: "wow", userId: "user1", date: serverTimestamp()},
        {name: "user1", body: "wow", userId: "user1", date: serverTimestamp()}
    )}))).resolves.toBeDefined();

})

const getTestFeedbackDocRef = async () => {
    const database = db(true);

    const testTrackDoc = database.collection("tracks").doc("track1");

    await testTrackDoc.set({authorId: "user1"});
}

const makeTestFeedbackDoc = async () => {
    const testFeedbackDoc = db(true).collection("feedback").doc("track1");

    await testFeedbackDoc.set({likes: 0, comments: []});
}

const readFeedbackCollection = (db, pass, userId) => {
    const testFeedbackDoc = db.collection("feedback").doc(userId);

    return pass ? assertSucceeds(testFeedbackDoc.get()) : assertFails(testFeedbackDoc.get());
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