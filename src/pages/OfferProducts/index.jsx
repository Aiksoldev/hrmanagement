const OfferProducts = dynamic(
  () => import("@/components/OfferProducts/OfferProducts"),
  { ssr: false }
);
import dynamic from "next/dynamic";
import React from "react";

const Offers = (props) => {
  
  return (
    <div>
      <OfferProducts />
    </div>
  );
};



export default Offers;
