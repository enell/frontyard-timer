function pad2(n) {
  return String(Math.floor(Math.abs(n))).padStart(2, "0");
}
function formatMMSS(secs) {
  return `${pad2(secs / 60)}:${pad2(secs % 60)}`;
}
function formatHHMMSS(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor(secs % 3600 / 60);
  const s = secs % 60;
  return `${h}:${pad2(m)}:${pad2(s)}`;
}
function formatDDHH(secs) {
  const d = Math.floor(secs / 86400);
  const h = Math.floor(secs % 86400 / 3600);
  return `${d}d ${pad2(h)}h`;
}
function formatTimestamp(ts) {
  const d = new Date(ts);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}
function formatTimestampHHMM(ts) {
  const d = new Date(ts);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
function formatWallClock(d) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}
function formatTempo(durationSecs, distanceKm) {
  const secsPerKm = durationSecs / distanceKm;
  const m = Math.floor(secsPerKm / 60);
  const s = Math.round(secsPerKm % 60);
  return `${m}:${pad2(s)}`;
}
function formatWallDate(d) {
  const days = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "maj",
    "jun",
    "jul",
    "aug",
    "sep",
    "okt",
    "nov",
    "dec"
  ];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

export { formatDDHH as a, formatHHMMSS as b, formatMMSS as c, formatWallClock as d, formatWallDate as e, formatTempo as f };
//# sourceMappingURL=format-D2piKjyT.js.map
