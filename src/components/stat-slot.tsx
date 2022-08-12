import styles from "@styles/components/stat-slot.module.css";

type StatSlotProps = {
  stat: string;
  value: number;
};

const StatSlot: React.FC<StatSlotProps> = props => {
  const fill = Array(props.value).fill(0);

  return (
    <li className={styles.stat_slot} data-stat-type={props.stat}>
      <div className={styles.stat_name}>{props.stat}</div>
      <div className={styles.stat_bar_wrapper}>
        {[1, 2, 3, 4, 5].map(b => {
          if (fill.length >= b) {
            return <span key={b} className={styles.stat_bar} data-index={b} />;
          } else {
            return (
              <span key={b} className={styles.stat_bar_empty} data-index={b} />
            );
          }
        })}
      </div>
    </li>
  );
};

export default StatSlot;
