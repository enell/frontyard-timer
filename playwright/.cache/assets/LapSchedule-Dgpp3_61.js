import { j as jsxRuntimeExports } from './jsx-runtime-BMWpmvRY.js';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { r as reactExports } from './index-D-C7wG_k.js';
import { f as formatTempo } from './format-D2piKjyT.js';
import { m as maxLaps, b as buildLapSchedule } from './race--XsfwnTx.js';

function LapSchedule({ config, state }) {
  const currentLap = state.phase === "racing" ? state.currentLap ?? 1 : null;
  const mx = maxLaps(config);
  const laps = buildLapSchedule(config, mx);
  const currentRowRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    currentRowRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, [currentLap]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col bg-black border-r border-neutral-800 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 border-b border-neutral-800 text-neutral-500 text-xs font-mono tracking-widest flex-shrink-0", children: "LAPS" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs font-mono", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-black border-b border-neutral-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-1 text-neutral-500 font-normal", children: "Lap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-1 text-neutral-500 font-normal", children: "Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-1 text-neutral-500 font-normal", children: "Tempo" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: laps.map(({ lap, durationSecs }) => {
        const isNow = state.phase === "racing" && lap === currentLap;
        const isPast = state.phase === "racing" && currentLap !== null && lap < currentLap || state.phase === "done";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            ref: isNow ? currentRowRef : void 0,
            className: clsx(
              "border-b border-neutral-900",
              isNow && "bg-white text-black",
              isPast && !isNow && "opacity-30"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: clsx(
                    "px-3 py-1.5 font-bold",
                    !isNow && "text-neutral-300"
                  ),
                  children: lap
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "td",
                {
                  className: clsx(
                    "px-3 py-1.5 text-right",
                    !isNow && "text-neutral-300"
                  ),
                  children: [
                    Math.ceil(durationSecs / 60),
                    " min"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "td",
                {
                  className: clsx(
                    "px-3 py-1.5 text-right",
                    !isNow && "text-neutral-400"
                  ),
                  children: [
                    formatTempo(durationSecs, config.distanceKm),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 text-neutral-600", children: "/km" })
                  ]
                }
              )
            ]
          },
          lap
        );
      }) })
    ] }) })
  ] });
}

export { LapSchedule };
//# sourceMappingURL=LapSchedule-Dgpp3_61.js.map
