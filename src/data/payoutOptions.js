const payoutOptions = {
  upi: {
    id: "upi",
    name: "UPI",
    title: "UPI Cash Redemption",
    description:
      "Redeem your eligible VEs for cash directly through your UPI ID.",
    destinationLabel: "UPI ID",
    destinationType: "upi",

    rewards: [
      {
        amount: 10,
        requiredVEs: 2400,
      },
      {
        amount: 25,
        requiredVEs: 5800,
      },
      {
        amount: 50,
        requiredVEs: 11000,
      },
      {
        amount: 100,
        requiredVEs: 22000,
      },
    ],
  },

  amazon: {
    id: "amazon",
    name: "Amazon",
    title: "Amazon Rewards",
    description:
      "Redeem your eligible VEs for Amazon rewards delivered to your email.",
    destinationLabel: "Email Address",
    destinationType: "email",

    rewards: [
      {
        amount: 10,
        requiredVEs: 2400,
      },
      {
        amount: 25,
        requiredVEs: 5800,
      },
      {
        amount: 50,
        requiredVEs: 11000,
      },
      {
        amount: 100,
        requiredVEs: 22000,
      },
    ],
  },

  googlePlay: {
    id: "googlePlay",
    name: "Google Play",
    title: "Google Play Rewards",
    description:
      "Redeem your eligible VEs for Google Play rewards delivered to your email.",
    destinationLabel: "Email Address",
    destinationType: "email",

    rewards: [
      {
        amount: 10,
        requiredVEs: 2400,
      },
      {
        amount: 25,
        requiredVEs: 5800,
      },
      {
        amount: 50,
        requiredVEs: 11000,
      },
      {
        amount: 100,
        requiredVEs: 22000,
      },
    ],
  },
};

export default payoutOptions;