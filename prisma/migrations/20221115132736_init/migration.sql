/*
  Warnings:

  - You are about to drop the column `courseID` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `boardId` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "canvasId" INTEGER NOT NULL,
    "boardId" TEXT NOT NULL,
    CONSTRAINT "Assignment_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assignment" ("canvasId", "id") SELECT "canvasId", "id" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
