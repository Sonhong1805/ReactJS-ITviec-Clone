import React from "react";
import { useTranslation } from "react-i18next";
import { SkillsWrapper, SuggestList, SuggestSkills } from "./styled";
import { Link } from "react-router";

const SkillsList = () => {
  const { t } = useTranslation(["home"]);

  return (
    <SkillsWrapper>
      <SuggestSkills>{t("Suggestions")}</SuggestSkills>
      <SuggestList>
        {/* {tags.slice(0, 8).map((tag) => (
          <li key={tag.key}>
            <Link to={`/search?keywords=${tag.value}`}>{tag.value}</Link>
          </li>
        ))} */}
        <li>
          <Link to={""}>Java</Link>
        </li>
        <li>
          <Link to={""}>ReactJS</Link>
        </li>
        <li>
          <Link to={""}>.NET</Link>
        </li>
        <li>
          <Link to={""}>Tester</Link>
        </li>
        <li>
          <Link to={""}>PHP</Link>
        </li>
        <li>
          <Link to={""}>Business Analyst</Link>
        </li>
        <li>
          <Link to={""}>NodeJS</Link>
        </li>
        <li>
          <Link to={""}>Manager</Link>
        </li>
      </SuggestList>
    </SkillsWrapper>
  );
};

export default SkillsList;
