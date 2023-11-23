'use client'
import React from "react";
import axios from "axios";

type Props={
    allIds?: number[]
    userId?:number
}

const Button = ({allIds,userId}: Props) => {
return(
    <div className="flex items-center justify-center mt-20 cursor-pointer">
    <span className="px-10 p-2 text-white bg-purple-600 rounded-full">
        Checkout
    </span>
    </div>
)
}

export default Button