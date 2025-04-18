import { BackgroundBlog, MainContainer, TopBlogsWrapper } from "./styled";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import blogs from "~/constants/blogs";
import { ChevronRight } from "feather-icons-react";

const TopBlogs = () => {
  const { t } = useTranslation(["home"]);
  return (
    <BackgroundBlog>
      <MainContainer>
        <TopBlogsWrapper>
          <div className="blog-heading">
            <div className="h1">{t("Featured articles")}</div>
            <Link to={"https://itviec.com/blog/"} className="link">
              {t("View all articles")}
              <ChevronRight />
            </Link>
          </div>
          <div className="blog-posts">
            {blogs.map((blog) => (
              <Link to={blog.href} className="blog-item" key={blog.id}>
                <div>
                  <figure>
                    <img src={blog.img} alt={blog.title} />
                  </figure>
                  <div className="blog-body">
                    <div className="blog-title">
                      <h2>{blog.title}</h2>
                      {blog.content && <p>{blog.content}</p>}
                    </div>
                  </div>
                </div>
                <div className="blog-link">
                  <span className="link">
                    {t("Start reading")}
                    <ChevronRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </TopBlogsWrapper>
      </MainContainer>
    </BackgroundBlog>
  );
};

export default TopBlogs;
