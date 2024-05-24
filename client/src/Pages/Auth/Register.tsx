import { useState } from "react";
import InputField from "../../Components/InputField";
import { Role } from "../../Models/enums";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState(Role.JOB_SEEKER);

  function onSubmit(): void {
    console.log("Submit form");
  }

  return (
    <div className="w-full max-w-xs p-4 rounded-xl bg-slate-600">
      <form className="w-42">
        <InputField
          className="defaultInputField"
          label="E-mail"
          labelFor="email"
          type="email"
          placeholder="john.doe@gmail.com"
          value={email}
          onChange={(value) => setEmail(value)}
        ></InputField>

        <InputField
          className="defaultInputField"
          label="Password"
          labelFor="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(value) => setPassword(value)}
        ></InputField>

        <InputField
          className="defaultInputField"
          label="Full name"
          labelFor="full-name"
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(value) => setFullName(value)}
        ></InputField>

        <label htmlFor="role">Role</label>
        <select
          className="defaultInputField select"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          {Object.values(Role).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <button
          onClick={onSubmit}
          type="submit"
          className="w-full mb-2 max-w-xs btn btn-success"
        >
          Register
        </button>
      </form>
      <Link to="/login">
        <button className=" mb-2 w-full max-w-xs link-hover text-pretty">
          I already have an account.
        </button>
      </Link>
    </div>
  );
}
