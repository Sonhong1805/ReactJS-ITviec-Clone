import { SwitchWrapper } from "./styled";
import { useTranslation } from "react-i18next";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import { routes } from "~/constants/routes";
import { useJobStore } from "~/stores/jobStore";

const SwitchLanguage = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleResetAllSelected } = useJobStore();
  const handleLanguage = (language: "en" | "vi") => {
    i18n.changeLanguage(language);
    if (location.pathname === routes.ITJobs) {
      const searchParam: Record<string, string> = {
        city: searchParams.get("city") || "",
        keyword: searchParams.get("keyword") || "",
      };
      const filteredParams = Object.fromEntries(
        Object.entries(searchParam).filter(([_, value]) => value !== "")
      );
      handleResetAllSelected();
      navigate({
        pathname: routes.ITJobs,
        search: createSearchParams(filteredParams).toString(),
      });
    }
  };
  return (
    <SwitchWrapper>
      <div className="language-input">
        <input
          type="radio"
          id="en"
          name="language"
          onChange={() => handleLanguage("en")}
        />
        <label htmlFor="en">EN</label>
      </div>
      <div className="reparate"></div>
      <div className="language-input">
        <input
          type="radio"
          id="vi"
          name="language"
          onChange={() => handleLanguage("vi")}
          defaultChecked
        />
        <label htmlFor="vi">VI</label>
      </div>
    </SwitchWrapper>
  );
};

export default SwitchLanguage;
