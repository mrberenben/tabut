import styles from "@styles/components/leaderboard-card.module.css";

// types
import { AsyncReturnType } from "@libs/types";
import type { GetLeaderboard } from "@utils/getLeaderboard";

type PersonType = AsyncReturnType<GetLeaderboard>[number];
const LeaderboardCard: React.FC<{ person: PersonType }> = ({ person }) => {
  return <li className={styles.card}>{person.name}</li>;
};

export default LeaderboardCard;
