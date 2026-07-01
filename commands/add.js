import { TASKS_PATH } from "../lib/constants.js";
import { readTasksFile } from "../lib/utils/readTasksFile.js";
import { writeTasksFile } from "../lib/utils/writeTasksFile.js";

export const add = async (description) => {
  if (!description) {
    console.error("Usage: tsk add <description>");
    return;
  }

  let tasks = [];

  try {
    tasks = await readTasksFile(TASKS_PATH);
  } catch (err) {
    if (err.code === "ENOENT") {
      // Do nothing as we'll create the file on line 30
    } else {
      console.error(`Failed to read tasks file, error: ${err}`);
      return;
    }
  }

  const userTask = {
    id: tasks.length + 1,
    description: description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };

  tasks.push(userTask);

  try {
    await writeTasksFile(tasks);
    console.log(`Task added successfully (ID: ${userTask.id})`);
  } catch (err) {
    console.error(`Error adding task to file: ${err}`);
  }
};
