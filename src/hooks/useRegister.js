import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { registerStart, registerSuccess, registerFailure } from "../app/features/userSlice";

export const useRegister = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async (name, email, password) => {
    setError("");
    setLoading(true);
    dispatch(registerStart());

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: name
      });

      dispatch(registerSuccess({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name
      }));

      navigate("/");
    } catch (error) {
      let errorMessage = "Ro'yxatdan o'tishda xatolik yuz berdi";
      
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Bu email allaqachon ro'yxatdan o'tgan";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Noto'g'ri email formati";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Parol juda oddiy (kamida 6 belgi bo'lishi kerak)";
      }
      
      setError(errorMessage);
      dispatch(registerFailure(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return { register, error, loading };
};