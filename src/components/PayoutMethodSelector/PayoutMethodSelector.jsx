import { Check, Lock } from "lucide-react";

import {
  FaAmazon,
  FaPaypal,
  FaGooglePlay,
} from "react-icons/fa6";

import styles from "./PayoutMethodSelector.module.css";

const methods = [
  {
    id: "upi",
    name: "UPI",
    description: "Instant transfer to your bank account",
    icon: "UPI",
  },
  {
    id: "amazon",
    name: "Amazon",
    description: "Amazon Gift Card via email",
    icon: "AMAZON",
  },
  {
    id: "googlePlay",
    name: "Google Play",
    description: "Google Play Gift Card via email",
    icon: "PLAY",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Currently unavailable",
    icon: "PAYPAL",
    unavailable: true,
  },
];

function MethodIcon({ type }) {
  /* =========================
     UPI
  ========================= */

  if (type === "UPI") {
    return (
      <div className={styles.upiLogo}>
        <span className={styles.upiText}>UPI</span>
      </div>
    );
  }

  /* =========================
     AMAZON
  ========================= */

  if (type === "AMAZON") {
    return (
      <FaAmazon
        className={`${styles.brandIcon} ${styles.amazonBrand}`}
      />
    );
  }

  /* =========================
     GOOGLE PLAY
  ========================= */

  if (type === "PLAY") {
    return (
      <FaGooglePlay
        className={`${styles.brandIcon} ${styles.playBrand}`}
      />
    );
  }

  /* =========================
     PAYPAL
  ========================= */

  if (type === "PAYPAL") {
    return (
      <FaPaypal
        className={`${styles.brandIcon} ${styles.paypalBrand}`}
      />
    );
  }

  return null;
}

function PayoutMethodSelector({
  selectedMethod,
  onSelect,
}) {
  return (
    <section className={styles.wrapper}>
      {/* =========================
          HEADING
      ========================= */}

      <div className={styles.heading}>
        <div>
          <h2>Choose Payout Method</h2>

          <p>
            Select where you want to receive your reward.
          </p>
        </div>
      </div>

      {/* =========================
          METHOD GRID
      ========================= */}

      <div className={styles.grid}>
        {methods.map((method) => {
          const isSelected =
            selectedMethod === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={`${styles.card} ${
                isSelected
                  ? styles.selected
                  : ""
              } ${
                method.unavailable
                  ? styles.disabled
                  : ""
              }`}
            >
              {/* =========================
                  ICON
              ========================= */}

              <div className={styles.iconBox}>
                <MethodIcon type={method.icon} />
              </div>

              {/* =========================
                  CONTENT
              ========================= */}

              <div className={styles.content}>
                <div className={styles.titleRow}>
                  <h3>{method.name}</h3>

                  {/* Selected check */}

                  {isSelected &&
                    !method.unavailable && (
                      <span
                        className={styles.check}
                      >
                        <Check size={15} />
                      </span>
                    )}

                  {/* Coming Soon */}

                  {method.unavailable && (
                    <span
                      className={styles.comingSoon}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>

                <p>{method.description}</p>

                {/* Unavailable */}

                {method.unavailable && (
                  <div
                    className={styles.unavailable}
                  >
                    <Lock size={13} />

                    <span>
                      Currently unavailable
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default PayoutMethodSelector;