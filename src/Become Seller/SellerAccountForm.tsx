import { Button, Step, StepLabel, Stepper, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFromStep2";
import BecomeSellerFromStep3 from "./BecomeSellerFromStep3";
import BecomeSellerFromStep4 from "./BecomeSellerFromStep4";
import { createSeller } from "../State/seller/sellerAuthSlice";

const steps = ["Tax Details & Mobile", "Pickup Address", "Bank Details", "Supplier Details"];

interface SellerAccountFormProps {
  onRegistered?: () => void; // passed from BecomeSeller
}

const SellerAccountForm = ({ onRegistered }: SellerAccountFormProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      pickupAddress: {
        name: "", mobile: "", pincode: "", address: "",
        locality: "", city: "", state: "",
      },
      bankDetails: { accountNumber: "", ifscCode: "", accountHolderName: "" },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "", businessEmail: "", businessMobile: "",
        logo: "", banner: "", businessAddress: "",
      },
      password: "",
    },
    onSubmit: () => handleCreateAccount(),
  });

  const handleCreateAccount = async () => {
    if (submitting) return;
    try {
      setSubmitting(true);
      const data = await dispatch(createSeller(formik.values)).unwrap();
      console.log("create account success", data);

      // Case 1: backend returns a token on register -> go straight to dashboard
      const jwt = data?.jwt || data?.token;
      if (jwt) {
        localStorage.setItem("sellerJwt", jwt);
        localStorage.setItem("sellerRegistered", "true");
        navigate("/seller", { replace: true });
        return;
      }

      // Case 2: no token -> show the login form
      localStorage.setItem("sellerRegistered", "true");
      onRegistered?.();
    } catch (error: any) {
      alert(typeof error === "string" ? error : error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStep = (value: number) => () => {
    if (value === 1) {
      if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
      else handleCreateAccount();
    }
    if (value === -1 && activeStep > 0) setActiveStep(activeStep - 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section className="mt-20 space-y-10">
        <div>
          {activeStep === 0 ? <BecomeSellerFormStep1 formik={formik} /> :
           activeStep === 1 ? <BecomeSellerFormStep2 formik={formik} /> :
           activeStep === 2 ? <BecomeSellerFromStep3 formik={formik} /> :
           activeStep === 3 ? <BecomeSellerFromStep4 formik={formik} /> : null}
        </div>

        <div className="flex items-center justify-between">
          <Button onClick={handleStep(-1)} variant="contained" disabled={activeStep === 0 || submitting}>
            Back
          </Button>
          <Button onClick={handleStep(1)} variant="contained" disabled={submitting}>
            {submitting ? <CircularProgress size={22} /> :
             activeStep === steps.length - 1 ? "Create Account" : "Continue"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;