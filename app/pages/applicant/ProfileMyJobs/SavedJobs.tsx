import { FiAlertCircle } from "react-icons/fi";
import JobCard from "./JobCard";
import { JobsWrapper } from "./styled";

const SavedJobs = () => {
  return (
    <JobsWrapper>
      <div className="heading">
        <div className="info">
          <FiAlertCircle />
          <div>You can save up to 20 jobs.</div>
        </div>
        <div className="sort">
          <div>Sort by:</div>
          <select>
            <option value="">Nearest expiration time</option>
            <option value="">Newest job</option>
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

export default SavedJobs;
