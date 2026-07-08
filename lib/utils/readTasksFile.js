import { readFile } from "fs/promises";
import { TASKS_PATH } from "../constants.js";

export const readTasksFile = async () => {
  const data = await readFile(TASKS_PATH, "utf-8");
  try {
    return JSON.parse(data);
  } catch {
    throw new Error("tasks.json is corrupted or contains invalid JSON");
  }
};
