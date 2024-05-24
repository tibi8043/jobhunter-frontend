import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import InputField from "../../Components/InputField";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(): void {
    console.log("Submit form");
    console.log(email);
    console.log(password);
  }

  return (
    <>
      <div className="w-full max-w-xs p-4 rounded-xl bg-slate-600">
        <form className="w-42">
          <InputField
            label="E-mail"
            labelFor="email"
            type="email"
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={(value) => setEmail(value)}
            className="defaultInputField"
          ></InputField>

          <InputField
            label="Password"
            labelFor="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(value) => setPassword(value)}
            className="defaultInputField"
          ></InputField>

          <button
            onClick={onSubmit}
            type="submit"
            className="w-full mb-2 max-w-xs btn btn-success"
          >
            Login
          </button>
        </form>
        <Link to="/register">
          <button className=" mb-2 w-full max-w-xs link-hover text-pretty">
            If you don't have an account, register here.
          </button>
        </Link>
      </div>
    </>
  );
}
