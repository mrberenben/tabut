import type { NextPage } from "next";
import Layout from "@layout/index";
import { trpc } from "@utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["hello", { text: "Eren" }]);

  if (isLoading) return <div>Loading..</div>;

  if (data) return <div>{data.greeting}</div>;

  return (
    <Layout pageTitle="Tabut" pageDescription="Kim kimi tabut yapar?">
      a
    </Layout>
  );
};

export default Home;
