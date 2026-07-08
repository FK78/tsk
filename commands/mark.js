import { withTask } from "../lib/utils/withTask.js";

export const markInProgress = async (taskId) => {
  if (!taskId || isNaN(taskId)) {
    console.error("Usage: tsk mark-in-progress <task-id>");
    return;
  }

  withTask(taskId, "Task marked as in progress successfully", (tasks, index) => {
    const userTask = {
      ...tasks[index],
      status: "in-progress",
      updatedAt: new Date().toISOString(),
    };
    tasks[index] = userTask;
  });
};

export const markDone = async (taskId) => {
  if (!taskId || isNaN(taskId)) {
    console.error("Usage: tsk mark-done <task-id>");
    return;
  }

  withTask(taskId, "Task marked as done successfully", (tasks, index) => {
    const userTask = {
      ...tasks[index],
      status: "done",
      updatedAt: new Date().toISOString(),
    };
    tasks[index] = userTask;
  });
};
