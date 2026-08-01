import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";

const OrderItem = () => {
  return (
    <div>

      <div className="flex items-center gap-3 p-3">

        <Avatar
          sx={{
            bgcolor: teal[500],
            width: 40,
            height: 40,
          }}
        >
          <ElectricBolt />
        </Avatar>

        <div>
          <h2 className="font-semibold">PENDING</h2>
          <p>Arriving By Mon, 15 Jul</p>
        </div>

      </div>

      <div className="p-5 bg-teal-50 flex gap-3">
        <div>
          <img
            className="w-[70px]"
            src="/productSphoto/sareephoto2.jpg"
            alt="Product"
          />
        </div>

        <div className="w-full space-y-2">
          <h1 className="font-bold">SZN</h1>

          <p>
            The blouse worn by the model might be for modelling purpose only.
            Check the image of the blouse piece to understand how the actual
            blouse piece looks like.
          </p>

          <p>
            <strong>Size:</strong> Length: 5.5 metres plus 0.8 metre blouse
            piece Width: 1.06 metres (approx.)
          </p>
        </div>
      </div>

    </div>
  );
};

export default OrderItem;