import React from "react";
import { useState } from "react";
import { SignUp, SignIn } from "./index";

const TogglePage = () => {
  const [isReg, setIsReg] = useState(false);

  const toggleMode = () => {
    setIsReg(!isReg);
  };

  return (
    <>
      {isReg ? (
        <SignUp toggleMode={toggleMode} />
      ) : (
        <SignIn toggleMode={toggleMode} />
      )}
    </>
  );
};

export default TogglePage;
