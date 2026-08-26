import {
  Lock,
  Clock,
  Zap,
} from "lucide-react";

import styles from "./RewardOptionCard.module.css";

import upiLogo from "../../assets/payout/upi.jpg";
import amazonLogo from "../../assets/payout/amazon2.jpg";
import googlePlayLogo from "../../assets/payout/google-play.jpg";


function RewardOptionCard({
  amount,
  requiredVEs,
  selected,
  eligible = true,
  onSelect,
  payoutMethod = "upi",
  availableVEs = 0,
}) {

  const methods = {
    upi: {
      name: "UPI Transfer",
      subtitle: "Instant Bank Transfer",
      badge: "INSTANT",
      delivery: "Processing within 24 hours",
      logo: upiLogo,
      className: styles.upi,
    },

    amazon: {
      name: "Amazon Pay",
      subtitle: "Gift Card Balance",
      badge: "POPULAR",
      delivery: "Instant delivery",
      logo: amazonLogo,
      className: styles.amazon,
    },

    googlePlay: {
      name: "Google Play",
      subtitle: "App Store Credit",
      badge: "FAST",
      delivery: "Instant delivery",
      logo: googlePlayLogo,
      className: styles.googlePlay,
    },
  };


  const method =
    methods[payoutMethod] || methods.upi;


  const progress =
    requiredVEs > 0
      ? Math.min(
          100,
          Math.round(
            (availableVEs / requiredVEs) * 100
          )
        )
      : 0;


  const currentVEs = Math.min(
    availableVEs,
    requiredVEs
  );


  return (
    <div
      className={`${styles.cardWrap} ${method.className}`}
    >

      <button
        type="button"
        className={`
          ${styles.card}
          ${selected ? styles.selected : ""}
          ${!eligible ? styles.locked : ""}
        `}
        onClick={onSelect}
      >

        {/* TOP RIGHT DOTS */}

        <div className={styles.dots} />


        {/* CONTENT */}

        <div className={styles.cardContent}>

          {/* BADGE */}

          <div className={styles.badge}>

            <Zap
              size={14}
              strokeWidth={2.6}
            />

            <span>
              {method.badge}
            </span>

          </div>


          {/* MAIN ROW */}

          <div className={styles.mainRow}>

            {/* LEFT */}

            <div className={styles.leftContent}>

              <div className={styles.logoBox}>

                <img
                  src={method.logo}
                  alt={`${method.name} logo`}
                  className={styles.logo}
                />

              </div>


              <div className={styles.info}>

                <div className={styles.name}>
                  {method.name}
                </div>

                <div className={styles.subtitle}>
                  {method.subtitle}
                </div>

              </div>

            </div>


            {/* AMOUNT */}

            <div className={styles.amountBox}>

              <span className={styles.rupee}>
                ₹
              </span>

              <span>
                {amount}
              </span>

            </div>

          </div>


          {/* DELIVERY */}

          <div className={styles.delivery}>

            <Clock
              size={14}
              strokeWidth={2.2}
            />

            <span>
              {method.delivery}
            </span>

          </div>


          {/* VES */}

          <div className={styles.veRow}>

            <span className={styles.veCoin}>
              V
            </span>

            <span className={styles.currentVEs}>
              {currentVEs.toLocaleString()}
            </span>

            <span className={styles.of}>
              Of
            </span>

            <span className={styles.requiredVEs}>
              {requiredVEs.toLocaleString()}
            </span>

            <span className={styles.veText}>
              VEs
            </span>

          </div>


          {/* PROGRESS */}

          <div className={styles.progressTrack}>

            <div
              className={styles.progressBar}
              style={{
                width: `${progress}%`,
              }}
            />

          </div>


          {/* STATUS */}

          <div className={styles.status}>

            {eligible
              ? "Eligible to redeem"
              : "Not enough VEs"}

          </div>

        </div>


        {/* LOCK */}

        {!eligible && (
          <div className={styles.lock}>

            <Lock
              size={14}
              strokeWidth={2}
            />

          </div>
        )}

      </button>

    </div>
  );
}


export default RewardOptionCard;