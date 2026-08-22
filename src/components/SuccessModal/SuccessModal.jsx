import {
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";

import styles from "./SuccessModal.module.css";

function SuccessModal({
  method,
  reward,
  destination,
  referenceId = "VLR-8F3A7K",
  onClose,
  onViewWallet,
  onViewHistory,
}) {
  if (!reward) return null;

  const methodName =
    method === "upi"
      ? "UPI"
      : method === "amazon"
      ? "Amazon"
      : "Google Play";

  const rewardLabel =
    method === "upi"
      ? `₹${reward.amount} Cash`
      : `₹${reward.amount} ${methodName} Gift Card`;

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className={styles.successIcon}>
          <CheckCircle2 size={42} />
        </div>

        <div className={styles.heading}>
          <span>REDEMPTION COMPLETE</span>

          <h2 id="success-title">
            Redemption Successful!
          </h2>

          <p>
            Your request has been submitted successfully.
          </p>
        </div>

        <div className={styles.details}>
          <div className={styles.row}>
            <span>Method</span>
            <strong>{methodName}</strong>
          </div>

          <div className={styles.row}>
            <span>Reward</span>
            <strong>{rewardLabel}</strong>
          </div>

          <div className={styles.row}>
            <span>Reference ID</span>
            <strong>{referenceId}</strong>
          </div>

          {destination && (
            <div className={styles.row}>
              <span>
                {method === "upi"
                  ? "UPI ID"
                  : "Email"}
              </span>

              <strong className={styles.destination}>
                {destination}
              </strong>
            </div>
          )}

          <div className={styles.row}>
            <span>Status</span>

            <strong className={styles.status}>
              Completed
            </strong>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onViewWallet}
          >
            View Wallet
            <ExternalLink size={16} />
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onViewHistory}
          >
            View Redemption History
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;