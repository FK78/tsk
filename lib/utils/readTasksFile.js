import { readFile } from "fs/promises";
import { TASKS_PATH } from "../constants";

export const readTasksFile = async () => {
  const data = await readFile(TASKS_PATH, "utf-8");
  return JSON.parse(data);
};
