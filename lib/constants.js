import { homedir } from 'node:os'
import path from 'node:path'

export const TASKS_PATH = path.join(homedir(), ".tsk", "tasks.json")