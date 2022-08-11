import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@server/utils/prisma";

export const appRouter = trpc
  .router()
  .query("get-person-by-id", {
    input: z.object({ id: z.number() }), // TODO: ssr throws an error when id is not nullish.
    async resolve({ input }) {
      const person = await prisma.person.findFirst({ where: { id: input.id } });

      if (!person) throw new Error("Person not found");
      return person;
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
