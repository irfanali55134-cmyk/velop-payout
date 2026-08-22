import {
  AlertCircle,
  ArrowLeft,
  Wallet,
} from "lucide-react";

import styles from "./InsufficientBalance.module.css";

function InsufficientBalance({
  availableVEs,
  requiredVEs,
  rewardAmount,
  onChooseAnother,
  onViewWallet,
}) {
  const shortage = Math.max(
    requiredVEs - availableVEs,
    0
  );

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <AlertCircle size={34} />
        </div>

        <span className={styles.label}>
          INSUFFICIENT BALANCE
        </span>

        <h2>Not Enough VEs</h2>

        <p className={styles.description}>
          You don't have enough VEs to redeem this reward.
          Choose a smaller reward or earn more VEs.
        </p>

        <div className={styles.balanceBox}>
          <div>
            <span>Required</span>
            <strong>
              {requiredVEs.toLocaleString()} VEs
            </strong>
          </div>

          <div>
            <span>Available</span>
            <strong className={styles.available}>
              {availableVEs.toLocaleString()} VEs
            </strong>
          </div>

          <div>
            <span>Shortage</span>
            <strong className={styles.shortage}>
              {shortage.toLocaleString()} VEs
            </strong>
          </div>
        </div>

        <div className={styles.reward}>
          <span>Selected Reward</span>
          <strong>₹{rewardAmount}</strong>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onChooseAnother}
          >
            <ArrowLeft size={17} />
            Choose Another Reward
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onViewWallet}
          >
            <Wallet size={17} />
            View Wallet
          </button>
        </div>
      </div>
    </section>
  );
}

export default InsufficientBalance;