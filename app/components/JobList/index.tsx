import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import robby_404 from "/assets/svg/robby-404.svg";
import { JobEmpty, JobListContainer } from "./styled";
import JobCard from "~/components/JobCard";

const JobList = () => {
  const { t } = useTranslation(["search"]);
  return (
    <>
      {" "}
      {false ? (
        <JobListContainer>
          <Skeleton
            count={8}
            style={{ minHeight: "31.2rem", marginBottom: ".8rem" }}
          />
        </JobListContainer>
      ) : (
        <JobListContainer className={false ? "empty" : ""}>
          {true ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <JobCard key={index} />
              ))}
            </>
          ) : (
            <JobEmpty>
              <figure>
                <img src={robby_404} />
                <figcaption>Không tìm thấy kết quả nào phù hợp</figcaption>
              </figure>
            </JobEmpty>
          )}
        </JobListContainer>
      )}
    </>
  );
};

export default JobList;
