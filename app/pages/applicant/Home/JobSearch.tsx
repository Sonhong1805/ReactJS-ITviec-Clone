import React, { useState } from "react";
import { BackgroundSearch, ContainerSearch, Heading } from "./styled";
import { useTranslation } from "react-i18next";
import SearchForm from "~/components/SearchForm";
import SkillsList from "~/components/SkillsList";

const JobSearch = () => {
  const [quantity, setQuantity] = useState(0);
  const { i18n } = useTranslation();
  const language = i18n.language;

  const username = "Son";
  return (
    <BackgroundSearch>
      <ContainerSearch>
        <Heading>
          {language === "en" ? (
            username ? (
              <>
                {quantity} IT Jobs &quot;Chất&quot; {username}
              </>
            ) : (
              <>{quantity} IT Jobs For &quot;Chất&quot; Developers</>
            )
          ) : username ? (
            <>
              {quantity} Việc Làm IT &quot;Chất&quot; Dành Cho {username}
            </>
          ) : (
            <>{quantity} Việc làm IT cho Developer &quot;Chất&quot;</>
          )}
        </Heading>
        <SearchForm />
        <SkillsList />
      </ContainerSearch>
      <img
        src="/assets/webp/tet-background.webp"
        className="tet-background"
        alt="tet background"
      />
      <img
        src="/assets/webp/tet25-tiny.webp"
        className="tet25-tiny"
        alt="tet25 tiny"
      />
    </BackgroundSearch>
  );
};

export default JobSearch;
