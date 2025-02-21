import React, { useState } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import InputField from "../../Components/InputField";
import { useLoginMutation } from "../../Redux/Api/authApi";
import { useDispatch } from "react-redux";
import { ILoginPayload, ILoginResponse } from "../../Redux/interfaces";
import { login } from "../../Redux/Slices/authSlice";

export default function Login() {
  const [loginService, { isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();

  const [user, setUser] = useState<ILoginPayload>({} as ILoginPayload);

  async function onSubmit(): Promise<any> {
    try {
      const loginResponse: ILoginResponse = await loginService({
        email: user.email,
        password: user.password,
        strategy: "local",
      }).unwrap();

      dispatch(login(loginResponse));
    } catch (err) {
      console.log(err);
    }
  }
  if (isSuccess) {
    console.log("success");
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="w-full max-w-xs p-4 rounded-xl bg-slate-600">
        <InputField
          label="E-mail"
          labelFor="email"
          type="email"
          placeholder="john.doe@gmail.com"
          value={user.email || ""}
          onChange={(value) => setUser({ ...user, email: value.target.value })}
          className="defaultInputField"
        ></InputField>

        <InputField
          label="Password"
          labelFor="password"
          type="password"
          placeholder="Password"
          value={user.password || ""}
          onChange={(value) =>
            setUser({ ...user, password: value.target.value })
          }
          className="defaultInputField"
        ></InputField>

        <button
          onClick={() => onSubmit()}
          type="submit"
          className="w-full mb-2 max-w-xs btn btn-success"
        >
          Login
        </button>
        <Link to="/register">
          <button className=" mb-2 w-full max-w-xs link-hover text-pretty">
            If you don't have an account, register here.
          </button>
        </Link>
      </div>
    </>
  );
}
