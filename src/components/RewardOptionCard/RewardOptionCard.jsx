import { Check, Lock } from "lucide-react";
import styles from "./RewardOptionCard.module.css";

function RewardOptionCard({
  amount,
  requiredVEs,
  selected,
  eligible = true,
  rewardType = "Reward",
  onSelect,
}) {
  return (
    <button
      type="button"
      className={`${styles.card} ${
        selected ? styles.selected : ""
      } ${!eligible ? styles.locked : ""}`}
      onClick={onSelect}
    >
      {selected && (
        <span className={styles.check}>
          <Check size={15} strokeWidth={2.5} />
        </span>
      )}

      <div className={styles.cardTop}>
        <div className={styles.amount}>
          ₹{amount}
        </div>

        {!eligible && (
          <Lock
            size={16}
            className={styles.lockIcon}
          />
        )}
      </div>

      <div className={styles.rewardType}>
        {rewardType}
      </div>

      <div className={styles.required}>
        <span className={styles.veCoin}>
          V
        </span>

        <span>
          {requiredVEs.toLocaleString()} VEs
        </span>
      </div>

      <div
        className={`${styles.status} ${
          eligible
            ? styles.eligible
            : styles.notEligible
        }`}
      >
        {eligible
          ? "Eligible to redeem"
          : "Not enough VEs"}
      </div>
    </button>
  );
}

export default RewardOptionCard;