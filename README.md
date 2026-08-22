# VELOOP Rewards Payout

A premium fintech-style rewards redemption interface built as part of the VELOOP internship task.

The application allows users to redeem their earned rewards through supported payout methods with eligibility checks, validation, confirmation, processing, success, error, and insufficient-balance states.

---

## 🚀 Project Overview

VELOOP Rewards Payout is a responsive web application designed to provide a smooth and intuitive reward redemption experience.

The interface focuses on:

- Premium fintech-style UI
- Clear reward information
- Payout method selection
- Reward eligibility
- Secure validation
- Confirmation before redemption
- Processing feedback
- Success and error states
- Responsive mobile experience

---

## 💳 Supported Payout Methods

The application supports:

- UPI
- Amazon
- Google Play

Each payout method has its own validation and redemption flow.

---

## ✨ Features

### Balance

- VEs balance
- SVEs balance
- Estimated reward value
- Refresh balance action
- Balance information action

### Reward Selection

- ₹10
- ₹25
- ₹50
- ₹100

Users can select an available reward based on their current VEs balance.

### Eligibility

The application checks whether the user has enough VEs to redeem the selected reward.

### Validation

#### UPI

- UPI ID input
- UPI validation
- Invalid input handling

#### Amazon / Google Play

- Email input
- Email validation
- Invalid input handling

### Redemption Flow

```text
Select Payout Method
        ↓
Select Reward
        ↓
Check Eligibility
        ↓
Enter Payout Details
        ↓
Validate Details
        ↓
Review Redemption
        ↓
Confirm
        ↓
Processing
        ↓
Success / Error