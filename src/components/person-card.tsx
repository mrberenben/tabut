import React from "react";
import Image from "next/image";
import styles from "@styles/components/person-card.module.css";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";

// components
import StatSlot from "@components/stat-slot";

type PersonResponse = inferQueryResponse<"get-person-pair">["first" | "second"];
type PersonCardProps = {
  person: PersonResponse;
  selected: number | undefined;
  pick: () => void;
};

const PersonCard: React.FC<PersonCardProps> = props => {
  const isSelected = props.selected === props.person.id;

  return (
    <div
      className={[
        styles.person_card,
        isSelected ? styles.person_card_selected : undefined,
        props.selected !== undefined && !isSelected
          ? styles.person_card_unselected
          : undefined
      ].join(" ")}
      onClick={() => props.pick()}
    >
      <div className={styles.person_card_image}>
        <Image
          src={props.person.image}
          alt={props.person.name}
          layout="fill"
          priority={true}
        />
      </div>
      <h6 className={styles.person_card_name}>{props.person.name}</h6>
      <ul className={styles.person_card_stats}>
        <StatSlot stat="STR" value={props.person.stats.strength} />
        <StatSlot stat="INT" value={props.person.stats.intelligent} />
        <StatSlot stat="DEX" value={props.person.stats.dexterity} />
        <StatSlot stat="CHA" value={props.person.stats.charisma} />
        <StatSlot stat="DUR" value={props.person.stats.durability} />
      </ul>
    </div>
  );
};

export default PersonCard;
