import { styled } from "styled-components";

export const SearchFilterContainer = styled.div`
  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 4.2rem;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.06);
  border-radius: 0.8rem;
  padding: 1.6rem;
  background-color: var(--i-white);
  margin-block: 1.6rem;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
    gap: 0.4rem;
    background-color: var(--i-white);
    border-color: var(--i-dark-grey);
    font-size: 1.6rem;
    font-weight: 400;
    padding: 0.6rem 1.2rem;
    max-width: 9.724rem;
    border-radius: 4px;
    position: relative;

    .count {
      position: absolute;
      right: -1rem;
      top: -1rem;
      background: var(--i-warning-color);
      color: var(--i-white);
      border-radius: 100rem;
      width: 2rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.4rem;
    }
  }
`;

export const BoxFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const SalaryFilterWrapper = styled.div`
  .salary {
    padding-top: 1.6rem;
    padding-bottom: 0.8rem;

    span {
      display: inline-block;
      margin-bottom: 0.8rem;
      font-size: 1.6rem;
      color: var(--i-gray-900);
    }
  }

  .range {
    padding-inline: 1rem;
  }

  button {
    font-size: 1.6rem;
    font-weight: 500;
    padding: 0.7rem 2rem;
    border-radius: 0.4rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
    user-select: none;
    border: 1px solid transparent;
    gap: 0.8rem;
    margin-top: 1.6rem;
    color: var(--i-red);
    background-color: var(--i-white);
    border-color: var(--i-red);
    min-width: 100%;

    &:hover {
      color: var(--i-red);
      background-color: var(--i-white-red);
      border-color: var(--i-red);
    }
  }
`;

export const BoxIndustry = styled.div`
  .box-dropdown-container {
    padding: 0;

    .input-wrapper {
      padding: 1.6rem 1.6rem 0.4rem;
    }
  }

  .input-search-dropdown {
    border: none;
    margin-bottom: 16px;
    margin-right: 16px;

    &.empty {
      padding-block: 0;
    }
  }
`;

export const ClearFilter = styled.div`
  a {
    font-size: 1.6rem;
    color: var(--i-rich-grey);
    text-decoration: underline;
    text-decoration-color: var(--i-rich-grey);
    padding-left: 0.8rem;
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    borderRadius: ".7rem",
  },
};

export const ModalForm = styled.form`
  max-width: 80rem;
`;

export const ModalHead = styled.div`
  padding: 1.6rem 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--i-rich-grey);
  border-bottom: 1px solid var(--i-gray-300);

  h2 {
    font-size: 2.2rem;
  }

  svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--i-dark-grey);
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  padding: 0 3.2rem 3.2rem;
  max-height: 50rem;
  overflow-y: auto;
`;

export const ModalContainer = styled.div`
  padding-top: 3.2rem;

  h4 {
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
    line-height: 1;
  }

  .modal-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  input:checked + label {
    border: 1px solid var(--i-red);
    background-color: var(--i-white-red);
    color: var(--i-red);

    svg {
      color: var(--i-red);
    }
  }

  span.salary {
    font-size: 1.6rem;
    color: var(--i-rich-grey);
    padding-right: 1.2rem;
    width: 25%;
  }

  .range {
    flex: 1;
    border: 1px solid var(--i-silver-grey);
    background-color: var(--i-white);
    border-radius: 2rem;
    padding: 1.6rem 2.6rem;
    max-width: 55rem;
  }
`;

export const ModalLabel = styled.label`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  font-size: 1.6rem;
  gap: 0.8rem;
  border-radius: 2rem;
  border: 1px solid var(--i-silver-grey);
  margin-block: 0.8rem;
  margin-right: 0.8rem;
  cursor: pointer;
  color: var(--i-rich-grey);

  &:hover {
    color: var(--i-black);
    border: 1px solid var(--i-black);
  }

  svg {
    color: var(--i-dark-grey);
  }
`;

export const ModalFoot = styled.div`
  padding: 1.6rem 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--i-gray-300);

  div {
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--i-hyperlink);
    margin: 0.4rem;
    cursor: pointer;
  }

  button {
    color: var(--i-white);
    padding: 1.4rem 2.4rem;
    background: var(--i-red);
    font-size: 1.6rem;
    min-width: 18rem;
    border-radius: 0.4rem;
    font-weight: 600;
    margin: 0.4rem;
  }
`;
