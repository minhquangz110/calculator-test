import { useState } from "react";

type IUseFadeAnimationReturn = [
  string,
  {
    fadeIn: () => void;
    fadeOut: () => void;
    toggle: () => void;
  }
];

export const useFadeAnimation = (): IUseFadeAnimationReturn => {
  const [isFadeIn, setIsFadeIn] = useState(false);
  const _fadeIn = () => {
    setIsFadeIn(true);
  };
  const _fadeOut = () => {
    setIsFadeIn(false);
  };
  const _toggle = () => {
    if (isFadeIn) {
      _fadeOut();
    } else {
      _fadeIn();
    }
  };
  return [
    isFadeIn ? "fadeIn" : "fadeOut",
    {
      fadeIn: _fadeIn,
      fadeOut: _fadeOut,
      toggle: _toggle,
    },
  ];
};
