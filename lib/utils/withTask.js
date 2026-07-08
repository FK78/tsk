import { readTasksFile } from "./readTasksFile.js";
import { writeTasksFile } from "./writeTasksFile.js";

export const withTask = async (taskId, msg, fn) => {
  let tasks = [];

  try {
    tasks = await readTasksFile();
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("No tasks yet. Run 'tsk add <description>' to get started.");
      return;
    }
    console.error(`Failed to read tasks file, error: ${err}`);
    return;
  }

  const index = tasks.findIndex((t) => t.id === taskId);
  if (index === -1) {
    console.error("Task with that ID does not exist");
    return;
  }

  fn(tasks, index);

  try {
    await writeTasksFile(tasks);
    console.log(msg);
  } catch (err) {
    console.error(`Error writing updated task to file: ${err}`);
  }
};
