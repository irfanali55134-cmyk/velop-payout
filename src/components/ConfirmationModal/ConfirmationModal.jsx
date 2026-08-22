import { AlertCircle, Check, X } from "lucide-react";
import styles from "./ConfirmationModal.module.css";

function ConfirmationModal({
  method,
  reward,
  availableVEs,
  destination,
  onCancel,
  onConfirm,
}) {
  if (!reward) return null;

  const remainingVEs =
    availableVEs - reward.requiredVEs;

  const methodName =
    method === "upi"
      ? "UPI"
      : method === "amazon"
      ? "Amazon"
      : "Google Play";

  const destinationLabel =
    method === "upi"
      ? "UPI ID"
      : "Delivery Email";

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.icon}>
            <AlertCircle size={22} />
          </div>

          <div className={styles.headerContent}>
            <span>FINAL STEP</span>

            <h2 id="confirmation-title">
              Confirm Redemption
            </h2>

            <p>
              Please review your redemption details
              before confirming.
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onCancel}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Redemption Summary */}
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Method</span>
            <strong>{methodName}</strong>
          </div>

          <div className={styles.summaryRow}>
            <span>Reward</span>
            <strong>₹{reward.amount}</strong>
          </div>

          <div className={styles.summaryRow}>
            <span>Required VEs</span>
            <strong>
              {reward.requiredVEs.toLocaleString()} VEs
            </strong>
          </div>

          <div className={styles.summaryRow}>
            <span>Available VEs</span>
            <strong>
              {availableVEs.toLocaleString()} VEs
            </strong>
          </div>

          <div className={styles.summaryRow}>
            <span>{destinationLabel}</span>
            <strong className={styles.destination}>
              {destination || "Not provided"}
            </strong>
          </div>

          <div className={`${styles.summaryRow} ${styles.remaining}`}>
            <span>After Redemption</span>

            <strong>
              {remainingVEs.toLocaleString()} VEs remaining
            </strong>
          </div>
        </div>

        {/* Security Notice */}
        <div className={styles.notice}>
          <Check size={17} />

          <p>
            Please make sure your redemption details are
            correct. Once submitted, the request will be
            processed according to the redemption rules.
          </p>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            Confirm & Redeem
            <Check size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;