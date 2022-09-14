import { Router, Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert_hour_string_to_minute";
import { convertMinutesToHourString } from "./utils/convert_minutes_to_hour_string";
import axios from "axios";
import { getToken } from "./services/twitch/getToken";
import { getTopGames } from "./services/twitch/getTopGames";

const route = Router();
const prisma = new PrismaClient();

route.get("/games/top", async (request: Request, response: Response) => {
  const token = await getToken();

  const gamesTop = await getTopGames(token.access_token);

  return response.json(gamesTop);
});

route.get("/games", async (request: Request, response: Response) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });

    return response.json({ games });
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
});

route.get("/games/:id/ads", async (request: Request, response: Response) => {
  const gameId = request.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      id: gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

route.get("/ads/:id/discord", async (request: Request, response: Response) => {
  const adId = request.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return response.json({
    discord: ad.discord,
  });
});

route.post("/games/:id/ads", async (request: Request, response: Response) => {
  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekdays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });
  return response.json(ad);
});

export { route };
