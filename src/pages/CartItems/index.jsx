import dynamic from "next/dynamic";
import React from "react";
const CartItems = dynamic(() => import("@/components/CartItems/CartItems"),{ssr:false});

const index = () => {
  return (
    <div>
      <CartItems />
    </div>
  );
};

export default index;
