import { FiAlertCircle } from "react-icons/fi";
import JobCard from "./JobCard";
import { JobsWrapper } from "./styled";

const RecentViewedJobs = () => {
  return (
    <JobsWrapper>
      <div className="heading">
        <div className="info">
          <FiAlertCircle />
          <div>Only display jobs viewed in the last 3 months.</div>
        </div>
        <div className="sort">
          <div>Sort by:</div>
          <select>
            <option value="">Most recent viewed</option>
            <option value="">About to expire</option>
            <option value="">Latest posting</option>
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

export default RecentViewedJobs;
