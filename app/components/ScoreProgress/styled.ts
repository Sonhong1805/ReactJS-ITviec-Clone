import { styled } from "styled-components";

export const ScoreProgressWrapper = styled.div`
  .profile-score-progress {
    min-width: 20rem;
    height: 10rem;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
    --size: 20rem;
    --progress-width: 1.6rem;

    .progress-background {
      width: var(--size);
      aspect-ratio: 2 / 1;
      border-top-left-radius: calc(var(--size) + var(--progress-width));
      border-top-right-radius: calc(var(--size) + var(--progress-width));
      border-width: var(--progress-width) var(--progress-width) 0;
      border-style: solid;
      position: relative;
      border-color: var(--i-light-red);

      .progress-circle {
        width: var(--size);
        aspect-ratio: 2 / 1;
        border-top-left-radius: calc(var(--size) + var(--progress-width));
        border-top-right-radius: calc(var(--size) + var(--progress-width));
        border-width: var(--progress-width) var(--progress-width) 0;
        border-style: solid;
        position: absolute;
        bottom: 0;
        right: calc(-1 * var(--progress-width));
        transform-origin: bottom;
        border-color: var(--i-red);
        animation: progressCircle 0.8s ease-in-out forwards;
      }
    }

    .percentage-text {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      box-shadow: 0 -0.4rem 0.8rem -0.4rem var(--i-silver-grey) inset;
      font-weight: 700;
      font-size: 2.2rem;
      padding-bottom: 0.9rem;
      .text {
        color: var(--i-rich-grey);
        font-size: 1.2rem;
        font-weight: 400;
      }
    }
  }
`;
