import {createContext} from "react";

type StateType = {
  flash: {
    message: string;
    type: string;
  };
  setFlash: any;
};

const initialState:StateType = {
    flash:{
    message:undefined!,
    type:undefined!,
    },
    setFlash:null as any,
};
export const FlashContext = createContext(initialState);