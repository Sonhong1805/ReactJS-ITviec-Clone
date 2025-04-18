import { JobsWrapper } from "./styled";
import JobCard from "./JobCard";
import { AlertCircle, ChevronDown } from "feather-icons-react";

interface IProps {
  status: "pending" | "accepted" | "reject" | "expired";
}

const JobsStatus = ({ status }: IProps) => {
  return (
    <JobsWrapper>
      <div className="heading">
        <div className="info">
          <AlertCircle />
          <div>This tab stores jobs that the company has {status}.</div>
        </div>
        <div className="sort">
          <div>Sort by:</div>
          <select>
            <option value="">Date: Oldest to Newest</option>
            <option value="">Date: Newest to Oldest</option>
          </select>
          <ChevronDown />
        </div>
      </div>
      <div className="job-list">
        {Array.from({ length: 10 }).map((_, index) => (
          <JobCard key={index} status={status} />
        ))}
        {/* <div className="empty">
        <img src="/assets/svg/everything-empty.svg" alt="everything empty" />
        <p>You have 0 {status} Jobs</p>
        </div> */}
      </div>
    </JobsWrapper>
  );
};

export default JobsStatus;
