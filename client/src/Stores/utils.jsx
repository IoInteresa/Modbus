import { createContext } from "react";

const StoreContext = createContext(null);

const StoreProvider = ({ children, stores = {} }) => (
  <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
);


export {StoreContext, StoreProvider};