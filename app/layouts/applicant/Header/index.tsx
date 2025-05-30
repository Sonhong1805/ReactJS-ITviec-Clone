import { useEffect, useRef, useState } from "react";
import {
  HeaderAccount,
  HeaderContainer,
  HeaderList,
  HeaderListItem,
  HeaderNavbar,
  HeaderSubmenu,
  LogoLink,
  MenuLink,
  ProfileSubmenu,
  StyledHeader,
} from "./styled";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Logo from "/assets/images/logo.png";
import SwitchLanguage from "~/components/SwitchLanguage";
import { useUserStore } from "~/stores/userStore";
import userLinks from "~/constants/userLinks";
import authService from "~/services/authService";
import cities from "~/constants/cities";
import { useQuery } from "@tanstack/react-query";
import { useSkillStore } from "~/stores/skillStore";
import { useCompanyStore } from "~/stores/companyStore";
import { ChevronDown, ChevronRight, LogOut } from "feather-icons-react";
import { useReviewStore } from "~/stores/reviewStore";
import { useJobStore } from "~/stores/jobStore";
import employerLinks from "~/constants/employerLinks";
import companyService from "~/services/companyService";
import { useSkillsQuery } from "~/hooks/useSkillsQuery";

const Header = () => {
  const { t, i18n } = useTranslation(["header"]);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useUserStore();
  const { companies, handleSaveFollow, handleSaveCompanies } =
    useCompanyStore();
  const { handleSaveReview } = useReviewStore();
  const saveSkills = useSkillStore((s) => s.saveSkills);
  const { handleResetJobs } = useJobStore();

  const headerContainerRef = useRef<HTMLDivElement | null>(null);
  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleLogout = async () => {
    const response = await authService.logout();
    if (response.isSuccess) {
      localStorage.removeItem("access_token");
      logout();
      handleResetJobs();
      handleSaveFollow(false);
      handleSaveReview(false);
    }
  };

  const { data: skills, isSuccess } = useSkillsQuery("");

  useEffect(() => {
    if (isSuccess && skills) {
      saveSkills(skills);
    }
  }, [isSuccess, skills, saveSkills]);

  const { data: companiesData } = useQuery({
    queryKey: ["companies"],
    queryFn: companyService.getAll,
    select: ({ data }) => data as Company[],
  });

  useEffect(() => {
    if (companiesData) {
      handleSaveCompanies(companiesData);
    }
  }, [companiesData]);

  const handleSubmenuItem = (
    field: "keyword" | "city" | "company",
    value: string
  ) => {
    if (field === "keyword" || field === "city") {
      navigate(`/it-jobs?${field}=${value}`);
    } else if (field === "company") {
      navigate(`/${field}/${value}`);
    }
  };

  return (
    <StyledHeader>
      <HeaderContainer ref={headerContainerRef}>
        <LogoLink to="/">
          <img src={Logo} />
        </LogoLink>
        <HeaderNavbar>
          <HeaderList>
            <HeaderListItem onMouseEnter={() => handleMouseEnter(0)}>
              <MenuLink to={"/"}>
                {t("All Jobs.value")}{" "}
                <ChevronDown size={24} className="arrow-down" />
              </MenuLink>
              <HeaderSubmenu className={`submenu active-${activeIndex}`}>
                <li
                  className={`submenu-item ${
                    activeIndex === 1 ? "active skills" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(1)}>
                  <span>{t("All Jobs.skills")}</span>
                  <ChevronRight />
                  <ul className="submenu-child skills">
                    {skills?.slice(0, 32).map((skill) => (
                      <li
                        key={skill.id}
                        onClick={() =>
                          handleSubmenuItem("keyword", skill.name)
                        }>
                        {skill.name}
                      </li>
                    ))}
                    <li onClick={() => navigate("/find-job/skill")}>
                      {t("View all Jobs by skill")}
                    </li>
                  </ul>
                </li>
                <li
                  className={`submenu-item ${
                    activeIndex === 2 ? "active" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(2)}>
                  <span>{t("All Jobs.title")}</span>
                  <ChevronRight />
                  <ul className="submenu-child ranks">
                    {skills?.slice(21, 42).map((skill) => (
                      <li key={skill.id}>
                        {i18n.language === "vi"
                          ? `${t("All Jobs.developer")} ${skill.name}`
                          : `${skill.name} ${t("All Jobs.developer")}`}
                      </li>
                    ))}
                    <li>{t("View all Jobs by title")}</li>
                  </ul>
                </li>
                <li
                  className={`submenu-item ${
                    activeIndex === 3 ? "active" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(3)}>
                  <span>{t("All Jobs.company")}</span>
                  <ChevronRight />
                  <ul className="submenu-child cities">
                    {companies.slice(0, 4).map((company) => (
                      <li
                        key={company.id}
                        onClick={() =>
                          handleSubmenuItem("company", company.slug)
                        }>
                        {company.companyName}
                      </li>
                    ))}
                  </ul>
                </li>
                <li
                  className={`submenu-item ${
                    activeIndex === 4 ? "active" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(4)}>
                  <span>{t("All Jobs.city")}</span>
                  <ChevronRight />
                  <ul className="submenu-child cities">
                    {cities.map((city) => (
                      <li
                        key={city.value}
                        onClick={() => handleSubmenuItem("city", city.label)}>
                        {t(city.label, { ns: "option" })}
                      </li>
                    ))}
                  </ul>
                </li>
              </HeaderSubmenu>
            </HeaderListItem>
            <HeaderListItem onMouseEnter={() => handleMouseEnter(0)}>
              <MenuLink to={"/"}>
                {t("IT Companies.value")}{" "}
                <ChevronDown size={24} className="arrow-down" />
              </MenuLink>
              <HeaderSubmenu className={`submenu active-${activeIndex}`}>
                <li
                  className={`submenu-item ${
                    activeIndex === 5 ? "active skills" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(5)}>
                  <span>{t("IT Companies.Best IT Companies")}</span>
                  <ChevronRight />
                  <ul className="submenu-child">
                    <li>{t("IT Companies.Best IT Companies")} 2025</li>
                    <li>{t("IT Companies.Best IT Companies")} 2024</li>
                    <li>{t("IT Companies.Best IT Companies")} 2023</li>
                    <li>{t("IT Companies.Best IT Companies")} 2022</li>
                    <li>{t("IT Companies.Best IT Companies")} 2021</li>
                    <li>{t("IT Companies.Best IT Companies")} 2020</li>
                    <li>{t("IT Companies.Best IT Companies")} 2019</li>
                  </ul>
                </li>
                <li className={`submenu-item`}>
                  <span>{t("IT Companies.Company Reviews")}</span>
                </li>
              </HeaderSubmenu>
            </HeaderListItem>
            <HeaderListItem onMouseEnter={() => handleMouseEnter(0)}>
              <MenuLink to={"/"}>
                Blog <ChevronDown size={24} className="arrow-down" />
              </MenuLink>
              <HeaderSubmenu className={`submenu`}>
                <li className={`submenu-item`}>
                  <span>{t("Blog.IT Salary Report")}</span>
                  <ChevronRight />
                  <ul className="submenu-child">
                    <li>{t("Blog.IT Salary Report")} 2024-2025</li>
                    <li>{t("Blog.IT Salary Report")} 2023-2024</li>
                    <li>{t("Blog.IT Salary Report")} 2022-2023</li>
                  </ul>
                </li>
                <li className={`submenu-item`}>
                  <span>{t("Blog.IT Career")}</span>
                </li>
                <li className={`submenu-item`}>
                  <span>{t("Blog.Applying & Career Up")}</span>
                </li>
                <li className={`submenu-item`}>
                  <span>{t("Blog.IT Expertise")}</span>
                </li>
              </HeaderSubmenu>
            </HeaderListItem>
          </HeaderList>
          <HeaderList $right>
            <HeaderListItem>
              <Link to={"/employer"} className="employer" target="_blank">
                {t("For Employers")}
              </Link>
            </HeaderListItem>
            {isAuthenticated && (
              <HeaderListItem>
                <HeaderAccount>
                  <figure className="avatar">
                    <img
                      src={
                        user.avatar
                          ? user.avatar
                          : "/assets/svg/avatar-default.svg"
                      }
                      alt="avatar"
                      referrerPolicy="no-referrer"
                    />
                  </figure>
                  <span className="username">{user.username}</span>
                  <ChevronDown className="arrow" />
                  <ProfileSubmenu className="submenu">
                    {user.role === "COMPANY"
                      ? employerLinks.map((link) => (
                          <Link key={link.id} to={link.url}>
                            {link.icon}
                            <span>{t(link.label, { ns: "header" })}</span>
                          </Link>
                        ))
                      : userLinks.map((link) => (
                          <Link key={link.id} to={link.url}>
                            {link.icon}
                            <span>{t(link.label, { ns: "profile" })}</span>
                          </Link>
                        ))}
                    <a onClick={handleLogout}>
                      <LogOut />
                      <span>{t("Sign out")}</span>
                    </a>
                  </ProfileSubmenu>
                </HeaderAccount>
              </HeaderListItem>
            )}
            {!isAuthenticated &&
              location.pathname !== "/login" &&
              location.pathname !== "/register" && (
                <HeaderListItem>
                  <Link to={"/login"} className="employer">
                    {t("Sign in/Sign up")}
                  </Link>
                </HeaderListItem>
              )}
            <SwitchLanguage />
          </HeaderList>
        </HeaderNavbar>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
