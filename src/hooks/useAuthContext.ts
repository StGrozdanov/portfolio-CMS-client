import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/**
 * Auth context hook
 */
export const useAuthContext = () => useContext(AuthContext);