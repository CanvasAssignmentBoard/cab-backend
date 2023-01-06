/*
  Warnings:

  - You are about to drop the column `status` on the `Assignment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "canvasId" INTEGER NOT NULL,
    "rowId" TEXT,
    "courseID" INTEGER NOT NULL,
    CONSTRAINT "Assignment_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "Row" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Assignment" ("canvasId", "courseID", "id", "rowId") SELECT "canvasId", "courseID", "id", "rowId" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
