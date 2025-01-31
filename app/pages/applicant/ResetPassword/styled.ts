import { styled } from "styled-components";

export const ResetWrapper = styled.div`
  margin-top: 6.4rem;
  padding-inline: 3rem;
  padding-top: 1rem;
`;

export const UserReset = styled.div`
  max-width: 126rem;
  margin: 0 auto 10rem;

  h3 {
    margin-block: 2.4rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    span {
      font-size: 2rem;
      color: var(--i-rich-grey);
    }

    img {
      width: 8rem;
      height: 3rem;
      padding-inline: 0.4rem;
      margin-bottom: 0.4rem;
    }
  }
`;

export const ResetContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(40%, 40rem) 1fr;
  grid-column-gap: 10%;
`;

export const ResetMain = styled.main`
  h1 {
    font-size: 2.8rem;
    color: var(--i-black);
    line-height: 4.2rem;
    margin-bottom: 2.4rem;
  }
`;

export const ResetSubmit = styled.button`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.1rem 2.4rem;
  min-width: 18rem;
  border-radius: 0.4rem;
  color: var(--i-white);
  width: 100%;
  justify-content: center;
  gap: 0.8rem;
  background: var(--i-red);
  margin-bottom: 1.6rem;
  height: 4.76rem;
  border: 1px solid var(--i-red);

  &:hover {
    background: var(--i-dark-red);
  }
`;

export const NoteAccount = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 400;
  margin-top: 4.8rem;

  p {
    padding-inline: 0.4rem;
  }
`;

export const ResetAside = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 32rem;
    height: 31rem;
  }
`;
