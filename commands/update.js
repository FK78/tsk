import { readTasksFile } from "../lib/utils/readTasksFile.js";
import { writeTasksFile } from "../lib/utils/writeTasksFile.js";

export const update = async (taskId, description) => {
  if (!description || !taskId || isNaN(taskId)) {
    console.error("Usage: tsk update <task-id> <description>");
    return;
  }

  let tasks = [];

  try {
    tasks = await readTasksFile();
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("No tasks found. Add a task first.")
    } else {
    console.error(`Failed to read tasks file, error: ${err}`);
    return;
  }

  const index = tasks.findIndex((t) => t.id === taskId);

  if (index > -1) {
    const userTask = {
      ...tasks[index],
      description: description.trim(),
      updatedAt: new Date().toISOString(),
    };
    tasks[index] = userTask;
  } else {
    console.error("Task with that ID does not exist");
    return;
  }

  try {
    await writeTasksFile(tasks);
    console.log("Task updated successfully")
  } catch (err) {
    console.error(`Error writing updated task to file: ${err}`);
  }
};
