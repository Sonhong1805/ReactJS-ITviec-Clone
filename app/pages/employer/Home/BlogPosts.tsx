import React from "react";
import { BlogPostsWrapper, BlogSalaryWrapper } from "./styled";
import { Link } from "react-router";
import { FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const posts = [
  {
    id: 1,
    img: "/assets/webp/Webinar-1-vippro.webp",
    title: "MB và những dấu ấn của môi trường làm việc bền vững, hạnh phúc",
    alt: "Webinar 1 vippro",
    href: "https://itviec.com/blog/moi-truong-lam-viec-mb/?itm_campaign=featuredpost&itm_medium=footer&itm_source=itviec.com",
  },
  {
    id: 2,
    img: "/assets/webp/Webinar-2-vippro.webp",
    title:
      "Recording and Transcript: [IT Success] Webinar #3 – Power up Productivity and Engagement of IT Teams in Multicultural Working Environment",
    alt: "Webinar 2 vippro",
    href: "https://itviec.com/blog/recording-transcript-webinar3-28052024/?itm_campaign=featuredpost&itm_medium=footer&itm_source=itviec.com",
  },
  {
    id: 3,
    img: "/assets/webp/Webinar-3-vippro.webp",
    title:
      "Recording và Transcript sự kiện [IT Success] Webinar #2: Đo lường và tối ưu năng suất đội ngũ IT trong quá trình phát triển phần mềm",
    alt: "Webinar 3 vippro",
    href: "https://itviec.com/blog/ban-ghi-transcript-webinar2-22052024/?itm_campaign=featuredpost&itm_medium=footer&itm_source=itviec.com",
  },
];

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
                    <Link to={post.href}>{post.title}</Link>
                  </h2>
                </div>
                <div className="blog-link">
                  <Link to={post.href}>
                    {t("Start reading")}
                    <FiChevronRight />
                  </Link>
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
