import { prisma } from "../src/server/utils/prisma";

const stats = require("./stats.json");

const fill = async () => {
  const create = await prisma.stats.createMany({
    data: stats
  });
};

fill();
