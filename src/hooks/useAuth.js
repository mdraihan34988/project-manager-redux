import { useSelector } from "react-redux";
import { selectAuthenticatedUser } from "../features/auth/authSelectors";

export default function useAuth() {
    const auth = useSelector(selectAuthenticatedUser);

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false;
    }
}
