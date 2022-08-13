import styles from "@styles/components/leaderboard-card.module.css";

// types
import { AsyncReturnType } from "@libs/types";
import type { GetLeaderboard } from "@utils/getLeaderboard";

type PersonType = AsyncReturnType<GetLeaderboard>[number];
const LeaderboardCard: React.FC<{ person: PersonType }> = ({ person }) => {
  return (
    <li className={styles.card}>
      <span>{person.name}</span>
      <span>{person._count.vote}</span>
    </li>
  );
};

export default LeaderboardCard;
