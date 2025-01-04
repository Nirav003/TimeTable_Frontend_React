import React from "react";

const SignIn = ({ toggleMode }) => {
  return (
    <>
      SignIn
      <br/>
      <a href="#" className="text-blue-500" onClick={toggleMode}>
        Register here
      </a>
    </>
  );
};

export default SignIn;
