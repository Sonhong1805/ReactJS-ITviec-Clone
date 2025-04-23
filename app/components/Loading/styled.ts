import { styled } from "styled-components";

export const LoadingWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: radial-gradient(#ffffff59 100%, transparent);

  .spinner {
    width: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(farthest-side, var(--i-danger) 94%, #0000)
        top/8px 8px no-repeat,
      conic-gradient(#0000 30%, var(--i-danger));
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(100% - 8px),
      #000 0
    );
  }
`;
