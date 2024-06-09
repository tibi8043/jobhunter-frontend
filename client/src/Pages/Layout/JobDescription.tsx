import {
  NavLink,
  useParams,
  useNavigate,
  Router,
  Route,
} from "react-router-dom";
import { useGetJobByIdQuery } from "../../Redux/Api/jobApi";

import { useEffect } from "react";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { RolePayload } from "../../Models/enums";
import {
  useApplicantsForAJobQuery,
  useApplyForAJobMutation,
  useRemoveApplyForAJobMutation,
} from "../../Redux/Api/applicantsApi";
import { IApplyForAJob } from "../../Redux/interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JobDescription() {
  const { id: actualJobId } = useParams();
  const navigate = useNavigate();

  let actualUser = getActualUser();
  const { refetch: refetchApplicantsForJob, data: applicantsForThisJob } =
    useApplicantsForAJobQuery(actualJobId!);
  const {
    data: actualJob,
    error,
    isLoading,
  } = useGetJobByIdQuery(actualJobId!);

  const [applyService, { isSuccess: isApplySuccess, isError: isApplyError }] =
    useApplyForAJobMutation();

  const [
    removeApplyService,
    { isSuccess: isRemoveApplySuccess, isError: isRemoveApplyError },
  ] = useRemoveApplyForAJobMutation();

  function getActualUser() {
    return useSelector((state: RootState) => state.auth.user);
  }

  function handleApply() {
    if (actualUser && actualJob) {
      const payload: IApplyForAJob = {
        jobId: parseInt(actualJob!.id),
      };
      applyService(payload);
    }
  }

  function isActualUserAppliedForThisJob(): boolean {
    if (applicantsForThisJob) {
      return applicantsForThisJob.some(
        (element) => element.userId === actualUser?.id
      );
    }
    return false;
  }

  function removeApply() {
    if (actualJobId) {
      removeApplyService(actualJobId);
    }
  }

  useEffect(() => {
    if (isApplyError) {
      toast.error("Something went wrong");
    }
    if (isApplySuccess) {
      toast.success("You applied successfully");
      refetchApplicantsForJob();
    }
    if (isRemoveApplyError) {
      toast.error("Something went wrong while removing apply");
    }
    if (isRemoveApplySuccess) {
      toast.success("Apply removed successfully");
      refetchApplicantsForJob();
    }
  }, [isApplyError, isApplySuccess, isRemoveApplyError, isRemoveApplySuccess]);

  return (
    <>
      <ToastContainer />
      <div className="w-full d-flex mb-4 flex justify-center">
        <span className="bg-active font-bold">Job Description</span>
      </div>
      <section>
        <div className="w-full p-4 flex flex-row justify-between items-center bg-primary-content bg-blend-darken rounded-xl mb-2">
          <div>
            <span className="bg-active text-current font-extrabold">
              {actualJob?.company} - {actualJob?.position}
            </span>
          </div>
          <div className="flex flex-row gap-4">
            <NavLink
              to={"#"}
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              Back
            </NavLink>

            {!actualUser && (
              <NavLink to="/login" className="btn btn-primary">
                Apply
              </NavLink>
            )}

            {actualUser?.role === RolePayload.JOB_SEEKER &&
              !isActualUserAppliedForThisJob() && (
                <button
                  onClick={() => handleApply()}
                  className="btn btn-primary"
                >
                  Apply
                </button>
              )}
            {actualUser?.role === RolePayload.JOB_SEEKER &&
              isActualUserAppliedForThisJob() && (
                <button
                  onClick={() => removeApply()}
                  className="btn btn-primary"
                >
                  Remove Apply
                </button>
              )}
          </div>
        </div>
        <div className=" w-full rounded-xl border-2 border-primary-content">
          <table className="table table-fixed table-zebra">
            <tbody>
              <tr>
                <td className="break-words">
                  <span></span>Name
                </td>
                <td className="break-words">{actualJob?.company}</td>
              </tr>
              <tr>
                <td className="break-words">Position</td>
                <td className="break-words">{actualJob?.position}</td>
              </tr>
              <tr>
                <td className="break-words">Description</td>
                <td className="break-words">{actualJob?.description}</td>
              </tr>
              <tr>
                <td className="break-words">Salary</td>
                <td className="break-words">
                  {actualJob?.salaryFrom} - {actualJob?.salaryTo}
                </td>
              </tr>
              <tr>
                <td className="break-words">Type:</td>
                <td className="break-words">{actualJob?.type}</td>
              </tr>
              <tr>
                <td className="break-words">City</td>
                <td className="break-words">{actualJob?.city}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {actualUser?.role === RolePayload.JOB_ADVERTISER &&
        actualJob?.userId == actualUser.id && (
          <section className="mt-8 w-full">
            <div className="w-full p-4 flex flex-row justify-between items-center bg-primary-content bg-blend-darken rounded-xl mb-2">
              <div>
                <span className="bg-active text-current font-extrabold">
                  People who applied
                </span>
              </div>
            </div>

            {applicantsForThisJob?.map((element) => (
              <div
                key={element.userId}
                className="w-full flex flex-col gap-2 items-center"
              >
                <div
                  onClick={() => {}}
                  className="my-4 card w-full bg-accent text-primary-content shadow-lg shadow-curren transition-colors duration-500"
                >
                  <div className="card-body pb-4">
                    <h2 className="card-title">{element.user.fullname}</h2>
                    <div className="font-semibold">
                      <div className="badge badge-outline">
                        {element.user.email}
                      </div>
                    </div>
                    <div className="card-actions justify-end"></div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
    </>
  );
}
