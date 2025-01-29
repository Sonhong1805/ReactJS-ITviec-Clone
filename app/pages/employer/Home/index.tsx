import { HomeWrapper } from "./styled";

import HireTheBestIT from "./HireTheBestIT";
import ITviecDifferent from "./ITviecDifferent";
import HightValueServices from "./HightValueServices";
import TopEmployers from "./TopEmployers";
import EmployerContact from "./EmployerContact";
import BlogPosts from "./BlogPosts";

const Home = () => {
  return (
    <HomeWrapper>
      <HireTheBestIT />
      <ITviecDifferent />
      <HightValueServices />
      <TopEmployers />
      <EmployerContact />
      <BlogPosts />
    </HomeWrapper>
  );
};

export default Home;
