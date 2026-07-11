
import { Delete } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";


const ReviewCard = () => {
    return (
        <div className="flex justify-between">
            <Grid container spacing={2}>

                <Box>
                    <Avatar className="text-white" sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}>
                        Z
                    </Avatar>
                </Box>
                <Grid size={{ xs: 9 }}>
                    <div className="space-y-2">
                        <div>
                            <p className="font-semibold text-lg">Sujit</p>
                            <p className="opacity-70 whitespace-nowrap">
                                2024-09-27T23:16:07.478333
                            </p>
                        </div>
                    </div>
                    <Rating
                        readOnly
                        value={4}
                        precision={0.5}
                    />
                    <p>value for money product, great product</p>
                    <div>
                        <img className="w24 h-24 object-cover"
                            src="PDPhoto/p.2.png" />
                    </div>
                </Grid>
                

            </Grid>

           <div>
             <IconButton>
                    <Delete sx={{color:red[700]}}/>
                </IconButton>
           </div>
        </div>
    );
};

export default ReviewCard;