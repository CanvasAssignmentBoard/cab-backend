-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assignmentID" TEXT NOT NULL
);
INSERT INTO "new_Tasks" ("assignmentID", "id", "name", "status") SELECT "assignmentID", "id", "name", "status" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
CREATE TABLE "new_Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "canvasId" INTEGER NOT NULL,
    "boardId" TEXT NOT NULL
);
INSERT INTO "new_Assignment" ("boardId", "canvasId", "id") SELECT "boardId", "canvasId", "id" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
