import { prisma } from "../src/server/utils/prisma";

const persons = require("./persons.json");

const fill = async () => {
  const create = await prisma.person.createMany({
    data: persons
  });
};

fill();
