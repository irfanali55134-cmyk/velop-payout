import {
  ArrowRight,
  CreditCard,
  Mail,
  Smartphone,
  Wallet,
} from "lucide-react";

import {
  FaAmazon,
  FaGooglePlay,
  FaPaypal,
} from "react-icons/fa6";

import styles from "./PayoutMethodVisual.module.css";

function PayoutMethodVisual({ method }) {
  const data = {
    upi: {
      label: "UPI TRANSFER",
      title: "Instant Reward Transfer",
      description:
        "Your reward will be transferred directly to your UPI-linked bank account.",
      icon: Wallet,
      accent: "upi",
      destination: "Your UPI ID",
    },

    amazon: {
      label: "AMAZON GIFT CARD",
      title: "Digital Gift Card",
      description:
        "Your Amazon reward will be delivered to your email address.",
      icon: FaAmazon,
      accent: "amazon",
      destination: "Your Email",
    },

    googlePlay: {
      label: "GOOGLE PLAY",
      title: "Digital Gift Card",
      description:
        "Your Google Play reward will be delivered to your email address.",
      icon: FaGooglePlay,
      accent: "google",
      destination: "Your Email",
    },

    paypal: {
      label: "PAYPAL",
      title: "PayPal Reward",
      description:
        "PayPal redemption is currently unavailable.",
      icon: FaPaypal,
      accent: "paypal",
      destination: "PayPal",
    },
  };

  const current = data[method] || data.upi;

  const Icon = current.icon;

  return (
    <section
      className={`${styles.wrapper} ${styles[current.accent]}`}
    >
      <div className={styles.visual}>

        <div className={styles.mainIcon}>
          <Icon size={34} />
        </div>

        <div className={styles.flowLine}>
          <span />
          <ArrowRight size={17} />
        </div>

        <div className={styles.destinationIcon}>
          {method === "upi" ? (
            <CreditCard size={25} />
          ) : (
            <Mail size={25} />
          )}
        </div>

      </div>

      <div className={styles.content}>
        <span className={styles.label}>
          {current.label}
        </span>

        <h3>{current.title}</h3>

        <p>{current.description}</p>

        <div className={styles.destination}>
          <span>
            {method === "upi"
              ? "TRANSFER TO"
              : "DELIVERED TO"}
          </span>

          <strong>
            {current.destination}
          </strong>
        </div>
      </div>
    </section>
  );
}

export default PayoutMethodVisual;