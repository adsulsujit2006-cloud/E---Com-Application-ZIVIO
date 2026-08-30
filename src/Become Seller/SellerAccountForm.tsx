
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";


const steps = [
    "Tax Details & Mobile",
    "Pickup Address",
    "Bank Details",
    "Supplier Details"
];

const SellerAccountForm = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleStep = (value: number) => () => {

        // Next step
        if (value === 1) {
            if (activeStep < steps.length ) {
                setActiveStep(activeStep + value);
            } else {
                handleCreateAccount();
            }
        }

        // Previous step
        if (value === -1) {
            if (activeStep > 0) {
                setActiveStep(activeStep + value);
            }
        }

        console.log("Active step : ", activeStep);
    };

    const handleCreateAccount = () => {
        console.log("create account");
    };

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            <section>


            </section>

            <div className="flex items-center justify-between">

                <Button
                    onClick={handleStep(-1)}
                    variant="contained"
                    disabled={activeStep == 0}
                >
                    Back
                </Button>

                <Button
                    onClick={handleStep(1)}
                    variant="contained"
                >
                    {activeStep == (steps.length - 1)
                        ? "Create Account"
                        : "Continue"}
                </Button>

            </div>

            {/* Your existing Seller form code */}

        </div>
    );
};

export default SellerAccountForm;

