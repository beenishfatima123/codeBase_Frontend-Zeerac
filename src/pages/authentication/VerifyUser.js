import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAgent } from "../../api/dataApi";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";
import { toast } from "react-toastify";

const VerifyUser = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  /* This useEffect hook is called when code (route parameters) are changed. It then passes code
  to handle verification function. */
  useEffect(() => {
    handleVerification(code);
    // eslint-disable-next-line
  }, [code]);

  /* handleVerification function takes code as parameter and
  sends it to verifyAgent for verification using API. It checks the response
  and then displays it in the toast. If verified, it navigates to login page 
  otherwise it goes to main.  */
  const handleVerification = async (code) => {
    const verificationResponse = await verifyAgent(code);
    if (verificationResponse?.status) {
      toast.success("User verified", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      navigate("/login", { replace: true });
    } else {
      toast.error("Something went wrong, try again later", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      navigate("/", { replace: true });
    }
  };

  return (
    <div>
      <ComponentLoader />
    </div>
  );
};

export default VerifyUser;
