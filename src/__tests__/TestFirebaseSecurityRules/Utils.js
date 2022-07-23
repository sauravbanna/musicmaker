import {initializeTestEnvironment} from '@firebase/rules-unit-testing'
import fs from 'fs'

test("Mock Test", () => expect(true).toBe(true));

const PROJECT_ID = "musicmaker-9c83c"

export const testEnvSetup = {
    projectId: PROJECT_ID,
    firestore: {
        host: "localhost",
        port: 8080,
        rules: fs.readFileSync('firestore.rules', 'utf-8'),
    }
}