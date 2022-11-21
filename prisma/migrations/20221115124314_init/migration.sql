/*
  Warnings:

  - Added the required column `name` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "canvasId" INTEGER NOT NULL,
    "boardID" TEXT NOT NULL,
    CONSTRAINT "Course_boardID_fkey" FOREIGN KEY ("boardID") REFERENCES "Board" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "canvasId" INTEGER NOT NULL,
    "courseID" TEXT NOT NULL,
    CONSTRAINT "Assignment_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assignmentID" TEXT NOT NULL,
    CONSTRAINT "Tasks_assignmentID_fkey" FOREIGN KEY ("assignmentID") REFERENCES "Assignment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Board" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL
);
INSERT INTO "new_Board" ("id") SELECT "id" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
