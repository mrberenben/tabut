import type { GetStaticProps, NextPage } from "next";
import { trpc } from "@utils/trpc";

// components
import Layout from "@layout/index";
import Person from "@components/person";

// utils
import { getOptionsForVote } from "@utils/getRandomPerson";

type PageProps = {
  first_id: number;
  second_id: number;
};

const Home: NextPage<PageProps> = ({ first_id, second_id }) => {
  const first = trpc.useQuery(["get-person-by-id", { id: first_id }]);
  const second = trpc.useQuery(["get-person-by-id", { id: second_id }]);

  const voteMutation = trpc.useMutation(["cast-vote"]);

  console.log(first);

  const vote = (selected: number) => {
    if (first.data && second.data) {
      if (selected === first.data.id) {
        voteMutation.mutate({ voted: first.data.id, against: second.data.id });
      } else {
        voteMutation.mutate({ voted: second.data.id, against: first.data.id });
      }
    }
  };

  if (first.isLoading || second.isLoading) return <div>loading...</div>;
  if (first.isError || second.isError || !first.data || !second.data)
    return <div>error while loading data.</div>;

  return (
    <Layout pageTitle="Tabut" pageDescription="Kim kimi tabut yapar?">
      <Person person={first.data} vote={() => vote(first.data.id)} />
      {" vs "}
      <Person person={second.data} vote={() => vote(second.data.id)} />
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = () => {
  const [first, second] = getOptionsForVote();

  return {
    props: {
      first_id: first,
      second_id: second
    }
  };
};
