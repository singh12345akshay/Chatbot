import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { RegexLibrary } from "../Regex";

export default function ManageuserController() {
  const [email, setEmail] = useState({
    value: "",
    isValid: true,
  });
  const [password, setPassword] = useState({
    value: "",
    isValid: true,
  });
  const [emailHelpertext, setEmailHelpertext] = useState("");
  const [passwordHelpertext, setpasswordHelpertext] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  function validateEmail(e: { target: { value: string } }) {
    if (RegexLibrary.MAIL.test(e.target.value)) {
      setEmail({
        value: e.target.value,
        isValid: true,
      });
      setEmailHelpertext("");
    } else {
      setEmail({
        value: e.target.value,
        isValid: false,
      });
      setEmailHelpertext("Email should be in format user@example.com");
    }
  }
  function validatePassword(e: { target: { value: string } }) {
    if (RegexLibrary.PASSWORD.test(e.target.value)) {
      setPassword({
        value: e.target.value,
        isValid: true,
      });
      setpasswordHelpertext("");
    } else {
      setPassword({
        value: e.target.value,
        isValid: false,
      });
      setpasswordHelpertext("Password should contain [0,9] [a-z] [A-Z] ");
    }
  }
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    try {
      const response = await axios.post(
        "https://chatbotapps.mindpath.tech/api/v1/user/signup",
        {
          email: email.value,
          password: password.value,
        }
      );
      enqueueSnackbar("User Added Successfully !", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      setEmail({
        value: "",
        isValid: true,
      });
      setPassword({
        value: "",
        isValid: true,
      });
    } catch (response) {
      console.log("response:", response.response.data.message);
      // console.error("Error logging in", error);
      enqueueSnackbar(response.response.data.message, {
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };
  return {
    getters: { email, password, emailHelpertext, passwordHelpertext },
    handlers: {
      validateEmail,
      handleSubmit,
      validatePassword,
    },
  };
}
