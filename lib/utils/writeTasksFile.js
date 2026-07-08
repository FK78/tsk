import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { TASKS_PATH } from "../constants.js";

export const writeTasksFile = async (tasks) => {
  await mkdir(path.dirname(TASKS_PATH), { recursive: true });
  await writeFile(TASKS_PATH, JSON.stringify(tasks, null, 2))
};
