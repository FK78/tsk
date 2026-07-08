import { readTasksFile } from "../lib/utils/readTasksFile.js";
import { writeTasksFile } from "../lib/utils/writeTasksFile.js";

export const update = async (taskId, description) => {
  if (!description || !taskId || isNaN(taskId)) {
    console.error("Usage: tsk update <task-id> <description>");
    return;
  }
  
  withTask(taskId, "Task updated successfully", (tasks, index) => {
    const userTask = {
      ...tasks[index],
      description: description.trim(),
      updatedAt: new Date().toISOString(),
    };
    tasks[index] = userTask;
  });
};
