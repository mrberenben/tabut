import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { trpc } from "@utils/trpc";
import styles from "@styles/pages/index.module.css";

// components
import Layout from "@layout/index";
import PersonCard from "@components/person-card";
import ActionFeedback from "@components/action-feedback";

const Home: NextPage = () => {
  const [selected, setSelected] = useState<number | undefined>(undefined);

  // trpc
  const {
    data: pair,
    isLoading,
    isError,
    refetch
  } = trpc.useQuery(["get-person-pair"], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });
  const voteMutation = trpc.useMutation(["cast-vote"]);

  // pick person
  const pick = useCallback((selected: number) => {
    setSelected(prev => (selected === prev ? undefined : selected));
  }, []);

  // cast a vote
  const vote = useCallback(() => {
    if (!selected || !pair) return;

    if (selected === pair.first.id) {
      voteMutation.mutate({
        voted: pair.first.id,
        against: pair.second.id
      });
    } else {
      voteMutation.mutate({
        voted: pair.second.id,
        against: pair.first.id
      });
    }

    refetch();
    setSelected(undefined);
  }, [selected, pair, voteMutation, refetch]);

  // data controls
  if (isLoading) return <ActionFeedback type="loading" />;
  if (isError || !pair) return <ActionFeedback type="error" />;

  return (
    <Layout pageTitle="Tabut" pageDescription="Kim kimi tabut yapar?">
      <h1 className={styles.page_title}>Hangisi Tabut Yapar</h1>

      <div className={styles.battleground}>
        <PersonCard
          person={pair.first}
          selected={selected}
          pick={() => pick(pair.first.id)}
        />
        {" vs "}
        <PersonCard
          person={pair.second}
          selected={selected}
          pick={() => pick(pair.second.id)}
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
