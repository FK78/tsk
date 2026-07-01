# tsk

A minimal task tracker CLI. No dependencies, just Node.js.

## Install

```bash
npm install -g github:FK78/tsk
```

Or clone and link locally:

```bash
git clone https://github.com/FK78/tsk.git
cd tsk
npm link
```

## Usage

```bash
# Add a task
tsk add "Buy groceries"
# Task added successfully (ID: 1)

# Update a task
tsk update 1 "Buy groceries and cook dinner"

# Delete a task
tsk delete 1
```

## Commands

| Command | Description |
|---------|-------------|
| `tsk add <description>` | Add a new task |
| `tsk update <id> <description>` | Update a task's description |
| `tsk delete <id>` | Delete a task |

## How it works

Tasks are stored as JSON in `~/.tsk/tasks.json`. The file and directory are created automatically on first use.

Each task has:

```json
{
  "id": 1,
  "description": "Buy groceries",
  "status": "todo",
  "createdAt": "2026-07-01T12:00:00.000Z",
  "updatedAt": null
}
```

## Project structure

```
tsk/
├── index.js           # CLI entry point and command dispatch
├── commands/
│   ├── add.js         # Add a task
│   ├── update.js      # Update a task
│   └── delete.js      # Delete a task
└── lib/
    ├── constants.js   # Shared config (TASKS_PATH)
    └── utils/
        ├── readTasksFile.js
        └── writeTasksFile.js
```

## Requirements

- Node.js 18+

## License

MIT
