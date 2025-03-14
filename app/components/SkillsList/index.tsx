import { useTranslation } from "react-i18next";
import { SkillsWrapper, SuggestList, SuggestSkills } from "./styled";
import { Link } from "react-router";
import { useSkillStore } from "~/stores/skillStore";

const SkillsList = () => {
  const { t } = useTranslation(["home"]);
  const skills = useSkillStore((s) => s.skills);

  return (
    <SkillsWrapper>
      <SuggestSkills>{t("Suggestions")}</SuggestSkills>
      <SuggestList>
        {skills?.slice(0, 8).map((skill) => (
          <li key={skill.id}>
            <Link to={""}>{skill.name}</Link>
          </li>
        ))}
      </SuggestList>
    </SkillsWrapper>
  );
};

export default SkillsList;
