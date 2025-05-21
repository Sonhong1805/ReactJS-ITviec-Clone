import { Link } from "react-router";
import {
  ApplicationChart,
  BoxLoading,
  DashboardWrapper,
  GeneralWrapper,
} from "./styled";
import { ChevronRight } from "feather-icons-react";
import { useTranslation } from "react-i18next";
import companyService from "~/services/companyService";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUserStore } from "~/stores/userStore";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const applicationData2024 = [
  { month: "Jan", applications: 120 },
  { month: "Feb", applications: 180 },
  { month: "Mar", applications: 150 },
  { month: "Apr", applications: 200 },
  { month: "May", applications: 250 },
  { month: "Jun", applications: 300 },
  { month: "Jul", applications: 280 },
  { month: "Aug", applications: 260 },
  { month: "Sep", applications: 310 },
  { month: "Oct", applications: 330 },
  { month: "Nov", applications: 290 },
  { month: "Dec", applications: 320 },
];

const Dashboard = () => {
  const { isAuthenticated } = useUserStore();
  const { t } = useTranslation(["search"]);

  const { data, isPending } = useQuery({
    queryKey: ["company-dashboard"],
    queryFn: () => companyService.dashboard(),
    select: ({ data }) => data as CompanyDashboard,
    enabled: isAuthenticated,
  });

  return (
    <DashboardWrapper>
      {isPending && !data ? (
        <Skeleton style={{ minHeight: "8.76rem", marginBottom: "2rem" }} />
      ) : (
        <div className="heading">
          <h2>{t("Dashboard", { ns: "header" })}</h2>
        </div>
      )}
      <GeneralWrapper>
        {isPending && !data ? (
          <BoxLoading>
            <Skeleton style={{ minHeight: "17.3rem" }} />
            <Skeleton style={{ minHeight: "17.3rem" }} />
            <Skeleton style={{ minHeight: "17.3rem" }} />
            <Skeleton style={{ minHeight: "17.3rem" }} />
          </BoxLoading>
        ) : (
          <div className="general-info">
            <div className="general-box info">
              <div className="box-header">
                <h3>
                  {t("Number of jobs:")}{" "}
                  <strong className="counter primary">
                    {data?.job.totalJobs || 0}
                  </strong>
                </h3>
              </div>
              <div className="box-body">
                <div className="title">
                  {t("Active jobs:")}
                  <strong className="counter">
                    {data?.job.jobActive || 0}
                  </strong>
                </div>
                <div className="title">
                  {t("Job has expired:")}
                  <strong className="counter">
                    {data?.job.jobExpired || 0}
                  </strong>
                </div>
              </div>
              <div className="box-footer">
                <Link to="/employer/manage-jobs">
                  {t("View details")}
                  <ChevronRight />
                </Link>
              </div>
            </div>
            <div className="general-box success">
              <div className="box-header">
                <h3>
                  {t("Number of CVs:")}{" "}
                  <strong className="counter primary">
                    {data?.cv.totalCVs || 0}
                  </strong>
                </h3>
              </div>
              <div className="box-body">
                <div className="title">
                  {t("CV accepted:")}
                  <strong className="counter">
                    {data?.cv.cvAccepted || 0}
                  </strong>
                </div>
                <div className="title">
                  {t("CV pending:")}
                  <strong className="counter">{data?.cv.cvPending || 0}</strong>
                </div>
              </div>
              <div className="box-footer">
                <Link to="/employer/manage-cv">
                  {t("View details")}
                  <ChevronRight />
                </Link>
              </div>
            </div>
            <div className="general-box warning">
              <div className="box-header">
                <h3>{t("Number of reviews")}</h3>
              </div>
              <div className="box-body">
                <div className="title">
                  {t("There are")}{" "}
                  <strong className="counter primary">
                    {data?.review.totalReviews || 0}
                  </strong>{" "}
                  {t("Reviews")}
                </div>
              </div>
              <div className="box-footer">
                <Link to="/employer/manage-reviews">
                  {t("View details")}
                  <ChevronRight />
                </Link>
              </div>
            </div>
            <div className="general-box error">
              <div className="box-header">
                <h3>{t("Number of followers:")}</h3>
              </div>
              <div className="box-body">
                <div className="title">
                  {t("There are")}{" "}
                  <strong className="counter primary">
                    {data?.follow.totalFollows || 0}
                  </strong>{" "}
                  {t("people followed")}
                </div>
              </div>
            </div>
          </div>
        )}
        {isPending && !data ? (
          <div style={{ marginBlock: "4.8rem" }}>
            <Skeleton style={{ minHeight: "40rem" }} />
          </div>
        ) : (
          <ApplicationChart>
            <h3>{t("Number of applications per month (Year 2024)")}</h3>
            <ResponsiveContainer>
              <LineChart
                data={applicationData2024}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ApplicationChart>
        )}
      </GeneralWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;
