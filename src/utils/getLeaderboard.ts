import { prisma } from "@server/utils/prisma";

export const getLeaderboard = async () => {
  const people = await prisma.person.findMany({
    orderBy: {
      vote: { _count: "desc" }
    },
    select: {
      id: true,
      name: true,
      image: true,
      _count: {
        select: {
          vote: true,
          against: true
        }
      }
    }
  });
  const stats = await prisma.stats.findMany();

  return people.map(person => ({
    ...person,
    ...{ stats: stats.find(stat => stat.personId === person.id) }
  }));
};

export type GetLeaderboard = typeof getLeaderboard;
