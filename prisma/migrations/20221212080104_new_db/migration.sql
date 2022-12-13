/*
  Warnings:

  - You are about to drop the column `boardId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `assignmentID` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assignmentID" TEXT NOT NULL,
    "dueAt" TEXT NOT NULL,
    CONSTRAINT "Tasks_assignmentID_fkey" FOREIGN KEY ("assignmentID") REFERENCES "Assignment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tasks" ("assignmentID", "dueAt", "id", "name", "status") SELECT "assignmentID", "dueAt", "id", "name", "status" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
CREATE TABLE "new_Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "canvasId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    CONSTRAINT "Assignment_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assignment" ("boardId", "canvasId", "id", "status") SELECT "boardId", "canvasId", "id", "status" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
CREATE TABLE "new_Course" (
    "canvasId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "assignmentID" TEXT NOT NULL,
    CONSTRAINT "Course_assignmentID_fkey" FOREIGN KEY ("assignmentID") REFERENCES "Assignment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("canvasId") SELECT "canvasId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_assignmentID_key" ON "Course"("assignmentID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
