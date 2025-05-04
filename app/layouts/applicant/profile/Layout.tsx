import { Outlet } from "react-router";
import { LayoutContainer, LayoutWrapper } from "./styled";
import Navbar from "./Navbar";
import ProtectedRoutes from "~/contexts/ProtectedRoutes";
import { useUserStore } from "~/stores/userStore";
import { useApplicantQuery } from "~/hooks/useApplicantQuery";
import { useEffect } from "react";
import { useApplicantStore } from "~/stores/applicantStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLocationStore } from "~/stores/locationStore";
import Modal from "react-modal";
import { useWorkingModelStore } from "~/stores/workingModelStore";
import { useTranslation } from "react-i18next";
import { useIndustryStore } from "~/stores/industryStore";

const Layout = () => {
  const { user } = useUserStore();
  const { i18n } = useTranslation();
  const { applicantTmp, handleSaveApplicant } = useApplicantStore();

  const { data: applicant, isPending } = useApplicantQuery(user.id);
  const { handleAddLocations } = useLocationStore();
  const { handleAddExpectedWorkingModels } = useWorkingModelStore();
  const { handleAddIndustryExperiences } = useIndustryStore();

  useEffect(() => {
    if (!isPending && applicant) {
      handleSaveApplicant(applicantTmp.id ? applicantTmp : applicant);
      const locations =
        applicant?.locations.map(({ location }) => ({
          value: location,
          label: location,
        })) || [];
      handleAddLocations(locations);
      const expectedWorkingModels =
        applicant?.expectedWorkingModels?.map(({ name }) => ({
          value: name,
          label: name,
        })) || [];
      handleAddExpectedWorkingModels(expectedWorkingModels);
      const industryExperiences = applicant?.industryExperiences?.map(
        (industry) => {
          return {
            value: industry.id,
            label: i18n.language === "en" ? industry.name_en : industry.name_vi,
          };
        }
      );
      handleAddIndustryExperiences(industryExperiences);
    }
  }, [applicant, i18n.language]);

  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  return (
    <ProtectedRoutes>
      <LayoutWrapper>
        <LayoutContainer>
          {isPending ? (
            <div className="skeleton-loading">
              <Skeleton height={500} width={280} className="navbar"></Skeleton>
              <Skeleton height={500} width={1032} className="outlet"></Skeleton>
            </div>
          ) : (
            <>
              <Navbar />
              <Outlet />
            </>
          )}
        </LayoutContainer>
      </LayoutWrapper>
    </ProtectedRoutes>
  );
};

export default Layout;
