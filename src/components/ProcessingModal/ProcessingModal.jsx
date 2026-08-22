import {
  Clock3,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

import styles from "./ProcessingModal.module.css";

function ProcessingModal({
  method,
  reward,
  destination,
}) {
  const methodName =
    method === "upi"
      ? "UPI"
      : method === "amazon"
      ? "Amazon Gift Card"
      : method === "googlePlay"
      ? "Google Play Gift Card"
      : method;

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="processing-title"
      >
        <div className={styles.loader}>
          <LoaderCircle
            size={42}
            className={styles.spinner}
          />
        </div>

        <div className={styles.heading}>
          <span>REDEMPTION PROCESSING</span>

          <h2 id="processing-title">
            Processing Your Redemption
          </h2>

          <p>
            Your redemption request is being processed.
            Please wait while we complete the request.
          </p>
        </div>

        <div className={styles.details}>
          <div className={styles.row}>
            <span>Reward</span>

            <strong>
              ₹{reward?.amount}
            </strong>
          </div>

          <div className={styles.row}>
            <span>Payout Method</span>

            <strong>{methodName}</strong>
          </div>

          {destination && (
            <div className={styles.row}>
              <span>Destination</span>

              <strong className={styles.destination}>
                {destination}
              </strong>
            </div>
          )}
        </div>

        <div className={styles.status}>
          <Clock3 size={15} />

          <span>
            This may take a few moments...
          </span>
        </div>

        <div className={styles.security}>
          <ShieldCheck size={15} />

          <span>
            Your redemption is being processed securely.
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProcessingModal;