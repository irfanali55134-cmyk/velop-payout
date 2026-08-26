import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";

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

import payoutOptions from "../../data/payoutOptions";

import upiBanner from "../../assets/payout/upi-banner-2.png";
import amazonBanner from "../../assets/payout/amazon-pay-banner-2.png";
import googlePlayBanner from "../../assets/payout/google-play-baannr-2.png";

import "./Payout.css";


/* =========================================================
   GET METHOD FROM URL
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

  return null;
}


/* =========================================================
   PAGE CONFIG
========================================================= */

const payoutPageConfig = {
  upi: {
    title: "UPI Payout",
    subtitle: "Instant bank transfer to your UPI ID",
    badge: "Instant",
    banner: upiBanner,
    rewardTitle: "Available Rewards",
    rewardDescription:
      "Redeem UPI rewards instantly and enjoy hassle-free withdrawals directly to your bank account.",
  },

  amazon: {
    title: "Amazon Pay Payout",
    subtitle:
      "Redeem your reward for Amazon Gift Cards",
    badge: "Popular",
    banner: amazonBanner,
    rewardTitle: "Available Rewards",
    rewardDescription:
      "Redeem your rewards for Amazon Gift Cards and withdraw instantly.",
  },

  googlePlay: {
    title: "Google Play Payout",
    subtitle:
      "Redeem your reward for Google Play Store Credit",
    badge: "Fast",
    banner: googlePlayBanner,
    rewardTitle: "Available Rewards",
    rewardDescription:
      "Redeem your rewards for Google Play Store Credit and enjoy unlimited entertainment.",
  },
};


/* =========================================================
   COMPONENT
========================================================= */

function Payout() {

  /* =========================================================
     BALANCE
  ========================================================= */

  const availableVEs = 3850;


  /* =========================================================
     SELECTED METHOD
  ========================================================= */

  const [selectedMethod, setSelectedMethod] =
    useState(getMethodFromURL);

    const [pageTransition, setPageTransition] =
  useState("none");

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
    selectedMethod
      ? payoutOptions[selectedMethod]
      : null;

  const rewards =
    currentPayout?.rewards || [];


  /* =========================================================
     PAGE CONFIG
  ========================================================= */

  const pageConfig =
    selectedMethod
      ? payoutPageConfig[selectedMethod]
      : null;


  /* =========================================================
     KEEP URL IN SYNC
  ========================================================= */

  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    );

    if (selectedMethod) {

      params.set(
        "method",
        selectedMethod
      );

    } else {

      params.delete("method");

    }

    const query =
      params.toString();

    const newUrl =
      query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;

    window.history.replaceState(
      {},
      "",
      newUrl
    );

  }, [selectedMethod]);


  /* =========================================================
     CHANGE PAYOUT METHOD
  ========================================================= */

  const handleMethodChange = (method) => {

  if (method === "paypal") {

    setShowPaypalUnavailable(true);

    return;
  }

  // Prevent multiple clicks during transition
  if (pageTransition !== "none") {
    return;
  }

  // Start exit animation
  setPageTransition("exit");

  setTimeout(() => {

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

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    // Start new page entrance animation
    requestAnimationFrame(() => {
      setPageTransition("enter");
    });

    // Remove animation state
    setTimeout(() => {
      setPageTransition("none");
    }, 500);

  }, 220);
};


  /* =========================================================
     BACK TO METHOD SELECTION
  ========================================================= */

  const handleBackToMethods = () => {

    setSelectedMethod(null);

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


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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


    const timer =
      setTimeout(() => {

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
     METHOD SELECTION PAGE
  ========================================================= */

  if (!selectedMethod) {

    return (
      <>
        <Navbar />

<main
  className={`payout-page payout-page-transition ${pageTransition}`}
>
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


          <section className="method-section">

            <PayoutMethodSelector
              selectedMethod={selectedMethod}
              onSelect={handleMethodChange}
            />


            {/* =================================================
                REDEMPTION BENEFITS
            ================================================= */}

            <section className="payout-benefits">

              <div className="benefit-card">

                <div className="benefit-icon">
                  ✓
                </div>

                <div className="benefit-content">

                  <h3>
                    Secure & Instant Redemption
                  </h3>

                  <p>
                    Your rewards are processed securely
                    and delivered to your selected
                    payout method.
                  </p>

                </div>

                <span className="benefit-arrow">
                  →
                </span>

              </div>


              <div className="benefit-grid">

                <div className="benefit-small-card">

                  <div className="small-benefit-icon">
                    ⚡
                  </div>

                  <div>

                    <h4>
                      Fast Processing
                    </h4>

                    <p>
                      Quick and reliable reward
                      processing.
                    </p>

                  </div>

                </div>


                <div className="benefit-small-card">

                  <div className="small-benefit-icon">
                    🛡
                  </div>

                  <div>

                    <h4>
                      Secure Rewards
                    </h4>

                    <p>
                      Your payout details remain
                      protected.
                    </p>

                  </div>

                </div>


                <div className="benefit-small-card">

                  <div className="small-benefit-icon">
                    ✓
                  </div>

                  <div>

                    <h4>
                      Easy Redemption
                    </h4>

                    <p>
                      Choose a method and redeem
                      your VEs easily.
                    </p>

                  </div>

                </div>

              </div>

            </section>


            {/* =================================================
                SECURITY RULES
            ================================================= */}

            <section className="security-rules">

              <div className="security-header">

                <div className="security-icon">
                  🛡
                </div>

                <div>

                  <span>
                    SECURITY RULES
                  </span>

                  <h2>
                    Safe & Secure Redemption
                  </h2>

                  <p>
                    Please keep these important points
                    in mind before redeeming your rewards.
                  </p>

                </div>

              </div>


              <div className="security-list">

                <div className="security-item">

                  <span>
                    01
                  </span>

                  <p>
                    Make sure your UPI ID or email
                    address is correct before confirming
                    your redemption.
                  </p>

                </div>


                <div className="security-item">

                  <span>
                    02
                  </span>

                  <p>
                    Never share your account password,
                    OTP or verification details with anyone.
                  </p>

                </div>


                <div className="security-item">

                  <span>
                    03
                  </span>

                  <p>
                    Once a reward has been processed,
                    it may not be possible to cancel or
                    reverse the redemption.
                  </p>

                </div>


                <div className="security-item">

                  <span>
                    04
                  </span>

                  <p>
                    Only eligible rewards can be redeemed
                    using your available VEs balance.
                  </p>

                </div>

              </div>

            </section>


            {/* =================================================
                FAQ
            ================================================= */}

            <section className="payout-faq">

              <div className="faq-heading">

                <span>
                  FAQ
                </span>

                <h2>
                  Frequently Asked Questions
                </h2>

                <p>
                  Everything you need to know about
                  reward redemption.
                </p>

              </div>


              <div className="faq-list">

                <details className="faq-item">

                  <summary>
                    How do I redeem my VEs?
                  </summary>

                  <p>
                    Select your preferred payout method,
                    choose an eligible reward and continue
                    with the redemption process.
                  </p>

                </details>


                <details className="faq-item">

                  <summary>
                    Why can't I redeem some rewards?
                  </summary>

                  <p>
                    A reward can only be redeemed when
                    your available VEs are equal to or
                    greater than the required VEs.
                  </p>

                </details>


                <details className="faq-item">

                  <summary>
                    Where will I receive my reward?
                  </summary>

                  <p>
                    UPI rewards are transferred to your
                    UPI ID, while Amazon and Google Play
                    rewards are delivered to your registered
                    email address.
                  </p>

                </details>


                <details className="faq-item">

                  <summary>
                    Can I change my payout method?
                  </summary>

                  <p>
                    Yes. Simply return to this page and
                    select another available payout method.
                  </p>

                </details>

              </div>

            </section>

          </section>

        </main>


        {showPaypalUnavailable && (

          <PayPalUnavailable
            onClose={() => {
              setShowPaypalUnavailable(false);
            }}
          />

        )}

      </>
    );
  }


  /* =========================================================
     METHOD-SPECIFIC PAYOUT PAGE
  ========================================================= */

  return (
    <>
      <Navbar />

     <main
  className={`
    payout-page
    payout-method-page
    payout-theme-${selectedMethod}
    payout-page-transition
    ${pageTransition}
  `}
>

        {/* =================================================
            METHOD HEADER
        ================================================= */}

        <section className="method-page-header">

          <button
            type="button"
            className="method-back-button"
            onClick={handleBackToMethods}
            aria-label="Back to payout methods"
          >
            ←
          </button>


          <div className="method-title-content">

            <div className="method-title-row">

              <h1>
                {pageConfig.title}
              </h1>

              <span className="method-badge">
                {pageConfig.badge}
              </span>

            </div>


            <p>
              {pageConfig.subtitle}
            </p>

          </div>

        </section>


        {/* =================================================
            METHOD BANNER
        ================================================= */}

        <section className="payout-method-banner">

          <img
            src={pageConfig.banner}
            alt={`${currentPayout.name} payout`}
          />

        </section>


        {/* =================================================
            REWARDS HEADING
        ================================================= */}

        <section className="rewards-section">

                    <div className="rewards-heading">

            <div className="rewards-heading-text">

              <span className="section-eyebrow">
                AVAILABLE VOUCHERS
              </span>

              <h2>
                {pageConfig.rewardTitle}
              </h2>

              <p>
                {pageConfig.rewardDescription}
              </p>

            </div>


            {/* =================================================
                VEs INFO BOX
            ================================================= */}

            <div className="ve-info-box">

              <span className="ve-info-icon">
                i
              </span>

              <p>
                VEs are the primary virtual
                <br />
                currency of VELOOP Rewards.
              </p>

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

                  payoutMethod={
                    selectedMethod
                  }

                  availableVEs={
                    availableVEs
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


          {/* =================================================
              REDEEM ACTION
          ================================================= */}

          <div className="redeem-action-card">

            <div className="redeem-security-icon">
              🔒
            </div>

            <div className="redeem-action-content">

              <h3>
                100% Secure Redemption
              </h3>

              <p>
                Your data and transactions are always protected.
              </p>

            </div>

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
                Redeem
              </span>

              <span className="redeem-arrow">
                →
              </span>

            </button>

          </div>

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
            onClose={
              handleSuccessClose
            }
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
