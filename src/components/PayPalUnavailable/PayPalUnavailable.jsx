import { Lock } from "lucide-react";
import { FaPaypal } from "react-icons/fa6";
import styles from "./PayPalUnavailable.module.css";

function PayPalUnavailable({ onClose }) {
    return (
        <section className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.icon}>
                    <FaPaypal className={styles.paypal} />
                    <Lock size={14} className={styles.lock} />
                </div>

                <span className={styles.label}>
                    PAYPAL
                </span>

                <h2>Coming Soon</h2>

                <p>
                    PayPal redemption is currently unavailable.
                    We're working to make this payout option
                    available soon.
                </p>

                <div className={styles.status}>
                    <Lock size={15} />
                    <span>Currently Unavailable</span>
                </div>

                <button
                    type="button"
                    className={styles.button}
                    onClick={onClose}
                >
                    Choose Another Method
                </button>
            </div>
        </section>
    );
}

export default PayPalUnavailable;