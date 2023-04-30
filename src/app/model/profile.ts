export interface Profile {
    success: boolean,
    user: User
}

export interface User {
    createdAt: String,
    email: String,
    name: String,
    _id: String
}