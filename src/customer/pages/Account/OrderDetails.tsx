import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { OrderStepper } from "./orderStepper";
import { Payment } from "@mui/icons-material";

const OrderDetail = () => {
    const navigate = useNavigate();

    return (
        <Box>

            <section className="border rounded-lg p-5 shadow-sm bg-white">

                <div className="flex flex-col items-center">

                    <img
                        className="w-[220px] h-[250px] object-cover rounded-lg border"
                        src="/PDPhoto/p.2.png"
                        alt="Product"
                    />

                    <div className="mt-5 w-full space-y-3">

                        <h1 className="text-xl font-bold">
                            SZN
                        </h1>

                        <p className="text-gray-600 text-sm leading-6">
                            The blouse worn by the model might be for modelling purpose only.
                            Check the image of the blouse piece to understand how the actual
                            blouse piece looks like.
                        </p>

                        <p className="text-sm">
                            <strong>Size :</strong> Length: 5.5 metres plus 0.8 metre blouse piece
                            <br />
                            Width: 1.06 metres (approx.)
                        </p>

                        <Button
                            variant="contained"
                            onClick={() => navigate(`/reviews/${5}/create`)}
                        >
                            Write Review
                        </Button>

                    </div>

                </div>

            </section>

            <section className="border p-5">
                <OrderStepper orderStatus={"SHIPPED"} />
            </section>

            <div className="border p-5">
                <h1 className="font-bold pb-3">Delivery Address</h1>

                <div className="text-sm space-y-2">
                    <div className="flex gap-5 font-medium">
                        <p>{"Sujit"}</p>
                    </div>

                    <Divider flexItem orientation="vertical" />

                    <p>{9699567182}</p>
                </div>

                <p>Sant Tukaram Nagar, Pune, Maharashtra - 414103</p>
            </div>

            <div className="border space-y-4">
                <div className="flex justify-between text-sm pt-5 px-5">
                    <div className="space-y-1">
                        <p className="font-bold">Total Item Price</p>
                        <p>You saved<span className="text-green-500 font-medium text-xs">₹{699}.00</span>on this item</p>
                    </div>
                    <p className="font-medium">₹ {799}</p>

                </div>
                <div className="px-5">
                    <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
                        <Payment />
                        <p>Pay on Delivery</p>
                    </div>

                </div>
                <Divider/>
                <div className="px-5 pb-5">
                    <p className="text-xs"><strong>Sold by : </strong>{"SZN"}</p>


                </div>
                <div className="p-10">
                    <Button 
                    disabled={false}
                    color="error" sx={{py:"0.7rem"}} className="" variant="outlined"fullWidth>
                        {true?"order canceled":"cancle Order"}
                    </Button>

                </div>
            </div>

        </Box>
    );
};

export default OrderDetail;