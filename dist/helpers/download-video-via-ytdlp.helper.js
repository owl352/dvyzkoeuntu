"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadVideoViaYTDLP = void 0;
const child_process_1 = require("child_process");
const logger_helper_1 = require("./logger.helper");
const constants_helper_1 = require("./constants.helper");
function downloadVideoViaYTDLP(url, prefix, callback = (fname) => new logger_helper_1.Logger("ytdlp callback").info(`${fname} is ready`), onError = (fname) => new logger_helper_1.Logger("ytdlp error").error(`${fname} error!`), onChanges = (data) => new logger_helper_1.Logger("ytdlp on changes").info(data.toString())) {
    return __awaiter(this, void 0, void 0, function* () {
        const fname = prefix + Date.now();
        const binName = process.platform == "darwin" ? "yt-dlp_macos" : "yt-dlp_linux";
        const ytdlp = (0, child_process_1.spawn)(`${process.cwd()}/node_modulse/@owl352/video-downloader/bins/${binName}`, [
            "-f",
            "b",
            "-v",
            `${url}`,
            "-o",
            `${process.cwd()}/${constants_helper_1.videoStoragePath + fname}.mp4`,
        ], { cwd: process.cwd() });
        ytdlp.on("exit", () => {
            callback(fname);
            new logger_helper_1.Logger('ytdlp process').info("exit");
        });
        ytdlp.on("error", (err) => {
            new logger_helper_1.Logger("ytdlp process").error(err);
            onError(fname);
        });
        ytdlp.stdout.on("data", (d) => onChanges(d));
    });
}
exports.downloadVideoViaYTDLP = downloadVideoViaYTDLP;
