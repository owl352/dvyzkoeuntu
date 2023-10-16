"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const download_video_from_dzen_helper_1 = require("./helpers/download-video-from-dzen.helper");
__exportStar(require("./helpers/download-video-from-dzen.helper"), exports);
__exportStar(require("./helpers/download-video-from-vk.helper"), exports);
__exportStar(require("./helpers/download-video-from-youtube.helper"), exports);
function main() {
    (0, download_video_from_dzen_helper_1.downloadVideoFromDzen)('https://dzen.ru/video/watch/62345889ef6d237b56dac844', 'dzen');
}
main();
