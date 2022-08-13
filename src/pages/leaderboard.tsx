import type { NextPage, GetStaticProps } from "next";
import styles from "@styles/pages/leaderboard.module.css";

// components
import Layout from "@layout/index";
import LeaderboardCard from "@components/leaderboard-card";

// lib
import { AsyncReturnType } from "@libs/types";
import { GetLeaderboard, getLeaderboard } from "@utils/getLeaderboard";

type LeaderboardResponse = AsyncReturnType<GetLeaderboard>;
const Leaderboard: NextPage<{
  board: LeaderboardResponse;
}> = ({ board }) => {
  console.log({ board });
  return (
    <Layout pageTitle="Tabut" pageDescription="Kim kimi tabut yapar?">
      <h1>Leaderboard</h1>

      <ul className={styles.leaderboard}>
        {board.map(person => (
          <LeaderboardCard key={person.id} person={person} />
        ))}
      </ul>
    </Layout>
  );
};

export default Leaderboard;

export const getStaticProps: GetStaticProps = async () => {
  const leaderboard = await getLeaderboard();

  return {
    props: {
      board: leaderboard
    },
    revalidate: 60
  };
};
