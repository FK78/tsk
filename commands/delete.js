import { withTask } from "../lib/utils/withTask.js";

export const deleteTask = async (taskId) => {
  if (!taskId || isNaN(taskId)) {
    console.error("Usage: tsk delete <task-id>");
    return;
  }

  withTask(taskId, "Task deleted successfully", (tasks, index) => {
    tasks.splice(index, 1);
  });
};
