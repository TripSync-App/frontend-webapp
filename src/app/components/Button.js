"use client";
import { Button } from "@rewind-ui/core";

export default function ButtonComponent(prop){
    return(
        <Button color="blue" onClick={() => !prop}>
            This is a Button
        </Button>
    )
}