import { useEffect, useState } from "react";
import {
  EmployerBg,
  EmployerButtonGroup,
  EmployerButtons,
  EmployerContainer,
  EmployerGroup,
  EmployerInfo,
  EmployerShow,
  EmployerSticky,
} from "./styled";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useCompanyStore } from "~/stores/companyStore";
import companyService from "~/services/companyService";
import showToast from "~/utils/showToast";
import { Briefcase, Check, MapPin, X } from "feather-icons-react";
import { useUserStore } from "~/stores/userStore";
import { useReviewStore } from "~/stores/reviewStore";

interface IProps {
  data: Company;
  jobs?: Job[];
}

const Employer = ({ data, jobs }: IProps) => {
  const { t } = useTranslation(["search"]);
  const [isSticky, setIsSticky] = useState(false);
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const { isFollowing, handleSaveFollow } = useCompanyStore();
  const { isReviewing, handleSaveReview } = useReviewStore();

  useEffect(() => {
    if (data.follow) {
      handleSaveFollow(data.follow);
    }
    if (data.review) {
      handleSaveReview(data.review);
    }
    return () => {
      handleSaveFollow(false);
      handleSaveReview(false);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 290);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToglleFollow = async () => {
    if (!isAuthenticated) {
      navigate(`/login?company=${data.slug + ""}`);
      return;
    }
    const response = await companyService.follow(data.id);
    if (response.isSuccess) {
      handleSaveFollow(response.data);
      if (response.data) {
        showToast("success", t("Follow successfully"));
      } else {
        showToast("success", t("Unfollow successfully"));
      }
    }
  };

  return (
    <>
      <EmployerBg>
        <EmployerContainer>
          <Link to={"/company/" + data.slug} className="company-logo">
            <img
              src={
                data.logo === null
                  ? "/assets/svg/avatar-default.svg"
                  : data.logo + ""
              }
              alt="company logo"
            />
          </Link>
          <EmployerInfo>
            <h1>{data.companyName}</h1>
            <EmployerGroup>
              <EmployerShow>
                <MapPin />
                <span>{t(data.location, { ns: "option" })}</span>
              </EmployerShow>
              <EmployerShow>
                <Briefcase />
                <span className="quantity">
                  {jobs?.length} {t("job openings")}
                </span>
              </EmployerShow>
            </EmployerGroup>
            <EmployerButtonGroup>
              <EmployerButtons $review>
                {isReviewing ? (
                  <button className="btn-reviewed" disabled>
                    <Check />
                    {t("Reviewed")}
                  </button>
                ) : isAuthenticated ? (
                  <Link to={`/review/${data.slug}`}>{t("Write review")}</Link>
                ) : (
                  <Link to={`/login?review=${data.slug}`}>
                    {t("Write review")}
                  </Link>
                )}
              </EmployerButtons>
              <EmployerButtons>
                {isFollowing ? (
                  <div className="follow-group">
                    <button className="btn-followed">
                      <Check />
                      <span>{t("Following")}</span>
                    </button>
                    <button
                      className="btn-unfollow"
                      onClick={handleToglleFollow}>
                      <X />
                      <span>{t("Unfollow")}</span>
                    </button>
                  </div>
                ) : (
                  <button className="btn-follow" onClick={handleToglleFollow}>
                    {t("Follow")}
                  </button>
                )}
              </EmployerButtons>
            </EmployerButtonGroup>
          </EmployerInfo>
        </EmployerContainer>
      </EmployerBg>
      {isSticky && (
        <EmployerSticky>
          <EmployerContainer>
            <div className="employer">
              <div className="employer-name">
                <h3>{data.companyName}</h3>
              </div>
              <div className="employer-buttons">
                <EmployerButtons $review>
                  {isReviewing ? (
                    <button className="btn-reviewed" disabled>
                      <Check />
                      {t("Reviewed")}
                    </button>
                  ) : (
                    <Link to={`/review/${data.slug}`}>{t("Write review")}</Link>
                  )}
                </EmployerButtons>
                <EmployerButtons>
                  {isFollowing ? (
                    <div className="follow-group">
                      <button className="btn-followed">
                        <Check />
                        <span>{t("Following")}</span>
                      </button>
                      <button
                        className="btn-unfollow"
                        onClick={handleToglleFollow}>
                        <X />
                        <span>{t("Unfollow")}</span>
                      </button>
                    </div>
                  ) : (
                    <button className="btn-follow" onClick={handleToglleFollow}>
                      {t("Follow")}
                    </button>
                  )}
                </EmployerButtons>
              </div>
            </div>
          </EmployerContainer>
        </EmployerSticky>
      )}
    </>
  );
};

export default Employer;
