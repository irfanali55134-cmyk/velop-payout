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
      name: "UPI Voucher",
      subtitle: "Instant Bank Transfer",
      badge: "INSTANT",
      delivery: "Instant Transfer",
      logo: upiLogo,
      className: styles.upi,
    },

    amazon: {
      name: "Amazon Pay Voucher",
      subtitle: "Gift Card Balance",
      badge: "POPULAR",
      delivery: "Instant Delivery",
      logo: amazonLogo,
      className: styles.amazon,
    },

    googlePlay: {
      name: "Google Play Voucher",
      subtitle: "App Store Credit",
      badge: "FAST",
      delivery: "Instant Delivery",
      logo: googlePlayLogo,
      className: styles.googlePlay,
    },
  };


  const method =
    methods[payoutMethod] || methods.upi;


  /* =====================================================
     PROGRESS CALCULATION
  ===================================================== */

  const progress =
    requiredVEs > 0
      ? Math.min(
          100,
          Math.round(
            (availableVEs / requiredVEs) * 100
          )
        )
      : 0;


  /* =====================================================
     CURRENT VES
  ===================================================== */

  const currentVEs = Math.min(
    availableVEs,
    requiredVEs
  );


  return (
    <button
      type="button"

      className={`
        ${styles.card}
        ${method.className}
        ${selected ? styles.selected : ""}
        ${!eligible ? styles.locked : ""}
      `}

      /*
        IMPORTANT:
        disabled={!eligible} intentionally removed.

        This allows an ineligible reward card to be clicked,
        so Payout.jsx can show the insufficient-balance state.
      */

      onClick={onSelect}
    >


      {/* =================================================
          TOP BADGE
      ================================================= */}

      <div className={styles.topRow}>

        <div className={styles.badge}>

          <Zap
            size={15}
            strokeWidth={2.7}
          />

          <span>
            {method.badge}
          </span>

        </div>


        {/* LOCK ICON */}

        {!eligible && (
          <div className={styles.lock}>

            <Lock
              size={14}
              strokeWidth={2}
            />

          </div>
        )}

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className={styles.mainContent}>


        {/* =================================================
            LOGO
        ================================================= */}

        <div className={styles.logoBox}>

          <img
            src={method.logo}
            alt={`${method.name} logo`}
            className={styles.logo}
          />

        </div>


        {/* =================================================
            INFORMATION
        ================================================= */}

        <div className={styles.info}>


          {/* AMOUNT */}

          <div className={styles.amountInline}>

            <span className={styles.rupee}>
              ₹
            </span>

            <span className={styles.amount}>
              {amount}
            </span>

          </div>


          {/* NAME */}

          <div className={styles.name}>
            {method.name}
          </div>


          {/* SUBTITLE */}

          <div className={styles.subtitle}>
            {method.subtitle}
          </div>


          {/* DELIVERY */}

          <div className={styles.delivery}>

            <Clock
              size={13}
              strokeWidth={2.4}
            />

            <span>
              {method.delivery}
            </span>

          </div>

        </div>


        {/* =================================================
            RIGHT SIDE - REQUIRED VES
        ================================================= */}

        <div className={styles.veSide}>


          <div className={styles.veSideLabel}>
            Required VEs
          </div>


          <div className={styles.veSideValue}>

            <span className={styles.veCoinSmall}>
              V
            </span>

            <span>
              {requiredVEs.toLocaleString()}
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          CURRENT VES / REQUIRED VES
      ================================================= */}

      <div className={styles.veRow}>

        <span className={styles.veCoin}>
          V
        </span>


        <span className={styles.current}>
          {currentVEs.toLocaleString()}
        </span>


        <span className={styles.of}>
          Of
        </span>


        <span className={styles.requiredVE}>
          {requiredVEs.toLocaleString()}
        </span>


        <span className={styles.veText}>
          VEs
        </span>

      </div>


      {/* =================================================
          PROGRESS BAR
      ================================================= */}

      <div className={styles.progressTrack}>

        <div
          className={styles.progressBar}

          style={{
            width: `${progress}%`,
          }}

        />

      </div>


      {/* =================================================
          STATUS
      ================================================= */}

      <div className={styles.status}>

        {eligible
          ? "Eligible to redeem"
          : "Not enough VEs"}

      </div>


    </button>
  );
}


export default RewardOptionCard;