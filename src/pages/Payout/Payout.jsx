import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";

import BalanceSummary from "../../components/BalanceSummary/BalanceSummary";
import PayoutMethodSelector from "../../components/PayoutMethodSelector/PayoutMethodSelector";
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
import SecurityRules from "../../components/SecurityRules/SecurityRules";
import FAQ from "../../components/FAQ/FAQ";
import RewardProgress from "../../components/RewardProgress/RewardProgress";
import BeforeYouRedeem from "../../components/BeforeYouRedeem/BeforeYouRedeem";
import PayoutMethodVisual from "../../components/PayoutMethodVisual/PayoutMethodVisual";

import heroImage from "../../assets/hero2.png";

import "./Payout.css";

function Payout() {
  /* =====================================================
     STATE
  ===================================================== */

  const [selectedMethod, setSelectedMethod] =
    useState("upi");

  const [selectedReward, setSelectedReward] =
    useState(null);

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

  const [upiValue, setUpiValue] = useState("");

  const [emailValue, setEmailValue] = useState("");


  /* =====================================================
     BALANCE
  ===================================================== */

  const availableVEs = 3850;


  /* =====================================================
     REWARDS
  ===================================================== */

  const rewards = [
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
  ];


  /* =====================================================
     URL METHOD
  ===================================================== */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const method = params.get("method");

    const validMethods = [
      "upi",
      "amazon",
      "googlePlay",
    ];

    if (validMethods.includes(method)) {
      setSelectedMethod(method);
    }
  }, []);


  /* =====================================================
     UPDATE URL
  ===================================================== */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    if (
      params.get("method") === selectedMethod
    ) {
      return;
    }

    params.set(
      "method",
      selectedMethod
    );

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, [selectedMethod]);


  /* =====================================================
     NEXT REWARD
  ===================================================== */

  const nextReward = rewards.find(
    (reward) =>
      availableVEs <
      reward.requiredVEs
  );


  /* =====================================================
     METHOD CHANGE
  ===================================================== */

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


  /* =====================================================
     REWARD SELECT
  ===================================================== */

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


  /* =====================================================
     CONTINUE
  ===================================================== */

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


  /* =====================================================
     REDEMPTION CONTINUE
  ===================================================== */

  const handleRedemptionContinue = () => {
    setShowRedemptionPage(false);
    setShowValidation(true);
  };


  /* =====================================================
     VALIDATION CONTINUE
  ===================================================== */

  const handleValidationContinue = () => {
    setShowValidation(false);
    setShowConfirmation(true);
  };


  /* =====================================================
     BACK
  ===================================================== */

  const handleBackToRewards = () => {

    setShowRedemptionPage(false);
    setShowValidation(false);
    setShowConfirmation(false);
    setShowProcessing(false);
  };


  const handleBackToValidation = () => {

    setShowConfirmation(false);
    setShowValidation(true);
  };


  /* =====================================================
     CONFIRM
  ===================================================== */

  const handleConfirmRedemption = () => {

    setShowConfirmation(false);
    setShowProcessing(true);
  };


  /* =====================================================
     PROCESSING
  ===================================================== */

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


  /* =====================================================
     SUCCESS
  ===================================================== */

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


  /* =====================================================
     DESTINATION
  ===================================================== */

  const destination =
    selectedMethod === "upi"
      ? upiValue
      : emailValue;


  /* =====================================================
     REDEMPTION PAGE
  ===================================================== */

  if (showRedemptionPage) {

    return (
      <>
        <Navbar />

        <div className="payout-page">

          <RedemptionPage
            method={selectedMethod}
            reward={selectedReward}
            onBack={handleBackToRewards}
            onContinue={
              handleRedemptionContinue
            }
          />

        </div>
      </>
    );
  }


  /* =====================================================
     VALIDATION PAGE
  ===================================================== */

  if (showValidation) {

    return (
      <>
        <Navbar />

        <div className="payout-page">

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

        </div>
      </>
    );
  }


  /* =====================================================
     MAIN PAGE
  ===================================================== */

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />


      {/* =================================================
          PAYOUT PAGE
      ================================================= */}

      <div className="payout-page">


        {/* =================================================
            HERO BANNER
        ================================================= */}

        <section className="payout-hero">

          <div className="hero-background-glow" />

          <div className="hero-content">

            <h1>
              Redeem Your{" "}
              <span>
                Rewards
              </span>
            </h1>

            <p>
              Turn your earned VEs and SVEs
              into real rewards through your
              preferred payout method.
            </p>

          </div>


          {/* =========================
              HERO IMAGE
          ========================= */}

          <div className="hero-image-wrapper">

            <img
              src={heroImage}
              alt="VELOOP Rewards"
              className="hero-image"
            />

            <div
              className="coin-glow coin-glow-one"
            />

            <div
              className="coin-glow coin-glow-two"
            />

          </div>

        </section>


        {/* =================================================
            BALANCE
        ================================================= */}

        <div className="balance-wrapper">

          <BalanceSummary />

        </div>


        {/* =================================================
            PAYOUT METHOD
        ================================================= */}

        <div className="payout-method-wrapper">

          <PayoutMethodSelector
            selectedMethod={
              selectedMethod
            }
            onSelect={
              handleMethodChange
            }
          />

        </div>


        {/* =================================================
            METHOD VISUAL
        ================================================= */}

        <PayoutMethodVisual
          method={selectedMethod}
        />


        {/* =================================================
            REWARDS
        ================================================= */}

        <section className="rewards-section">

          <div className="section-heading">

            <h2>
              Select Reward
            </h2>

            <p>
              Choose the reward you want
              to redeem.
            </p>

          </div>


          <div className="reward-grid">

            {rewards.map((reward) => {

              const eligible =
                availableVEs >=
                reward.requiredVEs;

              return (
                <RewardOptionCard
                  key={reward.amount}
                  amount={reward.amount}
                  requiredVEs={
                    reward.requiredVEs
                  }
                  eligible={eligible}
                  selected={
                    selectedReward?.amount ===
                    reward.amount
                  }
                  onSelect={() =>
                    handleRewardSelect(
                      reward
                    )
                  }
                />
              );

            })}

          </div>


          {/* =========================
              PROGRESS
          ========================= */}

          {nextReward && (
            <RewardProgress
              availableVEs={
                availableVEs
              }
              nextReward={
                nextReward
              }
            />
          )}


          {/* =========================
              BEFORE REDEEM
          ========================= */}

          <BeforeYouRedeem />


          {/* =========================
              CONTINUE
          ========================= */}

          <button
            type="button"
            className="continue-button"
            disabled={
              !selectedReward ||
              availableVEs <
                selectedReward.requiredVEs
            }
            onClick={
              handleRewardContinue
            }
          >
            Continue →
          </button>

        </section>


        {/* =================================================
            SECURITY
        ================================================= */}

        <SecurityRules />


        {/* =================================================
            FAQ
        ================================================= */}

        <FAQ />


        {/* =================================================
            CONFIRMATION MODAL
        ================================================= */}

        {showConfirmation &&
          selectedReward && (

            <ConfirmationModal
              method={
                selectedMethod
              }
              reward={
                selectedReward
              }
              availableVEs={
                availableVEs
              }
              destination={
                destination
              }
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
              method={
                selectedMethod
              }
              reward={
                selectedReward
              }
              destination={
                destination
              }
            />

          )}


        {/* =================================================
            SUCCESS
        ================================================= */}

        {showSuccess &&
          selectedReward && (

            <SuccessModal
              method={
                selectedMethod
              }
              reward={
                selectedReward
              }
              destination={
                destination
              }
              onClose={
                handleSuccessClose
              }
              onViewWallet={() => {
                console.log(
                  "View Wallet"
                );
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
              availableVEs={
                availableVEs
              }
              requiredVEs={
                selectedReward.requiredVEs
              }
              rewardAmount={
                selectedReward.amount
              }
              onChooseAnother={() => {

                setShowInsufficient(
                  false
                );

                setSelectedReward(
                  null
                );

              }}
              onViewWallet={() => {
                setShowInsufficient(
                  false
                );
              }}
            />

          )}


        {/* =================================================
            PAYPAL UNAVAILABLE
        ================================================= */}

        {showPaypalUnavailable && (

          <PayPalUnavailable
            onClose={() => {
              setShowPaypalUnavailable(
                false
              );
            }}
          />

        )}

      </div>
    </>
  );
}

export default Payout;