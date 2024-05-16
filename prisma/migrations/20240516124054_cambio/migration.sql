/*
  Warnings:

  - You are about to drop the column `descripcion` on the `Estado` table. All the data in the column will be lost.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_post_fkey";

-- AlterTable
ALTER TABLE "Estado" DROP COLUMN "descripcion";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "id_post" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "post" DROP CONSTRAINT "post_pkey",
DROP COLUMN "content",
ADD COLUMN     "postImage" TEXT,
ADD COLUMN     "postText" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "post_id_seq";

-- DropEnum
DROP TYPE "FriendStatus";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
