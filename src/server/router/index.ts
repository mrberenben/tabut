import * as trpc from "@trpc/server";
import { z } from "zod";

export const appRouter = trpc.router().query("get-person-by-id", {
  input: z.object({ id: z.number().nullish() }), // TODO: ssr throws an error when id is not nullish.
  resolve({ input }) {
    return { id: input.id, name: "Ali Deniz Bakar" };
  }
});

export type AppRouter = typeof appRouter;
