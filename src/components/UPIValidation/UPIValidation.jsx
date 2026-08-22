import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import styles from "./UPIValidation.module.css";

function UPIValidation({
  value,
  onChange,
  onContinue,
}) {
  const trimmedValue = value.trim();

  const isValid =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/.test(trimmedValue);

  const hasValue = trimmedValue.length > 0;

  const showValid = hasValue && isValid;
  const showInvalid = hasValue && !isValid;

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.heading}>
          <div>
            <span>UPI VALIDATION</span>
            <h2>Verify Your UPI ID</h2>
          </div>
        </div>

        <label htmlFor="upi-id">UPI ID</label>

        <div
          className={`${styles.inputWrapper} ${
            showValid
              ? styles.valid
              : showInvalid
              ? styles.invalid
              : ""
          }`}
        >
          <input
            id="upi-id"
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="username@upi"
            autoComplete="off"
          />

          {showValid && (
            <CheckCircle2
              size={19}
              className={styles.validIcon}
            />
          )}

          {showInvalid && (
            <XCircle
              size={19}
              className={styles.invalidIcon}
            />
          )}
        </div>

        {showValid && (
          <div className={styles.successMessage}>
            <CheckCircle2 size={15} />
            <span>UPI ID looks valid.</span>
          </div>
        )}

        {showInvalid && (
          <div className={styles.errorMessage}>
            <XCircle size={15} />
            <span>Please enter a valid UPI ID.</span>
          </div>
        )}

        {!hasValue && (
          <p className={styles.helper}>
            Example: username@upi, username@okaxis,
            username@ybl
          </p>
        )}

        <button
          type="button"
          className={styles.continueButton}
          disabled={!showValid}
          onClick={onContinue}
        >
          Continue
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}

export default UPIValidation;