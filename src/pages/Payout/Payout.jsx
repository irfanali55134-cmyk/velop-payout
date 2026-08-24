import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";

import BalanceSummary from "../../components/BalanceSummary/BalanceSummary";
import PayoutMethodSelector from "../../components/PayoutMethodSelector/PayoutMethodSelector";
import PayoutMethodVisual from "../../components/PayoutMethodVisual/PayoutMethodVisual";
import RewardOptionCard from "../../components/RewardOptionCard/RewardOptionCard";

import RedemptionPage from "../../components/RedemptionPage/RedemptionPage";
import UPIValidation from "../../components/UPIValidation/UPIValidation";
import EmailValidation from "../../components/EmailValidation/EmailValidation";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import ProcessingModal from "../../components/ProcessingModal/ProcessingModal";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import InsufficientBalance from "../../components/InsufficientBalance/InsufficientBalance";
import PayPalUnavailable from "../../components/PayPalUnavailable/PayPalUnavailable";

import payoutOptions from "../../data/payoutOptions";

import "./Payout.css";


/* =========================================================
   GET PAYOUT METHOD FROM URL
========================================================= */

function getMethodFromURL() {
  const params = new URLSearchParams(
    window.location.search
  );

  const method = params.get("method");

  if (
    method === "upi" ||
    method === "amazon" ||
    method === "googlePlay"
  ) {
    return method;
  }

  return "upi";
}


