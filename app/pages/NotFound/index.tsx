import SearchForm from "~/components/SearchForm";
import { NotFoundAlert, NotFoundContainer, NotFoundWrapper } from "./styled";
import robbyOops from "/assets/svg/robby-oops.svg";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <NotFoundContainer>
        <img src={robbyOops} alt="robby-oops" />
        <NotFoundAlert>
          <h1>Oops!</h1>
          <h2>This page has found a better job.</h2>
          <p>
            We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t
            exist.
          </p>
          <p>Find your own better job today!</p>
          <SearchForm />
          <p>
            Or go back to <Link to={"/"}>Home</Link> or{" "}
            <Link to={"/"}>Contact us</Link>
          </p>
        </NotFoundAlert>
      </NotFoundContainer>
    </NotFoundWrapper>
  );
};

export default NotFound;
