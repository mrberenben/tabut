import type { NextPage } from "next";
import { useMemo } from "react";
import { trpc } from "@utils/trpc";

// components
import Layout from "@layout/index";

// utils
import { getOptionsForVote } from "@utils/getRandomPerson";

const Home: NextPage = () => {
  const [first, second] = useMemo(() => getOptionsForVote(), []);

  console.log(first, second);

  return (
    <Layout pageTitle="Tabut" pageDescription="Kim kimi tabut yapar?">
      {first} - {second}
    </Layout>
  );
};

export default Home;
