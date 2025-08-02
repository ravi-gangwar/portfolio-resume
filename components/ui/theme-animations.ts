export type AnimationVariant = "circle" | "gif";
export type AnimationStart = "center" | "top" | "bottom" | "left" | "right";

interface Animation {
  css: string;
  name: string;
}

export function createAnimation(
  variant: AnimationVariant,
  start: AnimationStart,
  url: string
): Animation {
  if (variant === "gif") {
    return createGifAnimation(start, url);
  }
  return createCircleAnimation(start);
}

function createGifAnimation(start: AnimationStart, url: string): Animation {
  const positions = {
    center: "50% 50%",
    top: "50% 0%",
    bottom: "50% 100%",
    left: "0% 50%",
    right: "100% 50%",
  };

  const css = `
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }

    ::view-transition-old(root) {
      z-index: 1;
    }

    ::view-transition-new(root) {
      z-index: 999;
    }

    ::view-transition-old(root)::after {
      content: "";
      position: fixed;
      inset: 0;
      background: url("${url}") center/contain no-repeat;
      background-position: ${positions[start]};
      z-index: 999;
      animation: dance 0.5s ease-in-out;
    }

    @keyframes dance {
      0% {
        transform: scale(0) rotate(0deg);
        opacity: 0;
      }
      50% {
        transform: scale(1.2) rotate(180deg);
        opacity: 1;
      }
      100% {
        transform: scale(1) rotate(360deg);
        opacity: 0;
      }
    }
  `;

  return { css, name: "gif-dance" };
}

function createCircleAnimation(start: AnimationStart): Animation {
  const positions = {
    center: "50% 50%",
    top: "50% 0%",
    bottom: "50% 100%",
    left: "0% 50%",
    right: "100% 50%",
  };

  const css = `
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }

    ::view-transition-old(root) {
      z-index: 1;
    }

    ::view-transition-new(root) {
      z-index: 999;
    }

    ::view-transition-old(root)::after {
      content: "";
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at ${positions[start]}, #00d184 0%, transparent 50%);
      z-index: 999;
      animation: circle-expand 0.5s ease-out;
    }

    @keyframes circle-expand {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;

  return { css, name: "circle-expand" };
} 