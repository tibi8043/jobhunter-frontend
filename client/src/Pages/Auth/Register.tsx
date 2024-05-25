import { useState } from "react";
import InputField from "../../Components/InputField";
import { Role, RolePayload } from "../../Models/enums";
import { Link, Navigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../../Redux/Api/authApi";
import {
  IExperiencePayload,
  ILoginResponse,
  IUserPayload,
} from "../../Redux/interfaces";
import { useAddExperienceMutation } from "../../Redux/Api/experiencesApi";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/authSlice";

export default function Register() {
  const [registerService, { isLoading, isError, error }] =
    useRegisterMutation();

  const [loginService, { isSuccess: isLoginSuccess }] = useLoginMutation();

  const [addExperiences, { isSuccess: isAddExperiencesSuccess }] =
    useAddExperienceMutation();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState(Role.JOB_SEEKER);
  const [experiences, setExperiences] = useState("");

  async function onSubmit(): Promise<any> {
    if (email && password && fullName && role) {
      try {
        const payload: IUserPayload = {
          email: email,
          password: password,
          fullname: fullName,
          role:
            role === Role.JOB_SEEKER
              ? RolePayload.JOB_SEEKER
              : RolePayload.JOB_ADVERTISER,
        };
        await registerService(payload);

        const loginResponse: ILoginResponse = await loginService({
          email: payload.email,
          password: payload.password,
          strategy: "local",
        }).unwrap();

        dispatch(login(loginResponse));

        if (experiences !== "" && role === Role.JOB_SEEKER) {
          console.log("Experiences");
          console.log(experiences);
          let experiencePayload = parseStringToExperiences(experiences);
          if (experiencePayload) {
            console.log(experiencePayload);
            await addExperiences(experiencePayload);
          }
        }

        console.log("Submit form");
        console.log(payload);
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (isLoginSuccess) {
    console.log("success");
    return <Navigate to="/" />;
  }

  function parseStringToExperiences(
    experiences: string
  ): IExperiencePayload[] | null {
    try {
      let experienceArray = experiences.split("\n");
      let experiencePayload: IExperiencePayload[] = experienceArray.map(
        (experience) => {
          let experienceData = experience.split(";");
          return {
            company: experienceData[0],
            title: experienceData[1],
            interval: experienceData[2],
          };
        }
      );
      return experiencePayload;
    } catch (err) {
      return null;
    }
  }

  return (
    <div className="w-full max-w-xs p-4 rounded-xl bg-slate-600">
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

      {role === Role.JOB_SEEKER && (
        <>
          <label htmlFor="experiences">Experiences</label>
          <textarea
            className="textarea textarea-xl w-full my-2"
            id="experiences"
            value={experiences}
            onChange={(event) => setExperiences(event.target.value)}
            placeholder="Halo Haven;Front-end developer;2021-2022"
          ></textarea>
        </>
      )}

      <button
        onClick={() => onSubmit()}
        className="w-full mb-2 max-w-xs btn btn-success"
      >
        Register
      </button>
      <Link to="/login">
        <button className=" mb-2 w-full max-w-xs link-hover text-pretty">
          I already have an account.
        </button>
      </Link>
    </div>
  );
}
