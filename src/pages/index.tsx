import type { GetStaticProps, NextPage } from "next";
import { useState, useCallback } from "react";
import { trpc } from "@utils/trpc";
import styles from "@styles/pages/index.module.css";

// components
import Layout from "@layout/index";
import PersonCard from "@components/person-card";

const Home: NextPage = () => {
  const [selected, setSelected] = useState<number | undefined>(undefined);

  // trpc
  const pair = trpc.useQuery(["get-person-pair"]);
  const voteMutation = trpc.useMutation(["cast-vote"]);

  // pick person
  const pick = useCallback((selected: number) => {
    setSelected(prev => (selected === prev ? undefined : selected));
  }, []);

  // cast a vote
  const vote = useCallback(() => {
    if (selected && pair.data) {
      if (selected === pair.data.first.id) {
        voteMutation.mutate({
          voted: pair.data.first.id,
          against: pair.data.second.id
        });
      } else {
        voteMutation.mutate({
          voted: pair.data.second.id,
          against: pair.data.first.id
        });
      }
    }
  }, [selected, pair.data, voteMutation]);

  // data controls
  if (pair.isLoading) return <div>loading...</div>;
  if (pair.isError || !pair.data) return <div>error while loading data.</div>;

  return (
    <Layout pageTitle="Tabut" pageDescription="Kim kimi tabut yapar?">
      <h1 className={styles.page_title}>Hangisi Tabut Yapar</h1>

      <div className={styles.battleground}>
        <PersonCard
          person={pair.data.first}
          selected={selected}
          pick={() => pick(pair.data.first.id)}
        />
        {" vs "}
        <PersonCard
          person={pair.data.second}
          selected={selected}
          pick={() => pick(pair.data.second.id)}
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
