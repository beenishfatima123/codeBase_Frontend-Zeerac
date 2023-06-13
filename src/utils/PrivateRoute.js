import { useSelector } from "react-redux";
import LoginContainer from "../components/loginComponents/LoginContainer";
const PrivateRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return currentUser ? (
    children
  ) : (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoginContainer />
    </div>
  );
};

export default PrivateRoute;
