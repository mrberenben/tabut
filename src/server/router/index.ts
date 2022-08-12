import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@server/utils/prisma";
import { getOptionsForVote } from "@utils/getRandomPerson";

export const appRouter = trpc
  .router()
  .query("get-person-pair", {
    async resolve() {
      // get person count from db
      const person_count = await prisma.person.count();

      // select two random people
      const [first, second] = getOptionsForVote(person_count);
      const pair = await prisma.person.findMany({
        where: { id: { in: [first, second] } }
      });

      // if pairing fails
      if (pair.length !== 2) throw new Error("Could not find pair.");

      // get stats for both people
      const stats = await prisma.stats.findMany({
        where: { personId: { in: [pair[0].id, pair[1].id] } }
      });
      if (!stats) throw new Error("Person not found");

      return {
        first: { ...pair[0], ...{ stats: stats[0] } },
        second: { ...pair[1], ...{ stats: stats[1] } }
      };
    }
  })
  .mutation("cast-vote", {
    input: z.object({
      voted: z.number(),
      against: z.number()
    }),
    async resolve({ input }) {
      const vote = await prisma.vote.create({
        data: {
          votedId: input.voted,
          againstId: input.against
        }
      });
      return { success: true, vote };
    }
  });

export type AppRouter = typeof appRouter;
