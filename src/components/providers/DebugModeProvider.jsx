import React, { createContext , useState} from "react";

export const DebugModeContext = createContext({});

export const DebugModeProvider = props => {
  const { children } = props;
  const [isDebugMode, setIsDebugMode] = useState(true);

  return (
    <DebugModeContext.Provider value={{isDebugMode, setIsDebugMode}}>
      {children}
    </DebugModeContext.Provider>
  );
};