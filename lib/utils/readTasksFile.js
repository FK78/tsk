import { readFile } from "fs/promises";

export const readTasksFile = async (TASKS_PATH) => {
  const data = await readFile(TASKS_PATH, "utf-8");
  return JSON.parse(data);
};
