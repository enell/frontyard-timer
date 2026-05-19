import { j as jsxRuntimeExports } from './jsx-runtime-BMWpmvRY.js';
import { d as formatWallClock, e as formatWallDate } from './format-D2piKjyT.js';
import './index-D-C7wG_k.js';

function TopBar({ now, lapBadge }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between px-6 bg-neutral-900 border-b border-neutral-800 h-full",
      style: { boxShadow: "0 1px 0 rgba(190,242,100,0.08)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-black text-3xl tracking-widest text-lime-300 uppercase",
            style: { textShadow: "0 0 20px rgba(190,242,100,0.4)" },
            children: "Frontyard Ultra"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "bg-lime-300 text-black font-black text-3xl px-8 py-1 tracking-widest rounded-sm",
            style: { boxShadow: "0 0 20px rgba(190,242,100,0.5)" },
            children: lapBadge
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-bold text-3xl tracking-wider", children: formatWallClock(now) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-neutral-400 tracking-wide", children: formatWallDate(now) })
        ] })
      ]
    }
  );
}

export { TopBar };
//# sourceMappingURL=TopBar-DFpLnXPP.js.map
