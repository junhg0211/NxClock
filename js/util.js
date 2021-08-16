let BACKGROUND_COLOR = "#000000";

let CLOCK_TEXT_FONT = "${CLOCK_TEXT_SIZE}px Pretendard, Noto Sans, sans-serif";
let CLOCK_TEXT_COLOR = "#ffffff";

let DIGITAL_TEXT_COLOR = `${CLOCK_TEXT_COLOR}80`;

let HOUR_HAND_COLOR = "#ffffff";
let HOUR_HAND_WIDTH = 10;
let HOUR_HAND_RATIO = 0.8;

let MINUTE_HAND_COLOR = "#ffffff";
let MINUTE_HAND_WIDTH = 5;
let MINUTE_HAND_RATIO = 1.1;

let SECOND_HAND_COLOR = '#fdde59';
let SECOND_HAND_WIDTH = 1;
let SECOND_HAND_RATIO = 1;

const zeroPad = (num, places) => String(num).padStart(places, '0')