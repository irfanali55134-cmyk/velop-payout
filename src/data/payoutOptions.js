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
        requiredVEs: 10000,
      },
      {
        amount: 100,
        requiredVEs: 19500,
      },
      {
        amount: 150,
        requiredVEs: 28500,
      },
      {
        amount: 300,
        requiredVEs: 52500,
      },
      {
        amount: 500,
        requiredVEs: 80500,
      },
      {
        amount: 1000,
        requiredVEs: 150000,
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
        requiredVEs: 2500,
      },
      {
        amount: 25,
        requiredVEs: 5900,
      },
      {
        amount: 50,
        requiredVEs: 10500,
      },
      {
        amount: 100,
        requiredVEs: 19800,
      },
      {
        amount: 250,
        requiredVEs: 47000,
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
        requiredVEs: 2600,
      },
      {
        amount: 25,
        requiredVEs: 6000,
      },
      {
        amount: 50,
        requiredVEs: 11000,
      },
      {
        amount: 100,
        requiredVEs: 20500,
      },
      {
        amount: 150,
        requiredVEs: 30000,
      },
    ],
  },
};

export default payoutOptions;