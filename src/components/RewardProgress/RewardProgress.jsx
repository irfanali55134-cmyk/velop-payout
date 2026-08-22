import { ArrowUpRight, Target } from "lucide-react";

import styles from "./RewardProgress.module.css";

function RewardProgress({
  availableVEs,
  nextReward,
}) {
  if (!nextReward) {
    return null;
  }

  const remaining = Math.max(
    nextReward.requiredVEs - availableVEs,
    0
  );

  const percentage = Math.min(
    Math.round(
      (availableVEs / nextReward.requiredVEs) * 100
    ),
    100
  );

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <Target size={19} />
        </div>

        <div className={styles.heading}>
          <span>NEXT REWARD</span>

          <h3>
            ₹{nextReward.amount} Reward
          </h3>
        </div>

        <div className={styles.percentage}>
          {percentage}%
        </div>
      </div>

      <div className={styles.progressInfo}>
        <span>
          {availableVEs.toLocaleString()} VEs
        </span>

        <span>
          {nextReward.requiredVEs.toLocaleString()} VEs
        </span>
      </div>

      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`Progress toward ₹${nextReward.amount} reward`}
      >
        <div
          className={styles.progressBar}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className={styles.footer}>
        <span>
          {remaining.toLocaleString()} VEs remaining
        </span>

        <span className={styles.rewardHint}>
          Keep earning
          <ArrowUpRight size={13} />
        </span>
      </div>
    </section>
  );
}

export default RewardProgress;