import type { NextPage, GetStaticProps } from "next";

// components
import Layout from "@layout/index";

// lib
import { AsyncReturnType } from "@libs/types";
import { getLeaderboard } from "@utils/getLeaderboard";

type LeaderboardResponse = AsyncReturnType<typeof getLeaderboard>;
const Leaderboard: NextPage<{
  board: LeaderboardResponse[number];
}> = ({ board }) => {
  console.log({ board });
  return (
    <Layout pageTitle="Tabut" pageDescription="Kim kimi tabut yapar?">
      leaderboard
    </Layout>
  );
};

export default Leaderboard;

export const getStaticProps: GetStaticProps = async () => {
  const leaderboard = await getLeaderboard();

  return {
    props: {
      board: leaderboard
    }
  };
};
