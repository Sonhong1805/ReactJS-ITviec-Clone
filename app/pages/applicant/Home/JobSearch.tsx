import { useEffect, useState } from "react";
import { BackgroundSearch, ContainerSearch, Heading } from "./styled";
import { useTranslation } from "react-i18next";
import SearchForm from "~/components/SearchForm";
import SkillsList from "~/components/SkillsList";
import { useUserStore } from "~/stores/userStore";
import jobService from "~/services/jobService";

const JobSearch = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const { isAuthenticated, user } = useUserStore();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await jobService.getQuantity();
      if (response.isSuccess && response.data) {
        setQuantity(response.data);
      }
    })();
  }, []);

  return (
    <BackgroundSearch>
      <ContainerSearch>
        <Heading>
          {language === "en" ? (
            isAuthenticated ? (
              <>
                {quantity} IT Jobs &quot;Chất&quot; {user.username}
              </>
            ) : (
              <>{quantity} IT Jobs For &quot;Chất&quot; Developers</>
            )
          ) : isAuthenticated ? (
            <>
              {quantity} Việc Làm IT &quot;Chất&quot; Dành Cho {user.username}
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
