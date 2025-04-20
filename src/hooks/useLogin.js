import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../app/features/userSlice";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async (email, password) => {
    setError("");
    setLoading(true);
    dispatch(loginStart());

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }));
    } catch (err) {
      let errorMessage = "Login failed";
      if (err.code === "auth/user-not-found") {
        errorMessage = "User not found";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      }
      setError(errorMessage);
      dispatch(loginFailure(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};
