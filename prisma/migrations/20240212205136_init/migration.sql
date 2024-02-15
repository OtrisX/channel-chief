/*
  Warnings:

  - Added the required column `voiceChannelTempAlias` to the `voice_channels_hubs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "voice_channels_hubs" ADD COLUMN     "voiceChannelTempAlias" TEXT NOT NULL;
