import { ProgressBarWrapper } from "./styled";
import profileButtons from "~/constants/profileButtons";
import { useState } from "react";
import { ChevronDown, ChevronUp, PlusCircle } from "feather-icons-react";

const ProgressBar = () => {
  const [toggleButtons, setToggleButtons] = useState(false);

  return (
    <ProgressBarWrapper>
      <div className="progress-bar-card">
        <div className="card-header">
          <h4>Profile Strength</h4>
          <div className="profile-progress">
            <div className="profile-score-progress">
              <div className="progress-background">
                <div
                  className="progress-circle"
                  style={
                    { "--progress-degree": `${9.0}deg` } as React.CSSProperties
                  }></div>
              </div>
              <div className="percentage-text">
                5%
                <div className="text">completed</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="message">
            <div className="speech-bubble">
              Complete profile to <span>70%</span> to generate CV template for
              IT professionals.
            </div>
            <figure>
              <img src="/assets/svg/robby-welcome.svg" alt="robby welcome" />
            </figure>
          </div>
          <div
            className={`group-button`}
            style={{ maxHeight: toggleButtons ? "320px" : "120px" }}>
            {profileButtons.map((button) => (
              <div className="add-button" key={button.value}>
                <PlusCircle />
                <p>{button.label}</p>
              </div>
            ))}
          </div>
          <div
            className="toogle-button"
            onClick={() => setToggleButtons(!toggleButtons)}>
            {toggleButtons ? <ChevronUp /> : <ChevronDown />}
            <p>{toggleButtons ? "Show less" : "Add more information"}</p>
          </div>
        </div>
        <div className="card-footer"></div>
      </div>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
