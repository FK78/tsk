import { TASKS_PATH } from "../lib/constants.js";
import { readTasksFile } from "../lib/utils/readTasksFile.js";
import { writeFile } from "fs/promises";
import { writeTasksFile } from "../lib/utils/writeTasksFile.js";

export const update = async (taskId, description) => {
  if (!description || !taskId) {
    console.error("Usage: tsk update <task-id> <description>");
    return;
  }

  let tasks = [];

  try {
    tasks = await readTasksFile(TASKS_PATH);
  } catch (err) {
    console.error(`Failed to read tasks file, error: ${err}`);
    return;
  }

  const userTaskToUpdate = tasks.find(t => t.id === taskId)

  const userTask = {
    ...userTaskToUpdate,
    description: description,
    updatedAt: new Date().toISOString(),
  };

    tasks.push(userTask);

    try {
      await writeTasksFile(tasks);
    } catch (err) {
      console.error(`Error adding task to file: ${err}`);
    }
};
