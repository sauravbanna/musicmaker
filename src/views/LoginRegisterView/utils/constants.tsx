export const PAGE_WIDTH = "30%"

export const PASSWORD_SHORT_ERROR = 'password-short'
export const INVALID_EMAIL = 'email-invalid'
export const USERNAME_EXISTS = 'username-exists'
export const USERNAME_NOT_FOUND = 'username-not-found'
export const EMPTY_EMAIL = 'email-empty'
export const EMPTY_PASSWORD = 'password-empty'
export const EMPTY_USERNAME = 'username-empty'

interface IErrorMessages {
    [key: string] : string
}

export const ERROR_MESSAGES : IErrorMessages = {
    [PASSWORD_SHORT_ERROR]: "Password must be 8 characters or more",
    ["Firebase: Error (auth/email-already-in-use)."]: "Email already in use.",
    ["Firebase: Error (auth/invalid-email)."]: "Invalid email",
    [INVALID_EMAIL]: "Please enter a valid email",
    [USERNAME_EXISTS]: 'Username already in use',
    [USERNAME_NOT_FOUND]: "Username not found",
    ["Firebase: Error (auth/wrong-password)."]: "Wrong password",
    [EMPTY_EMAIL]: 'Email cannot be empty',
    [EMPTY_PASSWORD]: 'Password cannot be empty',
    [EMPTY_USERNAME]: 'Username cannot be empty',
}