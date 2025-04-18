import IconCircleDollarSign from "~/components/Icon/IconCircleDollarSign";
import { JobCardWrapper } from "./styled";
import { Heart } from "feather-icons-react";

const JobCard = () => {
  return (
    <JobCardWrapper to={""}>
      <div className="job-wrapper">
        <figure>
          <img src="/assets/images/Thankslab-Logo.png" alt="company logo" />
        </figure>
        <div className="job-info">
          <h4 className="job-name">Frontend Software Engineer (ReactJs)</h4>
          <span className="company-name">Employment Hero</span>
          <p className="job-address">
            <span>Ho Chi Minh</span>
            <span> • </span>
            <span>Remote</span>
          </p>
          <div className="job-salary">
            <IconCircleDollarSign />
            <span>You&apos;ll love it</span>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="info">
          Posted 4 days ago <div className="expiry">(Expires in 24 days)</div>
        </div>
        <div className="apply">
          {/* <div className="status">Applied</div> */}
          <button>Apply now</button>
          <div>
            <Heart />
          </div>
        </div>
      </div>
      {/* <div className="applied">
        Applied on 11/02/2025
        </div> */}
      {/* <div className="expired">
          <span>Expired</span>
        </div> */}
    </JobCardWrapper>
  );
};

export default JobCard;
