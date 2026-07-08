import { readTasksFile } from "../lib/utils/readTasksFile.js";

const STATUS_ICONS = {
  "todo": "○",
  "in-progress": "◑",
  "done": "●",
};

export const list = async (filter) => {
  let tasks = [];

  try {
    tasks = await readTasksFile();
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("No tasks yet. Run 'tsk add <description>' to get started.");
      return;
    }
    console.error(`Failed to read tasks file: ${err}`);
    return;
  }

  if (tasks.length === 0) {
    console.log("No tasks yet. Run 'tsk add <description>' to get started.");
    return;
  }

  if (filter && ["todo", "in-progress", "done"].includes(filter)) {
    tasks = tasks.filter((t) => t.status === filter);
    if (tasks.length === 0) {
      console.log(`No tasks with status "${filter}".`);
      return;
    }
  }

  const idWidth = Math.max(2, ...tasks.map((t) => String(t.id).length));
  const descWidth = Math.max(11, ...tasks.map((t) => t.description.length));
  const statusWidth = 13;

  const header = `${"ID".padEnd(idWidth)}  ${"Description".padEnd(descWidth)}  ${"Status".padEnd(statusWidth)}  Created`;
  const separator = "─".repeat(header.length);

  console.log("");
  console.log(header);
  console.log(separator);

  tasks.forEach((task) => {
    const icon = STATUS_ICONS[task.status] || " ";
    const status = `${icon} ${task.status}`;
    const created = new Date(task.createdAt).toLocaleDateString();
    const id = String(task.id).padEnd(idWidth);
    const desc = task.description.padEnd(descWidth);

    console.log(`${id}  ${desc}  ${status.padEnd(statusWidth)}  ${created}`);
  });

  console.log("");
};
