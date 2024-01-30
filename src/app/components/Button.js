"use client";
import { Button } from "@mui/material";
import { teal } from "@mui/material/colors";

export default function ButtonComponent(prop){
    return(
        <div className="relative flex self-center justify-center p-10 l-20">
            <Button className="bg-slate-600 text-white" variant="contained">
                Make a Post
            </Button>
        </div>
       
    )
}