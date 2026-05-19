import { j as jsxRuntimeExports } from './jsx-runtime-BMWpmvRY.js';
import { l as lapDurationSecs, m as maxLaps } from './race--XsfwnTx.js';
import './index-D-C7wG_k.js';

function StatBlock({
  label,
  value,
  sub,
  valueClass = "text-white"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-center px-5 border-b border-neutral-800 last:border-b-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs tracking-widest text-neutral-400 uppercase mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-black text-6xl leading-none ${valueClass}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-neutral-500 mt-1", children: sub })
  ] });
}
function StatsPanel({ config, state }) {
  const lap = state.phase === "racing" ? state.currentLap ?? 1 : 1;
  const dur = Math.ceil(lapDurationSecs(config, lap) / 60);
  const mx = maxLaps(config);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col bg-neutral-900 border-l border-neutral-800 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-black border-b border-neutral-800 font-mono text-xs tracking-widest text-neutral-500", children: "// STATS" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatBlock,
      {
        label: "Varv",
        value: state.phase === "racing" ? lap : "—",
        sub: "Aktuellt",
        valueClass: "text-lime-300"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatBlock, { label: "Varvtid", value: `${dur} min`, sub: "Tillgänglig tid" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatBlock,
      {
        label: "Max varv",
        value: mx,
        sub: "Om varvtid → 0",
        valueClass: "text-orange-400"
      }
    )
  ] });
}

export { StatsPanel };
//# sourceMappingURL=StatsPanel-B0wY9dAx.js.map
