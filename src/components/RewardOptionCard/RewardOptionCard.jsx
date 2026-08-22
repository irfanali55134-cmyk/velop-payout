import { Check } from "lucide-react";
import styles from "./RewardOptionCard.module.css";

function RewardOptionCard({
    amount,
    requiredVEs,
    selected,
    eligible = true,
    onSelect,
}) {
    const handleClick = () => {
        onSelect();
    };

    return (
        <button
            type="button"
            className={`${styles.card} ${
                selected ? styles.selected : ""
            } ${!eligible ? styles.locked : ""}`}
            onClick={handleClick}
        >
            {selected && (
                <span className={styles.check}>
                    <Check size={14} />
                </span>
            )}

            <div className={styles.amount}>
                ₹{amount}
            </div>

            <div className={styles.rewardType}>
                Cash
            </div>

            <div className={styles.required}>
                <span className={styles.veBadge}>
                    V
                </span>

                {requiredVEs.toLocaleString()} VEs
            </div>

            <div
                className={`${styles.status} ${
                    eligible
                        ? styles.eligible
                        : styles.notEligible
                }`}
            >
                {eligible
                    ? "✓ Eligible"
                    : "Not enough VEs"}
            </div>
        </button>
    );
}

export default RewardOptionCard;