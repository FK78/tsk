import { readTasksFile } from "../lib/utils/readTasksFile.js";
import { writeTasksFile } from "../lib/utils/writeTasksFile.js";

export const deleteTask = async (taskId) => {
  if (!taskId || isNaN(taskId)) {
    console.error("Usage: tsk delete <task-id>");
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

  if (index > -1){
    tasks.splice(index, 1)
  } else {
    console.error("Task with that ID does not exist")
    return
  }

  try {
    await writeTasksFile(tasks);
    console.log("Task deleted successfully")
  } catch (err) {
    console.error(`Error deleting task: ${err}`);
  }
};
