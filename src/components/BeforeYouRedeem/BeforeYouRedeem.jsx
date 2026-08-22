import {
  CheckCircle2,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

import styles from "./BeforeYouRedeem.module.css";

const steps = [
  {
    title: "Check your available VEs",
    description:
      "Make sure you have enough VEs for the reward you want to redeem.",
  },
  {
    title: "Select your desired reward",
    description:
      "Choose an eligible reward from the available redemption options.",
  },
  {
    title: "Verify your payout details",
    description:
      "Double-check your UPI ID or gift-card email address before continuing.",
  },
  {
    title: "Review the final deduction",
    description:
      "Confirm the VE requirement and make sure the deduction is correct.",
  },
  {
    title: "Confirm the redemption",
    description:
      "Review all details carefully before submitting your redemption request.",
  },
];

function BeforeYouRedeem() {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <ClipboardCheck size={21} />
        </div>

        <div className={styles.heading}>
          <span>BEFORE YOU REDEEM</span>

          <h2>Review Before Submission</h2>

          <p>
            A quick checklist to make sure everything is
            correct before you redeem.
          </p>
        </div>

        <button
          type="button"
          className={`${styles.toggleButton} ${
            open ? styles.open : ""
          }`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle redemption checklist"
        >
          <ChevronDown size={18} />
        </button>
      </div>

      <div
        className={`${styles.content} ${
          open ? styles.contentOpen : ""
        }`}
      >
        <div className={styles.list}>
          {steps.map((step, index) => (
            <div
              className={styles.step}
              key={step.title}
            >
              <div className={styles.stepIcon}>
                <CheckCircle2 size={17} />
              </div>

              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>
                  <span className={styles.number}>
                    {index + 1}
                  </span>

                  <h3>{step.title}</h3>
                </div>

                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BeforeYouRedeem;