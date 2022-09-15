import React from "react";
import "./Loading_Animation.css";

export default function Loading_Animation({ isShowLoadingAnimation }) {
  return (
    <>
      {isShowLoadingAnimation ? (
        <div className="loading_animation">
          <svg class="ring" viewBox="25 25 50 50" stroke-width="5">
            <circle cx="50" cy="50" r="20" />
          </svg>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

//親要素に position: relative;　必須
