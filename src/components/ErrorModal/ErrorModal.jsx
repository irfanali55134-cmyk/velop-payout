import {
  AlertTriangle,
  RefreshCw,
  X,
} from "lucide-react";

import styles from "./ErrorModal.module.css";

function ErrorModal({
  title = "Redemption Failed",
  message = "Something went wrong while processing your redemption.",
  referenceId,
  onRetry,
  onClose,
}) {
  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="error-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className={styles.errorIcon}>
          <AlertTriangle size={38} />
        </div>

        <div className={styles.heading}>
          <span>REDEMPTION ERROR</span>

          <h2 id="error-title">{title}</h2>

          <p>{message}</p>
        </div>

        <div className={styles.errorBox}>
          <div>
            <span>Error Code</span>
            <strong>REDEMPTION_FAILED</strong>
          </div>

          {referenceId && (
            <div>
              <span>Reference ID</span>
              <strong>{referenceId}</strong>
            </div>
          )}
        </div>

        <div className={styles.helpText}>
          Please try again. If the problem continues, keep
          the reference details and contact support.
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.closeAction}
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className={styles.retryButton}
            onClick={onRetry}
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;