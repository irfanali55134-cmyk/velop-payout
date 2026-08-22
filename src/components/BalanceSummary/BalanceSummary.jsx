import { RefreshCw, Info } from "lucide-react";
import styles from "./BalanceSummary.module.css";

function BalanceSummary() {
  return (
    <section className={styles.balanceCard}>

      {/* =========================
          HEADER
      ========================= */}

      <div className={styles.header}>
        <div>
          <h2>Your Balance</h2>

          <p>
            Available rewards balance
          </p>
        </div>

        <div className={styles.actions}>

          <button
            type="button"
            aria-label="Refresh balance"
          >
            <RefreshCw size={18} />
          </button>

          <button
            type="button"
            aria-label="Balance information"
          >
            <Info size={18} />
          </button>

        </div>
      </div>


      {/* =========================
          BALANCES
      ========================= */}

      <div className={styles.balances}>

        {/* =========================
            VE BALANCE
        ========================= */}

        <div className={styles.balanceItem}>

          <div
            className={`${styles.icon} ${styles.veIcon}`}
          >
            <div className={styles.coinInner}>
              <span>V</span>
            </div>

            <div className={styles.coinShine} />
          </div>


          <div>
            <span>
              VEs Balance
            </span>

            <strong>
              3,850{" "}
              <small>
                VEs
              </small>
            </strong>

            <p>
              ≈ ₹385 Estimated Value
            </p>
          </div>

        </div>


        {/* =========================
            DIVIDER
        ========================= */}

        <div
          className={styles.divider}
        />


        {/* =========================
            SVE BALANCE
        ========================= */}

        <div className={styles.balanceItem}>

          <div
            className={`${styles.icon} ${styles.sveIcon}`}
          >
            <div className={styles.coinInner}>
              <span>S</span>
            </div>

            <div className={styles.coinShine} />
          </div>


          <div>
            <span>
              SVEs Balance
            </span>

            <strong>
              1,250{" "}
              <small>
                SVEs
              </small>
            </strong>

            <p>
              ≈ ₹125 Estimated Value
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default BalanceSummary;