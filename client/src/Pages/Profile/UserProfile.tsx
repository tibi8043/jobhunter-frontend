import { useEffect, useState } from "react";
import InputField from "../../Components/InputField";
import {
  IExperiencePayload,
  IExperienceResponse,
  IUser,
  IUserResponse,
} from "../../Redux/interfaces";
import { useGetUserDataQuery } from "../../Redux/Api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  useAddExperienceMutation,
  useDeleteExperienceMutation,
  useGetUserExperienceQuery,
  useModifyExperienceMutation,
} from "../../Redux/Api/experiencesApi";
import { toast, ToastContainer } from "react-toastify";

export default function UserProfile() {
  const actualUser = useSelector((state: RootState) => state.auth.user);
  const { data: experiences, refetch } = useGetUserExperienceQuery();
  const [
    deleteExperienceService,
    { isSuccess: isDeleteExperienceSuccess, isError: isDeleteExperienceError },
  ] = useDeleteExperienceMutation();
  const [
    experienceService,
    { isError: isModifyExperienceError, isSuccess: isModifyExperienceSuccess },
  ] = useModifyExperienceMutation();

  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedExperience, setSelectedExperience] =
    useState<IExperienceResponse>({} as IExperienceResponse);

  const [
    addExperienceService,
    { isSuccess: isAddExperienceSuccess, isError: isAddExperienceError },
  ] = useAddExperienceMutation();

  const [payload, setPayload] =
    useState<IExperiencePayload>(selectedExperience);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    refetch();

    if (isAddExperienceSuccess) {
      toast.success("Experience added successfully");
    }

    if (isAddExperienceError) {
      toast.error("Something went wrong while adding experience");
    }

    if (isModifyExperienceError) {
      toast.error("Something went wrong while modifying experience");
    }

    if (isModifyExperienceSuccess) {
      toast.success("Experience modified successfully");
    }

    if (isDeleteExperienceError) {
      toast.error("Something went wrong while deleting experience");
    }

    if (isDeleteExperienceSuccess) {
      toast.success("Experience deleted successfully");
    }
  }, [
    isAddExperienceError,
    isModifyExperienceError,
    isDeleteExperienceError,
    isModifyExperienceSuccess,
    isDeleteExperienceSuccess,
    isAddExperienceSuccess,
  ]);

  function saveChanges() {
    const payload = {
      company: selectedExperience.company,
      interval: selectedExperience.interval,
      title: selectedExperience.title,
    };

    experienceService({
      experience: payload,
      id: selectedExperience.id,
    });
  }

  function addExperience() {
    addExperienceService([selectedExperience]);
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="md:w-1/2 w-full flex flex-col gap-2 p-4">
          <h1 className="text-xl font-semibold ">Profile</h1>
          <p>Here you can see your data</p>
          <div className="w-full flex flex-col gap-2">
            <div>
              <span className="text-accent font-semibold">Email: </span>
              <span>{actualUser?.email}</span>
            </div>
            <div>
              <span className="text-accent font-semibold">Full Name: </span>
              <span>{actualUser?.fullname}</span>
            </div>
            <div>
              <span className="text-accent font-semibold">Role: </span>
              <span>{actualUser?.role}</span>
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="md:w-1/2 w-full flex flex-col p-4">
          <h1 className="text-xl font-semibold">Experiences</h1>
          <div className="w-full flex flex-row justify-between my-2 align-middle items-center">
            <button
              onClick={() => {
                setIsOpen(true);
                setIsEditMode(false);
                setPayload({} as IExperiencePayload);
                setSelectedExperience({} as IExperienceResponse);
              }}
              className="btn btn-primary"
            >
              Add New
            </button>
            <span className="font-semibold">
              Total Experience: {experiences?.total}
            </span>
          </div>
          <div className="divider"></div>
          <div className="h-96 overflow-x-hidden overflow-y-scroll p-2 ">
            {experiences?.data.map((element) => (
              <div
                key={element.id}
                className="w-full flex flex-col gap-2 items-center"
              >
                <div
                  onClick={() => {}}
                  className="my-4 card md:w-80 w-full bg-accent text-primary-content shadow-lg shadow-curren transition-colors duration-500"
                >
                  <div className="card-body pb-4">
                    <h2 className="card-title">{element.title}</h2>
                    <div className="font-semibold">
                      {element.company}{" "}
                      <div className="badge badge-outline">
                        {element.interval}
                      </div>
                    </div>
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => {
                          setIsEditMode(true);
                          setSelectedExperience(element);
                          setIsOpen(true);
                          setPayload({} as IExperiencePayload);
                        }}
                        className="btn btn-info"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteExperienceService(element.id);
                          refetch();
                        }}
                        className="btn btn-secondary"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <dialog open={isOpen} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Experience</h3>
                <div className="divider"></div>
                <div className="flex flex-col">
                  <InputField
                    className="defaultInputField"
                    label="Company"
                    labelFor="company"
                    type="text"
                    value={selectedExperience.company || ""}
                    placeholder="john.doe@gmail.com"
                    onChange={(value) => {
                      setSelectedExperience({
                        ...selectedExperience,
                        company: value.target.value,
                      });
                    }}
                  ></InputField>

                  <InputField
                    className="defaultInputField"
                    label="Interval"
                    labelFor="interval"
                    type="text"
                    value={selectedExperience.interval || ""}
                    placeholder="2022-2023"
                    onChange={(value) => {
                      setSelectedExperience({
                        ...selectedExperience,
                        interval: value.target.value,
                      });
                    }}
                  ></InputField>

                  <InputField
                    className="defaultInputField"
                    label="Title"
                    labelFor="title"
                    type="text"
                    value={selectedExperience.title || ""}
                    placeholder="Frontend Fejlsztő"
                    onChange={(value) => {
                      setSelectedExperience({
                        ...selectedExperience,
                        title: value.target.value,
                      });
                    }}
                  ></InputField>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn mx-1"
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setSelectedExperience({} as IExperienceResponse);
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="btn mx-1"
                      onClick={() => {
                        setSelectedExperience({} as IExperienceResponse);
                        if (isEditMode) {
                          saveChanges();
                        } else {
                          addExperience();
                        }
                        setIsOpen(!isOpen);
                        refetch();
                      }}
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </>
  );
}
