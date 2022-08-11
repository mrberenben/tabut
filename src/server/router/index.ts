import * as trpc from "@trpc/server";
import { z } from "zod";

export const appRouter = trpc.router().query("get-person-by-id", {
  input: z.object({ id: z.number() }),
  resolve({ input }) {
    return input.id;
  }
});

// export type definition of API
export type AppRouter = typeof appRouter;
