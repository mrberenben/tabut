import * as trpcNext from "@trpc/server/adapters/next";
import { inferProcedureOutput } from "@trpc/server";
import { appRouter, AppRouter } from "@server/router";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null
});

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
