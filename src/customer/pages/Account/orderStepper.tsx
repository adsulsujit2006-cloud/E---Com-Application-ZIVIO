import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const steps = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  {
    name: "Packed",
    description: "Item Packed in Dispatch Warehouse",
    value: "CONFIRMED",
  },
  { name: "Shipped", description: "by Mon, 15 Jul", value: "SHIPPED" },
  { name: "Arriving", description: "by 16 Jul - 18 Jul", value: "ARRIVING" },
  { name: "Arrived", description: "by 16 Jul - 18 Jul", value: "DELIVERED" },
];

const cancledOrder = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  {
    name: "Order Canceled",
    description: "on Thu, 11 Jul",
    value: "CANCELLED",
  },
];

const currentStep = 2;

const OrderStep = ({ orderStatus }: any) => {
  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(cancledOrder);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  return null;
};

export const OrderStepper = ({ orderStatus }: any) => {
  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(cancledOrder);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  return (
    <Box>
      {statusStep.map((step, index) => (
        <React.Fragment key={index}>
          <div>
            <div className="flex items-start gap-4">
            <Box
              sx={{ zIndex: -1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                index <= currentStep
                  ? "bg-gray-200 text-teal-500"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step.value === orderStatus ? (
                <CheckCircleIcon sx={{ zIndex: -1 }} />
              ) : (
                <FiberManualRecordIcon sx={{ zIndex: -1 }} />
              )}
            </Box>

            <div>
              <h1 className="font-medium">{step.name}</h1>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>

          {  statusStep.length - 1 !=index && (
            <div
              className={`border h-20 w-[2px] ml-4 ${
                index < currentStep 
                ? "bg-primary-color" 
                : "bg-gray-300 text-gray-600"
              }`}
            >

            </div>
          )}
         
        </div>
          
        </React.Fragment>
      ))}
    </Box>
  );
};