-- CreateTable
CREATE TABLE "guilds" (
    "id" TEXT NOT NULL,

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voice_channels_hubs" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voice_channels_hubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voice_channels_temp" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "voiceChannelHubId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voice_channels_temp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "voice_channels_hubs" ADD CONSTRAINT "voice_channels_hubs_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voice_channels_temp" ADD CONSTRAINT "voice_channels_temp_voiceChannelHubId_fkey" FOREIGN KEY ("voiceChannelHubId") REFERENCES "voice_channels_hubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
