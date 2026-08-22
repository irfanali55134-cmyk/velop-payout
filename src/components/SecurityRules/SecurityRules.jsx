import {
  Clock3,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import styles from "./SecurityRules.module.css";

const rules = [
  {
    icon: LockKeyhole,
    title: "Secure Withdrawal",
    description:
      "Your withdrawal details and redemption request are protected with secure processing.",
  },
  {
    icon: Clock3,
    title: "Withdrawal within 24hrs",
    description:
      "Once approved, your withdrawal will be processed within 24 hours.",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Detection",
    description:
      "Advanced fraud detection helps keep your rewards and transactions safe.",
  },
];

function SecurityRules() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <span>SECURITY & PROTECTION</span>
          <h2>Safe & Secure Transactions</h2>
        </div>

        <ShieldCheck className={styles.headerIcon} />
      </div>

      <div className={styles.grid}>
        {rules.map((rule) => {
          const Icon = rule.icon;

          return (
            <article
              className={styles.rule}
              key={rule.title}
            >
              <div className={styles.icon}>
                <Icon size={23} />
              </div>

              <div className={styles.content}>
                <h3>{rule.title}</h3>

                <p>{rule.description}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.footer}>
        <ShieldCheck size={16} />

        <span>
          Your redemption information is handled securely.
        </span>
      </div>
    </section>
  );
}

export default SecurityRules;