import React from "react";
import UPLOADED_RESUME from "/assets/svg/uploaded-resume.svg";
import { Link } from "react-router";
import { FiUpload } from "react-icons/fi";
import { YourCVWrapper } from "./styled";

const YourCV = () => {
  return (
    <YourCVWrapper>
      <h3>Your CV</h3>
      <div className="cv-link">
        <figure>
          <img src={UPLOADED_RESUME} alt="uploaded resume" />
        </figure>
        <div className="profile-link">
          <Link to={""} className="filename">
            NGUYEN-HONG-SON-CV.pdf
          </Link>
          <p>Last uploaded: 12/02/2025</p>
        </div>
      </div>
      <div className="upload-file">
        <label htmlFor="file">
          <input type="file" id="file" hidden />
          <FiUpload />
          <div className="selected-file">Upload CV</div>
        </label>
        <div className="file-alert">
          Please upload a .doc, .docx, or .pdf file, maximum 3MB and no password
          protection
        </div>
      </div>
    </YourCVWrapper>
  );
};

export default YourCV;
