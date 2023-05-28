import { useContext } from "react";
import { AuthorizationContext } from "../../contexts/authorization";

const useAuthorization = () => {
  const context = useContext(AuthorizationContext);

  if (!context) {
    throw new Error(
      "useAuthorization must be used within a AuthorizationContextProvider"
    );
  }
  return context;
};

export default useAuthorization;
