import { BlogPostsWrapper, BlogSalaryWrapper } from "./styled";
import { Link } from "react-router";
import { FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import posts from "~/constants/posts";

const BlogPosts = () => {
  const { t } = useTranslation(["home"]);
  return (
    <BlogPostsWrapper>
      <div className="blog-posts-container">
        <div className="blog-heading">
          <p>{t("Useful resources for Employers")}</p>
          <Link
            to={
              "https://itviec.com/blog/danh-cho-nha-tuyen-dung-it/?itm_campaign=category&itm_medium=blog_article&itm_source=employer_page_vi"
            }>
            {t("See more articles")}
            <FiChevronRight />
          </Link>
        </div>
        <div className="blog-posts">
          {posts.map((post) => (
            <Link to={post.href} className="blog-item" key={post.id}>
              <figure>
                <img src={post.img} alt={post.alt} />
              </figure>
              <div className="blog-body">
                <div className="blog-title">
                  <h2>
                    <span>{post.title}</span>
                  </h2>
                </div>
                <div className="blog-link">
                  <span>
                    {t("Start reading")}
                    <FiChevronRight />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="separator"></div>
        <BlogSalaryWrapper>
          <figure>
            <img
              src="/assets/images/salary-report-cover-official-vn.png"
              alt="salary report cover official vn"
            />
          </figure>
          <div className="blog-salary-content">
            <div className="h1">
              {t("IT Salary & Recruitment Market Report")}
            </div>
            <p>
              {t(
                "Discover key insights from Vietnam's IT market in our latest report. Dive into IT salaries, hiring demand trends, job expectation, and the job search journey of professionals across 30+ IT roles."
              )}
            </p>
            <Link to="https://itviec.com/bao-cao/luong-it-va-thi-truong-tuyen-dung-it-vietnam">
              {t("Download now")} <FiChevronRight />
            </Link>
          </div>
        </BlogSalaryWrapper>
      </div>
    </BlogPostsWrapper>
  );
};

export default BlogPosts;
