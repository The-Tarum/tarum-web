import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Search } from "./Search";

export const Tab = ({
  showIcon = true,
  text = "Home",
  stateProp,
  hierarchy,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "outline",

    hierarchy: hierarchy || "primary",
  });

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md justify-center relative ${state.state === "outline" ? "border border-solid" : ""} ${state.hierarchy === "primary" && state.state === "outline" ? "border-[#d2d6db26]" : (state.hierarchy === "secondary" && state.state === "outline") ? "border-gray-neutral-500" : ""} ${state.state === "active" && state.hierarchy === "primary" ? "bg-[#f8d45d]" : (state.state === "active" && state.hierarchy === "secondary") ? "bg-primary-dark500" : ""}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="inline-flex items-center gap-1.5 flex-[0_0_auto] justify-center relative">
        {showIcon && (
          <Search
            className="!relative !w-4 !h-4"
            color={
              state.hierarchy === "secondary" && state.state === "outline"
                ? "#1F2A37"
                : state.state === "active" && state.hierarchy === "primary"
                  ? "#00447C"
                  : state.state === "active" && state.hierarchy === "secondary"
                    ? "white"
                    : "#D2D6DB"
            }
          />
        )}

        <div
          className={`font-body-medium-12 w-fit mt-[-1.00px] tracking-[var(--body-medium-12-letter-spacing)] text-[length:var(--body-medium-12-font-size)] [font-style:var(--body-medium-12-font-style)] font-[number:var(--body-medium-12-font-weight)] leading-[var(--body-medium-12-line-height)] whitespace-nowrap relative ${state.hierarchy === "secondary" && state.state === "outline" ? "text-gray-neutral-800" : (state.state === "active" && state.hierarchy === "primary") ? "text-primary-dark500" : state.state === "active" && state.hierarchy === "secondary" ? "text-basewhite" : "text-gray-neutral300"}`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

function reducer(state, action) {
  if (state.hierarchy === "primary" && state.state === "outline") {
    switch (action) {
      case "click":
        return {
          hierarchy: "primary",

          state: "active",
        };
    }
  }

  if (state.hierarchy === "primary" && state.state === "active") {
    switch (action) {
      case "click":
        return {
          hierarchy: "primary",

          state: "outline",
        };
    }
  }

  return state;
}

Tab.propTypes = {
  showIcon: PropTypes.bool,
  text: PropTypes.string,
  stateProp: PropTypes.oneOf(["outline", "active"]),
  hierarchy: PropTypes.oneOf(["primary", "secondary"]),
};