import { useEffect, useState } from "react";
import InputField from "../../Components/InputField";
import {
  IFilterPayLoad,
  IJobPayload,
  IJobResponse,
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
import {
  useCreateJobMutation,
  useDeleteAllJobsMutation,
  useDeleteJobMutation,
  useGetAllFilteredJobsQuery,
  useGetAllJobsQuery,
  useModifyJobMutation,
} from "../../Redux/Api/jobApi";
import { JobType } from "../../Models/enums";
import { NavLink } from "react-router-dom";
import { UrlParser } from "../../Models/UrlParser";
import { toast } from "react-toastify";

export default function JobAdvertiserProfile() {
  const actualUser = useSelector((state: RootState) => state.auth.user);
  const filter: IFilterPayLoad = { userId: actualUser?.id };
  const {
    data: jobs,
    error,
    isLoading,
    refetch,
  } = useGetAllFilteredJobsQuery({
    filter: UrlParser.parseUrl("/jobs", filter),
  });

  const [
    deleteJob,
    { isSuccess: isDeleteJobSuccess, isError: isDeleteJobError },
  ] = useDeleteJobMutation();
  const [
    jobService,
    { isSuccess: isModifyJobSuccess, isError: isModifyJobError },
  ] = useModifyJobMutation();

  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedJob, setSelectedJob] = useState<IJobResponse>(
    {} as IJobResponse
  );

  const [
    addJobService,
    { isSuccess: isCreateJobSuccess, isError: isCreateJobError },
  ] = useCreateJobMutation();
  const [isOpen, setIsOpen] = useState(false);

  function saveChanges() {
    const payload: IJobPayload = selectedJob;
    if (payload.homeOffice == 0) {
      payload.homeOffice = false;
    }
    if (payload.homeOffice == 1) {
      payload.homeOffice = true;
    }
    jobService({
      job: payload,
      id: selectedJob.id,
    });
    console.log(payload);
  }

  function addJob() {
    addJobService(selectedJob);
  }

  useEffect(() => {
    refetch();
    if (isCreateJobError) {
      toast.error("Error while creating job");
      console.log("Error while creating job");
    }

    if (isCreateJobSuccess) {
      toast.success("Job created successfully");
    }

    if (isModifyJobError) {
      toast.error("Error while modifying job");
    }

    if (isModifyJobSuccess) {
      toast.success("Job modified successfully");
    }

    if (isDeleteJobError) {
      toast.error("Error while deleting job");
    }

    if (isDeleteJobSuccess) {
      toast.success("Job deleted successfully");
    }
  }, [
    isCreateJobError,
    isCreateJobSuccess,
    isModifyJobError,
    isModifyJobSuccess,
    isDeleteJobError,
    isDeleteJobSuccess,
  ]);

  return (
    <>
      <div className="flex md:flex-row flex-col justify-between w-full">
        <div className="md:w-1/4 w-full flex flex-col gap-2 p-4">
          <h1 className="text-xl font-semibold ">Profile</h1>
          <p>Here you can see your data</p>
          <div className="w-full flex flex-col gap-2">
            <div>
              <span className="text-accent font-semibold">Email: </span>
              <span>{actualUser?.email}</span>
            </div>
            <div>
              <span className="text-accent font-semibold">ID: </span>
              <span>{actualUser?.id}</span>
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
        <div className="md:w-3/4 w-full flex flex-col p-4">
          <h1 className="text-xl font-semibold">Your advertisements</h1>
          <div className="w-full flex flex-row justify-between my-2 align-middle items-center">
            <button
              onClick={() => {
                setIsOpen(true);
                setIsEditMode(false);
                setSelectedJob({} as IJobResponse);
              }}
              className="btn btn-primary"
            >
              Add New
            </button>
            <span className="font-semibold">
              Total Advertisements: {jobs?.total}
            </span>
          </div>
          <div className="divider"></div>
          <div className="h-96 overflow-x-hidden overflow-y-scroll  px-3">
            {jobs?.data.map((element) => (
              <div
                key={element.id}
                className="w-full flex flex-col gap-2 items-center"
              >
                <div
                  onClick={() => {}}
                  className="my-4 card w-full bg-accent text-primary-content shadow-lg shadow-curren transition-colors duration-500"
                >
                  <div className="card-body p-4">
                    <div className="flex flex-row justify-between">
                      <h2 className="card-title">{element.position}</h2>
                      <span>
                        {" "}
                        {element.salaryFrom} - {element.salaryTo}
                      </span>
                    </div>
                    <div className="px-2 font-semibold flex flex-col">
                      <p className="break-words">{element.description}</p>
                    </div>
                    <div className="card-actions flex flex-row justify-between items-center">
                      <div className="flex gap-2">
                        <span className="badge badge-outline">
                          {element.city}
                        </span>
                        <span className="badge badge-outline">
                          {element.type}
                        </span>
                        {element.homeOffice === 1 ? (
                          <span className="badge">Home Office</span>
                        ) : null}
                      </div>
                      <div className="flex flex-row gap-2">
                        <NavLink
                          to={`/jobs/${element.id}`}
                          className="btn btn-primary"
                        >
                          View
                        </NavLink>
                        <button
                          onClick={() => {
                            setIsEditMode(true);
                            setSelectedJob(element);
                            setIsOpen(true);
                          }}
                          className="btn btn-info"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteJob(element.id);
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
              </div>
            ))}
            <dialog open={isOpen} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Job</h3>
                <div className="divider"></div>
                <div className="flex flex-col">
                  <InputField
                    className="defaultInputField"
                    label="Position"
                    labelFor="position"
                    type="text"
                    value={selectedJob.position || ""}
                    placeholder="Frontend Fejlsztő"
                    onChange={(value) => {
                      setSelectedJob({
                        ...selectedJob,
                        position: value.target.value,
                      });
                    }}
                  ></InputField>

                  <InputField
                    className="defaultInputField"
                    label="description"
                    labelFor="description"
                    type="text"
                    value={selectedJob.description || ""}
                    placeholder="Something about the role"
                    onChange={(value) => {
                      setSelectedJob({
                        ...selectedJob,
                        description: value.target.value,
                      });
                    }}
                  ></InputField>

                  <InputField
                    className="defaultInputField"
                    label="City"
                    labelFor="city"
                    type="text"
                    value={selectedJob.city || ""}
                    placeholder="Budapest"
                    onChange={(event) => {
                      setSelectedJob({
                        ...selectedJob,
                        city: event.target.value,
                      });
                    }}
                  ></InputField>

                  <label htmlFor="role">Role</label>
                  <select
                    className="defaultInputField select"
                    id="role"
                    value={selectedJob.type || Object.values(JobType)[0]}
                    onChange={(e) => {
                      setSelectedJob({
                        ...selectedJob,
                        type: e.target.value,
                      });
                    }}
                  >
                    {Object.values(JobType).map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-row justify-start gap-4">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        checked={selectedJob.homeOffice === 1}
                        onChange={(e) => {
                          setSelectedJob({
                            ...selectedJob,
                            homeOffice: e.target.checked ? true : false,
                          });
                        }}
                        className="checkbox"
                      />
                      <span className="label-text mx-2">Home Office</span>
                    </label>
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn mx-1"
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setSelectedJob({} as IJobResponse);
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="btn mx-1"
                      onClick={() => {
                        setSelectedJob({} as IJobResponse);
                        if (isEditMode) {
                          saveChanges();
                        } else {
                          addJob();
                        }
                        setIsOpen(!isOpen);
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
