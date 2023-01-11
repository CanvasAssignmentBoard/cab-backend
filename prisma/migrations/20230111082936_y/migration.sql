/*
  Warnings:

  - Added the required column `name` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdate` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignment" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "canvasId" INTEGER NOT NULL,
    "rowId" TEXT,
    "courseID" INTEGER NOT NULL,
    "index" INTEGER,
    CONSTRAINT "Assignment_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "Row" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Assignment" ("canvasId", "courseID", "id", "rowId") SELECT "canvasId", "courseID", "id", "rowId" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
CREATE TABLE "new_Board" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "owner" INTEGER NOT NULL,
    "lastUpdate" TEXT NOT NULL
);
INSERT INTO "new_Board" ("description", "id", "name", "owner") SELECT "description", "id", "name", "owner" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
