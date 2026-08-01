import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const paymentGetwayList = [
  {
    value: "RAZORPAY",
    image: "/Payment/images.jpg", // If using public folder
    label: "Razorpay",
  },
  {
    value: "STRIPE",
    image: "/Payment/stripe.png",
    label: "Stripe",
  },
];

const Checkout = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => 
    setOpen(true);

  const handleClose = () => 
    setOpen(false);
  const [paymentGatway,setPaymentGatway] = React.useState("RAZORPAY")

  const handlePaymentChange = (event:any) =>{
    setPaymentGatway(event.target.value);
  }
  

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">

          {/* Address Section */}
          <div className="col-span-2 space-y-5">

            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-xl">
                Select Address
              </h1>

              <Button variant="contained" onClick={handleOpen}>
                Add New Address
              </Button>
            </div>

            <div className="text-xs font-medium space-y-5">
              <p>Saved Address</p>

              <div className="space-y-3">
                {[1, 1, 1].map((item, index) => (
                  <AddressCard key={index} />
                ))}
              </div>
            </div>

            <div className="py-4 px-5 rounded-md border border-dashed flex justify-center">
              <Button variant="outlined" onClick={handleOpen}>
                Add New Address
              </Button>
            </div>

          </div>

          {/* Pricing Section */}
          <div>
            <div>
              <div className="border rounded-md shadow-sm">

                <div className="space-y-3 border p-3 rounded-md">

                  <h2 className="text-primary-color font-medium pb-2 text-center">
                    Select Payment Gatway
                  </h2>

                  <div>
                    <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="radio-buttons-group"
                    className="flex justify-between"
                    onChange={handlePaymentChange}
                  >
                    {paymentGetwayList.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        className="border w-[48%] rounded-md m-1 flex justify-center items-center py-2"
                        label={
                          <img
                            className={`${
                              item.value === "STRIPE"
                                ? "w-16"
                                : "w-24"
                            } h-10 object-contain`}
                            src={item.image}
                            alt={item.label}
                          />
                        }
                      />
                    ))}
                  </RadioGroup>
                  </div>

                </div>

                <PricingCard />

                <div className="p-5">
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      py: "11px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Place Order
                  </Button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <AddressForm />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;