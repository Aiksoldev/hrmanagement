/* eslint-disable no-unused-vars */
import React, { createContext, useReducer } from "react";
const initialState = {
  cartCount: 0,
  cartData: "",
  wishListCount: 0,
  uid: 0,
  categoryPayLoad: null,
  productPayload: null,
  categoryDetails: null,
  finalCartData: null,
  modalImage: null,
  modalImages: [],
  modalShow: false,
  origionAddress: {},
  destinationAddress: {},
  addressTrackingModal: false,
  lyveorderDetails: {},
};

export const store = createContext(initialState);
const { Provider } = store;

const reducer = (state, action) => {
  const currentState = { ...state };
  switch (action.type) {
    case "ADD_CART": {
      currentState.cartCount = action.payload.cartCount;
      currentState.cartData = action.payload.cartData;
      return currentState;
    }

    case "ADD_WISHLISTCOUNT": {
      currentState.wishListCount = action.payload.wishListCount;
      return currentState;
    }

    case "CATEGORY_PAYLOAD": {
      currentState.categoryPayLoad = action.payload.categoryPayLoad;
      return currentState;
    }

    case "PRODUCT_PAYLOAD": {
      currentState.productPayload = action.payload.productPayload;
      return currentState;
    }

    case "MODAL_OPEN": {
      currentState.modalShow = action.payload.modalShow;
      return currentState;
    }

    case "MODAL_IMAGE": {
      currentState.modalImage = action.payload.modalImage;
      return currentState;
    }

    case "MODAL_IMAGES": {
      currentState.modalImages = action.payload.modalImages;
      return currentState;
    }

    case "CATEGORY_DETAILS": {
      currentState.categoryDetails = action.payload.categoryDetails;
      return currentState;
    }

    case "FINAL_CART_DATA": {
      currentState.finalCartData = action.payload.finalCartData;
      return currentState;
    }

    case "ADD_UID": {
      currentState.uid = action.payload.uid;
      return currentState;
    }

    case "headercheck": {
      currentState.headercheckflag = action.payload.headercheckflag;
      return currentState;
    }

    case "TRACKING_ADDRESS": {
      currentState.origionAddress = action.payload.origionAddress;
      currentState.destinationAddress = action.payload.destinationAddress;
      currentState.addressTrackingModal = action.payload.addressTrackingModal;
      currentState.lyveorderDetails = action.payload.lyveorderDetails;

      return currentState;
    }

    default:
      return initialState;
  }
};

export const StateProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <store.Provider value={[state, dispatch]}>{props.children}</store.Provider>
  );
};
