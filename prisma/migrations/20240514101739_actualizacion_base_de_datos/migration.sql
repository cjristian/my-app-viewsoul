/*
  Warnings:

  - You are about to drop the `Firendships` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Firendships" DROP CONSTRAINT "Firendships_estadoId_fkey";

-- DropForeignKey
ALTER TABLE "Firendships" DROP CONSTRAINT "Firendships_usuarioId1_fkey";

-- DropForeignKey
ALTER TABLE "Firendships" DROP CONSTRAINT "Firendships_usuarioId2_fkey";

-- DropTable
DROP TABLE "Firendships";

-- CreateTable
CREATE TABLE "Friendships" (
    "id" SERIAL NOT NULL,
    "usuarioId1" TEXT NOT NULL,
    "usuarioId2" TEXT NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "fechaSolicitud" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friendships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Friendships_usuarioId1_usuarioId2_key" ON "Friendships"("usuarioId1", "usuarioId2");

-- AddForeignKey
ALTER TABLE "Friendships" ADD CONSTRAINT "Friendships_usuarioId1_fkey" FOREIGN KEY ("usuarioId1") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendships" ADD CONSTRAINT "Friendships_usuarioId2_fkey" FOREIGN KEY ("usuarioId2") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendships" ADD CONSTRAINT "Friendships_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
