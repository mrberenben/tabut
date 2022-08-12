import React from "react";
import styles from "@styles/components/person-card.module.css";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";

type PersonResponse = inferQueryResponse<"get-person-by-id">;

const PersonCard: React.FC<{
  person: PersonResponse;
  vote: () => void;
}> = props => {
  return (
    <button
      type="button"
      className={styles.person_card}
      onClick={() => props.vote()}
    >
      <img
        src={props.person.image}
        alt={props.person.name}
        width={256}
        height={256}
      />
      {props.person.name}
    </button>
  );
};

export default PersonCard;
