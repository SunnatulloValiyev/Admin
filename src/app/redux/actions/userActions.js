export const loginUser = (user) => {
    return {
      type: "LOGIN",
      payload: user,
    };
  };
  