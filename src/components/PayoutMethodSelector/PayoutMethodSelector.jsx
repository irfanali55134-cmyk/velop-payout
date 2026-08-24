import { Check, Lock } from "lucide-react";

import styles from "./PayoutMethodSelector.module.css";

import upiLogo from "../../assets/payout/upi.jpg";
import amazonLogo from "../../assets/payout/amazon2.jpg";
import googlePlayLogo from "../../assets/payout/google-play.jpg";
import paypalLogo from "../../assets/payout/paypal.jpg";


const methods = [
  {
    id: "upi",
    name: "UPI",
    description: "Instant transfer to your bank account",
    icon: upiLogo,
  },
  {
    id: "amazon",
    name: "Amazon",
    description: "Amazon Gift Card via email",
    icon: amazonLogo,
  },
  {
    id: "googlePlay",
    name: "Google Play",
    description: "Google Play Gift Card via email",
    icon: googlePlayLogo,
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Currently unavailable",
    icon: paypalLogo,
    unavailable: true,
  },
];


function MethodIcon({ method }) {
  return (
    <img
      src={method.icon}
      alt={`${method.name} logo`}
      className={`${styles.brandImage} ${
        method.id === "upi"
          ? styles.upiImage
          : method.id === "paypal"
          ? styles.paypalImage
          : ""
      }`}
    />
  );
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
                  LOGO
              ========================= */}

              <div className={styles.iconBox}>
                <MethodIcon method={method} />
              </div>


              {/* =========================
                  CONTENT
              ========================= */}

              <div className={styles.content}>

                <div className={styles.titleRow}>

                  <h3>{method.name}</h3>


                  {/* SELECTED CHECK */}

                  {isSelected &&
                    !method.unavailable && (
                      <span
                        className={styles.check}
                      >
                        <Check
                          size={15}
                          strokeWidth={2.5}
                        />
                      </span>
                    )}


                  {/* COMING SOON */}

                  {method.unavailable && (
                    <span
                      className={styles.comingSoon}
                    >
                      Coming Soon
                    </span>
                  )}

                </div>


                {/* DESCRIPTION */}

                <p>
                  {method.description}
                </p>


                {/* UNAVAILABLE */}

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