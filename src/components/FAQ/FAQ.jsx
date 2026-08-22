import { useState } from "react";
import { ChevronDown } from "lucide-react";

import styles from "./FAQ.module.css";

const faqs = [
  {
    question: "How many VEs do I need?",
    answer:
      "Each reward has its own VE requirement. You can see the required VEs directly on the reward card before selecting it.",
  },
  {
    question: "Can I change my payout details?",
    answer:
      "Yes. You can review and update your payout details before confirming the redemption.",
  },
  {
    question: "How long does redemption take?",
    answer:
      "Once your redemption is approved, the payout is processed within the expected processing period shown in the security information.",
  },
  {
    question: "What happens after I redeem?",
    answer:
      "After confirmation, your redemption request is submitted and you will see the redemption status and confirmation details.",
  },
  {
    question: "Can I cancel a redemption?",
    answer:
      "Review your redemption details carefully before confirming. Once a redemption is submitted, cancellation may not be available.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <div>
          <span>HELP & SUPPORT</span>
          <h2>Frequently Asked Questions</h2>
          <p>
            Everything you need to know about redeeming
            your rewards.
          </p>
        </div>
      </div>

      <div className={styles.list}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              className={`${styles.item} ${
                isOpen ? styles.open : ""
              }`}
              key={faq.question}
            >
              <button
                type="button"
                className={styles.question}
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>

                <ChevronDown
                  size={18}
                  className={styles.chevron}
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                className={styles.answerWrapper}
                aria-hidden={!isOpen}
              >
                <div className={styles.answer}>
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;