import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for the role context
type RoleContextType = [role: any, setRole: Dispatch<SetStateAction<any>>];

// Create a context with a default non-null value
const defaultRoleContext: RoleContextType = [null, () => {}];
export const RoleContext = createContext<RoleContextType>(defaultRoleContext);

// Define your provider component
export function RoleContextProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<any>(null);
  
  return (
    <RoleContext.Provider value={[role, setRole]}>
      {children}
    </RoleContext.Provider>
  );
}

// Create a custom hook to use the context
export function useRoleContext() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoleContext must be used within a RoleContextProvider");
  }
  return context;
}
