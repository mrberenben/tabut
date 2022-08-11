import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@server/utils/prisma";

export const appRouter = trpc
  .router()
  .query("get-person-by-id", {
    input: z.object({ id: z.number().nullish() }), // TODO: ssr throws an error when id is not nullish.
    resolve({ input }) {
      return { id: input.id, name: "Ali Deniz Bakar" };
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
          ...input
        }
      });
      return { success: true, vote };
    }
  });

export type AppRouter = typeof appRouter;
