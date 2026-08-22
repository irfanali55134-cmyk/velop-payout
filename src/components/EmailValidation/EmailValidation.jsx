import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import styles from "./EmailValidation.module.css";

function EmailValidation({
  value,
  onChange,
  onContinue,
  method = "amazon",
}) {
  const trimmedValue = value.trim();

  const isValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);

  const hasValue = trimmedValue.length > 0;

  const showValid = hasValue && isValid;
  const showInvalid = hasValue && !isValid;

  const methodName =
    method === "googlePlay" ? "Google Play" : "Amazon";

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.heading}>
          <div>
            <span>EMAIL VALIDATION</span>
            <h2>Enter Your Email</h2>
          </div>

          <span className={styles.method}>
            {methodName}
          </span>
        </div>

        <label htmlFor="reward-email">
          Email Address
        </label>

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
            id="reward-email"
            type="email"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="username@gmail.com"
            autoComplete="email"
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
            <span>Email looks good.</span>
          </div>
        )}

        {showInvalid && (
          <div className={styles.errorMessage}>
            <XCircle size={15} />
            <span>
              Please enter a valid email address.
            </span>
          </div>
        )}

        {!hasValue && (
          <p className={styles.helper}>
            Your reward will be delivered to this email
            address.
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

export default EmailValidation;