import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import styles from "./RedemptionPage.module.css";

function RedemptionPage({
  method = "upi",
  reward,
  onBack,
  onContinue,
}) {
  const isUPI = method === "upi";

  const methodName =
    method === "upi"
      ? "UPI"
      : method === "amazon"
      ? "Amazon"
      : "Google Play";

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className={styles.header}>
          <div>
            <span className={styles.step}>STEP 1 OF 2</span>

            <h2>Enter Redemption Details</h2>

            <p>
              Provide the details where your reward should
              be delivered.
            </p>
          </div>

          <div className={styles.security}>
            <ShieldCheck size={20} />
            <span>Secure</span>
          </div>
        </div>

        <div className={styles.summary}>
          <div>
            <span>Selected Method</span>
            <strong>{methodName}</strong>
          </div>

          <div>
            <span>Reward</span>
            <strong>
              {reward ? `₹${reward.amount}` : "Selected Reward"}
            </strong>
          </div>

          <div>
            <span>Required</span>
            <strong>
              {reward
                ? `${reward.requiredVEs.toLocaleString()} VEs`
                : "--"}
            </strong>
          </div>
        </div>

        <div className={styles.form}>
          <label htmlFor="destination">
            {isUPI ? "UPI ID" : "Delivery Email"}
          </label>

          <div className={styles.inputWrapper}>
            {isUPI ? (
              <input
                id="destination"
                type="text"
                placeholder="example@upi"
              />
            ) : (
              <input
                id="destination"
                type="email"
                placeholder="Enter your email address"
              />
            )}
          </div>

          <p className={styles.helper}>
            {isUPI
              ? "Example: username@upi, username@okaxis or username@ybl"
              : "Your reward will be delivered to this email address."}
          </p>
        </div>

        <div className={styles.notice}>
          <ShieldCheck size={18} />

          <div>
            <strong>Keep your details accurate</strong>
            <p>
              Make sure the information you provide is correct
              before continuing with your redemption.
            </p>
          </div>
        </div>

        <button
          type="button"
          className={styles.continueButton}
          onClick={onContinue}
        >
          Continue
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

export default RedemptionPage;