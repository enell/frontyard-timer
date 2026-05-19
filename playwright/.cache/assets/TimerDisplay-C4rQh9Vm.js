import { j as jsxRuntimeExports } from './jsx-runtime-BMWpmvRY.js';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { a as formatDDHH, b as formatHHMMSS, c as formatMMSS } from './format-D2piKjyT.js';
import { m as maxLaps, l as lapDurationSecs } from './race--XsfwnTx.js';
import './index-D-C7wG_k.js';

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function TimerDisplay({ state, config }) {
  const { phase } = state;
  const mx = maxLaps(config);
  const isFinalLap = phase === "racing" && state.currentLap === mx;
  const isDone = phase === "done";
  const lapLabel = (() => {
    if (phase === "pre") {
      const secsToStart = state.secsToStart ?? 0;
      if (secsToStart >= 86400) {
        const startDate = new Date(config.start);
        return `STARTS ${DAY_NAMES[startDate.getDay()]} ${startDate.getDate()} ${MONTH_NAMES[startDate.getMonth()]}`;
      }
      return "STARTING SOON";
    }
    if (phase === "done") return "RACE DONE";
    return `LAP ${state.currentLap}`;
  })();
  const secsLeft = (() => {
    if (phase === "racing") return state.secsLeft ?? 0;
    if (phase === "pre") return state.secsToStart ?? 0;
    return 0;
  })();
  const digits = (() => {
    if (phase === "pre") {
      const s = state.secsToStart ?? 0;
      if (s >= 86400) return formatDDHH(s);
      if (s > 3600) return formatHHMMSS(s);
    }
    return formatMMSS(secsLeft);
  })();
  const colorClass = (() => {
    if (phase !== "racing") return "text-white";
    const s = state.secsLeft ?? 999;
    if (s < 120) return "text-red-500";
    if (s < 300) return "text-yellow-400";
    return "text-white";
  })();
  const nextLapMinutes = (() => {
    if (phase !== "racing" || isFinalLap || !state.currentLap) return null;
    return Math.ceil(lapDurationSecs(config, state.currentLap + 1) / 60);
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: clsx(
        "h-full flex flex-col items-center justify-center bg-black",
        isDone && "animate-[alarm_0.5s_ease-in-out_infinite]"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-mono tracking-widest text-neutral-300 mb-6", children: lapLabel }),
        isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-mono font-black text-red-500 tracking-widest text-center",
            style: { fontSize: "clamp(3rem, 10vw, 16rem)" },
            children: "LAP CLOSED"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: clsx(
              "font-mono font-black tabular-nums leading-none",
              colorClass
            ),
            style: { fontSize: "clamp(5rem, 16vw, 40rem)" },
            children: digits
          }
        ),
        nextLapMinutes !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-8 text-sm font-mono text-neutral-400 tracking-wide", children: [
          "Next lap: ",
          nextLapMinutes,
          " min"
        ] })
      ]
    }
  );
}

export { TimerDisplay };
//# sourceMappingURL=TimerDisplay-C4rQh9Vm.js.map
