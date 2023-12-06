import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuthContext();
    return isAuthenticated ? children : <Navigate to="/" replace />;
}