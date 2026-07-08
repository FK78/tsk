#!/usr/bin/env node

import { add } from './commands/add.js'
import { update } from './commands/update.js'
import { deleteTask } from './commands/delete.js'
import { markDone, markInProgress } from './commands/mark.js'

const args = process.argv.slice(2)
const functionName = args[0]
const params = args.slice(1)

const functions = {
    add: (description) => add(description),
    update: (taskId, description) => update(Number(taskId), description),
    delete: (taskId) => deleteTask(Number(taskId)),
    "mark-done": (taskId) => markDone(Number(taskId)),
    "mark-in-progress": (taskId) => markInProgress(Number(taskId))
}

if (functions[functionName]) {
    functions[functionName](...params)
} else {
    console.log(`Unknown function: ${functionName}`)
    console.log(`Available: ${Object.keys(functions).join(", ")}`)
}