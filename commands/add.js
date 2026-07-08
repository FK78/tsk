import { readTasksFile } from "../lib/utils/readTasksFile.js";
import { writeTasksFile } from "../lib/utils/writeTasksFile.js";

export const add = async (description) => {
  if (!description) {
    console.error("Usage: tsk add <description>");
    return;
  }

  let tasks = [];

  try {
    tasks = await readTasksFile();
  } catch (err) {
    if (err.code === "ENOENT") {
      // Do nothing as we'll create the file on line 30
    } else {
      console.error(`Failed to read tasks file, error: ${err}`);
      return;
    }
  }

  const taskId = tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.id)) + 1

  const userTask = {
    id: taskId,
    description: description.trim(),
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