function Payout() {
  /* =========================================================
     BALANCE
  ========================================================= */

  const availableVEs = 3850;


  /* =========================================================
     SELECTED PAYOUT METHOD
  ========================================================= */

  const [selectedMethod, setSelectedMethod] =
    useState(getMethodFromURL);


  /* =========================================================
     SELECTED REWARD
  ========================================================= */

  const [selectedReward, setSelectedReward] =
    useState(null);


  /* =========================================================
     FLOW STATES
  ========================================================= */

  const [showRedemptionPage, setShowRedemptionPage] =
    useState(false);

  const [showValidation, setShowValidation] =
    useState(false);

  const [showConfirmation, setShowConfirmation] =
    useState(false);

  const [showProcessing, setShowProcessing] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [showError, setShowError] =
    useState(false);

  const [showInsufficient, setShowInsufficient] =
    useState(false);

  const [showPaypalUnavailable, setShowPaypalUnavailable] =
    useState(false);


  /* =========================================================
     PAYOUT DETAILS
  ========================================================= */

  const [upiValue, setUpiValue] =
    useState("");

  const [emailValue, setEmailValue] =
    useState("");


  /* =========================================================
     CURRENT PAYOUT
  ========================================================= */

  const currentPayout =
    payoutOptions[selectedMethod] ||
    payoutOptions.upi;

  const rewards =
    currentPayout?.rewards || [];


  /* =========================================================
     KEEP URL IN SYNC
  ========================================================= */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const currentMethod =
      params.get("method");

    if (currentMethod !== selectedMethod) {
      params.set(
        "method",
        selectedMethod
      );

      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }
  }, [selectedMethod]);


  /* =========================================================
     CHANGE PAYOUT METHOD
  ========================================================= */

  const handleMethodChange = (method) => {
    if (method === "paypal") {
      setShowPaypalUnavailable(true);
      return;
    }

    setSelectedMethod(method);

    setSelectedReward(null);

    setShowRedemptionPage(false);
    setShowValidation(false);
    setShowConfirmation(false);
    setShowProcessing(false);
    setShowSuccess(false);
    setShowError(false);
    setShowInsufficient(false);

    setUpiValue("");
    setEmailValue("");
  };


  /* =========================================================
     SELECT REWARD
  ========================================================= */

  const handleRewardSelect = (reward) => {
    const eligible =
      availableVEs >=
      reward.requiredVEs;

    setSelectedReward(reward);

    if (!eligible) {
      setShowInsufficient(true);
      return;
    }

    setShowInsufficient(false);
  };


  /* =========================================================
     CONTINUE REWARD
  ========================================================= */

  const handleRewardContinue = () => {
    if (!selectedReward) {
      return;
    }

    const eligible =
      availableVEs >=
      selectedReward.requiredVEs;

    if (!eligible) {
      setShowInsufficient(true);
      return;
    }

    setShowRedemptionPage(true);
  };


  /* =========================================================
     CONTINUE REDEMPTION DETAILS
  ========================================================= */

  const handleRedemptionContinue = () => {
    setShowRedemptionPage(false);
    setShowValidation(true);
  };


  /* =========================================================
     CONTINUE VALIDATION
  ========================================================= */

  const handleValidationContinue = () => {
    setShowValidation(false);
    setShowConfirmation(true);
  };


  /* =========================================================
     BACK TO REWARDS
  ========================================================= */

  const handleBackToRewards = () => {
    setShowRedemptionPage(false);
    setShowValidation(false);
    setShowConfirmation(false);
    setShowProcessing(false);
  };


  /* =========================================================
     BACK TO VALIDATION
  ========================================================= */

  const handleBackToValidation = () => {
    setShowConfirmation(false);
    setShowValidation(true);
  };


  /* =========================================================
     CONFIRM REDEMPTION
  ========================================================= */

  const handleConfirmRedemption = () => {
    setShowConfirmation(false);
    setShowProcessing(true);
  };


  /* =========================================================
     PROCESSING
  ========================================================= */

  useEffect(() => {
    if (!showProcessing) {
      return;
    }

    const timer = setTimeout(() => {
      setShowProcessing(false);
      setShowSuccess(true);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [showProcessing]);


  /* =========================================================
     SUCCESS CLOSE
  ========================================================= */

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setShowProcessing(false);

    setSelectedReward(null);

    setShowRedemptionPage(false);
    setShowValidation(false);
    setShowConfirmation(false);
    setShowError(false);
    setShowInsufficient(false);

    setUpiValue("");
    setEmailValue("");
  };


  /* =========================================================
     DESTINATION
  ========================================================= */

  const destination =
    selectedMethod === "upi"
      ? upiValue
      : emailValue;


  /* =========================================================
     REDEMPTION PAGE
  ========================================================= */

  if (showRedemptionPage) {
    return (
      <>
        <Navbar />

        <main className="payout-page payout-flow-page">
          <RedemptionPage
            method={selectedMethod}
            reward={selectedReward}
            onBack={handleBackToRewards}
            onContinue={
              handleRedemptionContinue
            }
          />
        </main>
      </>
    );
  }


  /* =========================================================
     VALIDATION PAGE
  ========================================================= */

  if (showValidation) {
    return (
      <>
        <Navbar />

        <main className="payout-page payout-flow-page">
          {selectedMethod === "upi" ? (
            <UPIValidation
              value={upiValue}
              onChange={setUpiValue}
              onContinue={
                handleValidationContinue
              }
            />
          ) : (
            <EmailValidation
              value={emailValue}
              onChange={setEmailValue}
              method={selectedMethod}
              onContinue={
                handleValidationContinue
              }
            />
          )}
        </main>
      </>
    );
  }


  /* =========================================================
     MAIN PAYOUT PAGE
  ========================================================= */

  return (
    <>
      <Navbar />

      <main className="payout-page">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="payout-header">
          <div className="payout-header-content">

            <span className="payout-eyebrow">
              REWARDS PAYOUT
            </span>

            <h1>
              Redeem Your{" "}
              <span>Rewards</span>
            </h1>

            <p>
              Turn your earned VEs and SVEs
              into real rewards through your
              preferred payout method.
            </p>

          </div>
        </section>


        {/* =================================================
            BALANCE
        ================================================= */}

        <section className="balance-section">
          <BalanceSummary />
        </section>


        {/* =================================================
            PAYOUT METHOD
        ================================================= */}

        <section className="method-section">
          <PayoutMethodSelector
            selectedMethod={selectedMethod}
            onSelect={handleMethodChange}
          />
        </section>


        {/* =================================================
            METHOD VISUAL
        ================================================= */}

        <section className="method-visual-section">
          <PayoutMethodVisual
            method={selectedMethod}
          />
        </section>


        {/* =================================================
            REWARDS
        ================================================= */}

        <section className="rewards-section">

          <div className="rewards-heading">

            <div>
              <span className="section-eyebrow">
                AVAILABLE REWARDS
              </span>

              <h2>
                Choose Your Reward
              </h2>

              <p>
                Select an eligible reward
                based on your available VEs.
              </p>
            </div>

            <div className="reward-method-badge">
              {currentPayout?.name}
            </div>

          </div>


          {/* =================================================
              REWARD GRID
          ================================================= */}

          <div className="reward-grid">

            {rewards.map((reward) => {

              const eligible =
                availableVEs >=
                reward.requiredVEs;

              return (
                <RewardOptionCard
                  key={`${selectedMethod}-${reward.amount}`}
                  amount={reward.amount}
                  requiredVEs={
                    reward.requiredVEs
                  }
                  selected={
                    selectedReward?.amount ===
                    reward.amount
                  }
                  eligible={eligible}
                  onSelect={() =>
                    handleRewardSelect(
                      reward
                    )
                  }
                />
              );
            })}

          </div>


          {/* =================================================
              REDEEM BUTTON
          ================================================= */}

          <button
            type="button"
            className="redeem-button"
            disabled={
              !selectedReward ||
              availableVEs <
                selectedReward.requiredVEs
            }
            onClick={handleRewardContinue}
          >
            <span>
              Redeem Reward
            </span>

            <span className="redeem-arrow">
              →
            </span>
          </button>

        </section>


        {/* =================================================
            CONFIRMATION
        ================================================= */}

        {showConfirmation &&
          selectedReward && (
            <ConfirmationModal
              method={selectedMethod}
              reward={selectedReward}
              availableVEs={availableVEs}
              destination={destination}
              onCancel={
                handleBackToValidation
              }
              onConfirm={
                handleConfirmRedemption
              }
            />
          )}


        {/* =================================================
            PROCESSING
        ================================================= */}

        {showProcessing &&
          selectedReward && (
            <ProcessingModal
              method={selectedMethod}
              reward={selectedReward}
              destination={destination}
            />
          )}


        {/* =================================================
            SUCCESS
        ================================================= */}

        {showSuccess &&
          selectedReward && (
            <SuccessModal
              method={selectedMethod}
              reward={selectedReward}
              destination={destination}
              onClose={handleSuccessClose}
              onViewWallet={() => {
                setShowSuccess(false);
              }}
              onViewHistory={() => {
                console.log(
                  "View Redemption History"
                );
              }}
            />
          )}


        {/* =================================================
            ERROR
        ================================================= */}

        {showError && (
          <ErrorModal
            title="Redemption Failed"
            message="We couldn't process your redemption right now. Please try again."
            referenceId="ERR-7K29P"
            onRetry={() => {
              setShowError(false);
              setShowConfirmation(true);
            }}
            onClose={() => {
              setShowError(false);
            }}
          />
        )}


        {/* =================================================
            INSUFFICIENT BALANCE
        ================================================= */}

        {showInsufficient &&
          selectedReward && (
            <InsufficientBalance
              availableVEs={availableVEs}
              requiredVEs={
                selectedReward.requiredVEs
              }
              rewardAmount={
                selectedReward.amount
              }
              onChooseAnother={() => {
                setShowInsufficient(false);
                setSelectedReward(null);
              }}
              onViewWallet={() => {
                setShowInsufficient(false);
              }}
            />
          )}


        {/* =================================================
            PAYPAL UNAVAILABLE
        ================================================= */}

        {showPaypalUnavailable && (
          <PayPalUnavailable
            onClose={() => {
              setShowPaypalUnavailable(false);
            }}
          />
        )}

      </main>
    </>
  );
}

export default Payout;