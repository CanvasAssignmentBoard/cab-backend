/*
  Warnings:

  - You are about to drop the column `boardId` on the `Assignment` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Row" (
    "boardId" TEXT,
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    CONSTRAINT "Row_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "canvasId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "rowId" TEXT,
    "courseID" INTEGER NOT NULL,
    CONSTRAINT "Assignment_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "Row" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Assignment" ("canvasId", "courseID", "id", "status") SELECT "canvasId", "courseID", "id", "status" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
