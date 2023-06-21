import React, { useState } from 'react'
import { RegexLibrary } from '../Regex';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";


export default function SigninController() {
  const [isClicked, setIsClicked] = useState(false);
    const [email, setEmail] = useState({
        value: "",
        isValid: true,
      });
      const [password, setPassword] = useState({
        value: "",
        isValid: true,
      });
      const [error, setError] = useState("");
    const [emailHelpertext, setEmailHelpertext] = useState("");
    const [passwordHelpertext, setpasswordHelpertext] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
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
          setEmailHelpertext("This field is required");
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
          setpasswordHelpertext("This field is required");
        }
      }
      const handleTextFieldClick = () => {
    setIsClicked(true);
  };

      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        try {
              const response = await axios.post(
                "https://chatbotapps.mindpath.tech/api/v1/user/login",
                {
                  email: email.value,
                  password: password.value,
                }
              );
          enqueueSnackbar("Sign in successful!", {
            variant: "success",
            autoHideDuration:2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          const authToken = response.data.body.token;
             localStorage.setItem("authToken", JSON.stringify(authToken));
             localStorage.setItem("userName",JSON.stringify(email.value));
          router.push("/home");

        } catch (error) {
          enqueueSnackbar("Sign in failed!", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          console.error("Error logging in", error);
          setError("An error occurred while logging in");
        }
      };
      

  return ({
    getters:{email, password, emailHelpertext, passwordHelpertext,isClicked},
    handlers:{
        validateEmail,
        handleSubmit,
        validatePassword,
        handleTextFieldClick
    }
  }
  );
}
