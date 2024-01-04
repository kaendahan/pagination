import createIcon from "./createIcon";

const JumpPrevIcon = createIcon("JumpPrevIcon", [
  ["path", { d: "m15 18-6-6 6-6", key: "JumpPrevIcon" }],
]);

const JumpNextIcon = createIcon("JumpNextIcon", [
  ["path", { d: "m9 18 6-6-6-6", key: "JumpNextIcon" }],
]);

const SkipIcon = createIcon("SkipPrevIcon", [
  ["circle", { cx: "12", cy: "12", r: "1", key: "SkipPrevIcon1" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "SkipPrevIcon2" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "SkipPrevIcon3" }],
]);

const SkipPrevIcon = createIcon("SkipPrevIcon", [
  ["path", { d: "m11 17-5-5 5-5", key: "SkipPrevIcon1" }],
  ["path", { d: "m18 17-5-5 5-5", key: "SkipPrevIcon2" }],
]);

const SkipNextIcon = createIcon("SkipNextIcon", [
  ["path", { d: "m6 17 5-5-5-5", key: "SkipNextIcon1" }],
  ["path", { d: "m13 17 5-5-5-5", key: "SkipNextIcon2" }],
]);

export { JumpPrevIcon, JumpNextIcon, SkipIcon, SkipPrevIcon, SkipNextIcon };
