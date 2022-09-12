import React, { createContext, useState } from "react";
import { BaseURL, DebugMode } from "../../const";

export const DebugModeContext = createContext({});

export const DebugModeProvider = (props) => {
  const { children } = props;

  const [isDebugMode, setIsDebugMode] = useState({
    DebugMode: DebugMode,
    BaseURL: BaseURL,
  });

  return (
    <DebugModeContext.Provider value={{ isDebugMode, setIsDebugMode }}>
      {children}
    </DebugModeContext.Provider>
  );
};
