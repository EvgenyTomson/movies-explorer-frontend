import { createContext, useContext } from "react";

const initialUserData = {
  name: '',
  email: '',
};

const CurrentUserContext = createContext(initialUserData);

export const CurrentUserContextProvider = ({ children, ...props }) => {
  // const context = new UseCreateAppContext(props);
  return <CurrentUserContext.Provider value={props.context}>{children}</CurrentUserContext.Provider>;
};

export function useCurrentUserContext() {
  const context = useContext(CurrentUserContext);
  // if (!context) throw new Error('Use app context within provider!');
  return context;
}
