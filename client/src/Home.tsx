import { NavLink, useParams, useSearchParams } from "react-router-dom";
import InputField from "./Components/InputField";
import { useGetAllFilteredJobsQuery } from "./Redux/Api/jobApi";
import { JobType } from "./Models/enums";
import { useState } from "react";
import { IFilterPayLoad } from "./Redux/interfaces";
import { UrlParser } from "./Models/UrlParser";

export default function Home() {
  const [isModalOpen, setIsOpen] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();

  const [filterState, setFilterState] = useState<IFilterPayLoad>(
    {} as IFilterPayLoad
  );

  const [payload, setPayload] = useState<IFilterPayLoad>({} as IFilterPayLoad);

  const {
    data: jobs,
    error,
    isLoading,
    refetch,
  } = useGetAllFilteredJobsQuery({
    filter: UrlParser.parseUrl("/jobs", payload),
  });

  function handleSearch() {
    setIsOpen(false);
    setPayload(filterState);
    refetch();
  }

  return (
    <>
      <div className="w-full gap-2 flex flex-row">
        <div className="w-full">
          <InputField
            className="max-w-full input input-bordered "
            label=""
            labelFor="search"
            type="text"
            placeholder="Search for jobs"
            value={filterState.searchValue || ""}
            onChange={(event) => {
              setFilterState({
                ...filterState,
                searchValue: event.target.value,
              });
            }}
          ></InputField>
        </div>
        <span onClick={() => setIsOpen(true)} className="btn btn-outline">
          Filter
        </span>
        <span onClick={() => handleSearch()} className="btn btn-primary">
          Search
        </span>
      </div>

      <div className="flex flex-row justify-between w-full">
        <div className="w-full flex flex-col p-4">
          <div className="w-full flex flex-row justify-between my-2 align-middle items-center">
            <span className="font-semibold">
              Total Advertisements: {jobs?.total}
            </span>
          </div>
          <div className="divider"></div>
          <div className="h-96 overflow-x-hidden overflow-y-scroll  px-3">
            {jobs?.data.map((job) => (
              <div
                key={job.id}
                className="w-full flex flex-col gap-2 items-center"
              >
                <div
                  onClick={() => {}}
                  className="my-4 card w-full bg-primary-content shadow-lg shadow-curren transition-colors duration-500"
                >
                  <div className="card-body p-4">
                    <div className="flex flex-row justify-between">
                      <h2 className="card-title">{job.position}</h2>
                      <span>
                        {" "}
                        {job.salaryFrom} - {job.salaryTo}
                      </span>
                    </div>
                    <div className="divider m-0"></div>
                    <span>
                      <strong>{job.company}</strong>
                    </span>
                    <div className="divider m-0"></div>
                    <div className="break-words">
                      <p className="">{job.description}</p>
                    </div>
                    <div className="card-actions flex flex-row justify-between items-center">
                      <div className="flex gap-2">
                        <span className="badge badge-outline">{job.city}</span>
                        <span className="badge badge-outline">{job.type}</span>
                        {job.homeOffice === 1 ? (
                          <span className="badge">Home Office</span>
                        ) : null}
                      </div>
                      <div>
                        <NavLink to={`jobs/${job.id}`}>
                          <button className="btn btn-primary">View</button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <dialog open={isModalOpen} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Filters</h3>
                <div className="divider"></div>
                <div className="flex flex-col">
                  <InputField
                    className="defaultInputField"
                    label="Salary From:"
                    labelFor="salaryFrom"
                    type="text"
                    value={filterState.salaryFrom || ""}
                    onChange={(event) => {
                      setFilterState({
                        ...filterState,
                        salaryFrom: event.target.value,
                      });
                    }}
                    placeholder="100000"
                  ></InputField>

                  <InputField
                    className="defaultInputField"
                    label="salaryTo"
                    labelFor="Salary To"
                    type="text"
                    value={filterState.salaryTo || ""}
                    placeholder="500000"
                    onChange={(event) => {
                      setFilterState({
                        ...filterState,
                        salaryTo: event.target.value,
                      });
                    }}
                  ></InputField>

                  <InputField
                    className="defaultInputField"
                    label="City"
                    labelFor="city"
                    type="text"
                    value={filterState.city || ""}
                    onChange={(event) => {
                      setFilterState({
                        ...filterState,
                        city: event.target.value,
                      });
                    }}
                    placeholder="Budapest"
                  ></InputField>

                  <label htmlFor="jobType">JobType</label>
                  <select
                    className="defaultInputField select"
                    id="jobType"
                    value={filterState.jobType || undefined}
                    onChange={(event) => {
                      setFilterState({
                        ...filterState,
                        jobType: event.target.value as JobType,
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
                        className="checkbox"
                        checked={filterState.homeOffice || false}
                        onChange={(event) => {
                          setFilterState({
                            ...filterState,
                            homeOffice: event.target.checked,
                          });
                        }}
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
                        setIsOpen(!isModalOpen);
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="btn mx-1"
                      onClick={() => {
                        handleSearch();
                      }}
                    >
                      Search
                    </button>
                  </form>
                  <button
                    className="btn mx-1 btn-primary"
                    onClick={() => {
                      setFilterState({} as IFilterPayLoad);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </>
  );
}
