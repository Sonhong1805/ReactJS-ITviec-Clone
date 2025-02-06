import CampaignHighlight from "./CampaignHighlight";
import TopBlogs from "./TopBlogs";
import JobSearch from "./JobSearch";
import TopEmployers from "./TopEmployers";

const Home = () => {
  return (
    <>
      <JobSearch />
      <CampaignHighlight />
      <TopEmployers />
      <TopBlogs />
    </>
  );
};

export default Home;
