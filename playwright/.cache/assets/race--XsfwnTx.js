function lapDurationSecs(config, lap) {
  const mins = config.firstLapMinutes - (lap - 1) * config.decrementMinutes;
  return Math.max(1, mins) * 60;
}
function maxLaps(config) {
  let n = 1;
  while (config.firstLapMinutes - n * config.decrementMinutes >= 1) n++;
  return n;
}
function lapStartTs(config, lap) {
  const startTs = new Date(config.start).getTime();
  let ts = startTs;
  for (let i = 1; i < lap; i++) ts += lapDurationSecs(config, i) * 1e3;
  return ts;
}
function buildLapSchedule(config, count = 12) {
  const laps = [];
  for (let i = 1; i <= count; i++) {
    const dur = lapDurationSecs(config, i);
    if (dur < 60) break;
    laps.push({ lap: i, durationSecs: dur, startTs: lapStartTs(config, i) });
  }
  return laps;
}
function getRaceState(config, nowTs) {
  const startTs = new Date(config.start).getTime();
  if (nowTs < startTs) {
    return {
      phase: "pre",
      secsToStart: Math.ceil((startTs - nowTs) / 1e3)
    };
  }
  let elapsed = (nowTs - startTs) / 1e3;
  let lap = 1;
  while (true) {
    const dur = lapDurationSecs(config, lap);
    if (elapsed < dur) {
      return {
        phase: "racing",
        currentLap: lap,
        lapDurationSecs: dur,
        secsLeft: Math.ceil(dur - elapsed),
        lapsDone: lap - 1,
        totalElapsedSecs: Math.floor((nowTs - startTs) / 1e3)
      };
    }
    elapsed -= dur;
    lap++;
    const nextMins = config.firstLapMinutes - (lap - 1) * config.decrementMinutes;
    if (nextMins <= 0) {
      return {
        phase: "done",
        lapsDone: lap - 1,
        totalElapsedSecs: Math.floor((nowTs - startTs) / 1e3)
      };
    }
  }
}

export { buildLapSchedule as b, lapDurationSecs as l, maxLaps as m };
//# sourceMappingURL=race--XsfwnTx.js.map
