import type { GetStaticProps, NextPage } from "next";
import { useState, useCallback } from "react";
import { trpc } from "@utils/trpc";
import styles from "@styles/pages/index.module.css";

// components
import Layout from "@layout/index";
import PersonCard from "@components/person-card";

// utils
import { getOptionsForVote } from "@utils/getRandomPerson";

type PageProps = {
  first_id: number;
  second_id: number;
};

const Home: NextPage<PageProps> = ({ first_id, second_id }) => {
  const [selected, setSelected] = useState<number | undefined>(undefined);

  // trpc
  const first = trpc.useQuery(["get-person-by-id", { id: first_id }]);
  const second = trpc.useQuery(["get-person-by-id", { id: second_id }]);
  const voteMutation = trpc.useMutation(["cast-vote"]);

  // pick person
  const pick = useCallback((selected: number) => {
    setSelected(prev => (selected === prev ? undefined : selected));
  }, []);

  // cast a vote
  const vote = useCallback(() => {
    if (selected && first.data && second.data) {
      if (selected === first.data.id) {
        voteMutation.mutate({ voted: first.data.id, against: second.data.id });
      } else {
        voteMutation.mutate({ voted: second.data.id, against: first.data.id });
      }
    }
  }, [selected, first.data, second.data, voteMutation]);

  // data controls
  if (first.isLoading || second.isLoading) return <div>loading...</div>;
  if (first.isError || second.isError || !first.data || !second.data)
    return <div>error while loading data.</div>;

  return (
    <Layout pageTitle="Tabut" pageDescription="Kim kimi tabut yapar?">
      <h1 className={styles.page_title}>Hangisi Tabut Yapar</h1>

      <div className={styles.battleground}>
        <PersonCard
          person={first.data}
          selected={selected}
          pick={() => pick(first.data.id)}
        />
        {" vs "}
        <PersonCard
          person={second.data}
          selected={selected}
          pick={() => pick(second.data.id)}
        />
      </div>

      <button
        type="button"
        className={styles.cast_vote}
        onClick={vote}
        disabled={!selected}
      >
        Vote
      </button>
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
