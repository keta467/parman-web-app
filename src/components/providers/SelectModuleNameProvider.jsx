import { createContext , useState} from "react";

export const SelectModuleNameContext = createContext({});

export const SelectModuleNameProvider = props => {
  const { children } = props;

  const [isSelectModuleName, setIsSelectModuleName] = useState("初期モジュール名");

  return (
    <SelectModuleNameContext.Provider value={{isSelectModuleName, setIsSelectModuleName}}>
      {children}
    </SelectModuleNameContext.Provider>
  );
};