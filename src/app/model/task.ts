export interface Task {
success: boolean,
tasks: Tasks[]
}

export interface Tasks {
    createdAt: String,
    description: String,
    isCompleted: boolean,
    title: String,
    user: String,
    _id: String
}
