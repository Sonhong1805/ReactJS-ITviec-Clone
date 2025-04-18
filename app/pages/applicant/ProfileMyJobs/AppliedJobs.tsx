import { AlertCircle } from "feather-icons-react";
import JobCard from "./JobCard";
import { JobsWrapper } from "./styled";

const AppliedJobs = () => {
  return (
    <JobsWrapper>
      <div className="heading">
        <div className="info">
          <AlertCircle />
          <div>Your applied jobs are stored for the last 12 months.</div>
        </div>
        <div className="sort">
          <div>Sort by:</div>
          <select>
            <option value="">Latest application date</option>
            <option value="">Furthest application date</option>
          </select>
        </div>
      </div>
      <div className="job-list">
        {Array.from({ length: 10 }).map((_, index) => (
          <JobCard key={index} />
        ))}
      </div>
    </JobsWrapper>
  );
};

export default AppliedJobs;
