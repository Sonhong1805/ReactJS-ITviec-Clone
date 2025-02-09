import JobCard from "~/components/JobCard";
import { JobRelativeWrapper } from "./styled";

const JobRelative = () => {
  return (
    <JobRelativeWrapper>
      <div className="job-relative-container">
        <h2>Việc làm tương tự dành cho bạn</h2>
        <div className="job-list">
          {Array.from({ length: 8 }).map((_, index) => (
            <JobCard key={index} />
          ))}
        </div>
      </div>
    </JobRelativeWrapper>
  );
};

export default JobRelative;
