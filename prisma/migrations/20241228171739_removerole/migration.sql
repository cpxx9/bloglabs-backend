/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Roles" DROP CONSTRAINT "_Roles_A_fkey";

-- DropForeignKey
ALTER TABLE "_Roles" DROP CONSTRAINT "_Roles_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "author" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "_Roles";
