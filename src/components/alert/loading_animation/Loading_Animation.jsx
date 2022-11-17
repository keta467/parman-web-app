import React from "react";
import style from "./Loading_Animation.module.css";
export default function Loading_Animation({ isShowLoadingAnimation }) {
  return (
    <>
      {isShowLoadingAnimation ? (
        <div className={style.loading_animation}>
          <svg className={style.ring} viewBox="25 25 50 50" strokeWidth="5">
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
