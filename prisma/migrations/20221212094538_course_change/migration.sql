/*
  Warnings:

  - You are about to alter the column `owner` on the `Board` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `assignmentID` on the `Course` table. All the data in the column will be lost.
  - Added the required column `courseID` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Board" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "owner" INTEGER NOT NULL
);
INSERT INTO "new_Board" ("description", "id", "name", "owner") SELECT "description", "id", "name", "owner" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
CREATE TABLE "new_Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "canvasId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "courseID" INTEGER NOT NULL,
    CONSTRAINT "Assignment_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assignment_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course" ("canvasId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assignment" ("boardId", "canvasId", "id", "status") SELECT "boardId", "canvasId", "id", "status" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
CREATE TABLE "new_Course" (
    "canvasId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_Course" ("canvasId") SELECT "canvasId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
