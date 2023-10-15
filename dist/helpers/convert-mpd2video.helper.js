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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMPDToVideo = void 0;
const fs_1 = __importDefault(require("fs"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const logger_helper_1 = require("./logger.helper");
const constants_helper_1 = require("./constants.helper");
const download_mpd_helper_1 = require("./download-mpd.helper");
function convertMPDToVideo(mpdUrl, outputVideoPath, name, callback, onError) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            fs_1.default.mkdirSync(constants_helper_1.videoStoragePath, { recursive: true });
            const mpdFilePath = yield (0, download_mpd_helper_1.downloadMPD)(mpdUrl, name, constants_helper_1.videoStoragePath);
            (0, fluent_ffmpeg_1.default)({})
                .input(mpdFilePath)
                .output(outputVideoPath)
                .on("end", () => {
                callback(name);
                fs_1.default.rmSync(`${constants_helper_1.videoStoragePath + name}.mpd`);
                new logger_helper_1.Logger("ffmpeg").info("Конвертация завершена");
            })
                .on("error", (err) => {
                // fs.rmSync(`${videoStoragePath + name}.mpd`);
                onError(name);
                new logger_helper_1.Logger("ffmpeg").error("Произошла ошибка:", err);
            })
                .run();
        }
        catch (err) {
            console.error("Произошла ошибка:", err);
        }
    });
}
exports.convertMPDToVideo = convertMPDToVideo;
