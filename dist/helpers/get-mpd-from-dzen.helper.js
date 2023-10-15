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
exports.getMpdFromDzen = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const constants_helper_1 = require("./constants.helper");
const logger_helper_1 = require("./logger.helper");
const crypto_1 = require("crypto");
function getMpdFromDzen(url) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response1 = yield axios_1.default.get(url, {
                responseType: "text",
                withCredentials: true,
            });
            const key = (_a = response1.data
                .match(/(value = \'(.*?)\')/g)) === null || _a === void 0 ? void 0 : _a[0].slice(9, -1);
            const response2 = yield axios_1.default.get(constants_helper_1.firstLoginDzen + (0, crypto_1.randomUUID)(), {
                responseType: "text",
                withCredentials: true,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Connection: "keep-alive",
                },
                data: {
                    retpath: url,
                    container: key,
                },
            });
            const cookies = ((_b = response2.headers["set-cookie"]) === null || _b === void 0 ? void 0 : _b[0]) + "; zen_sso_checked=1";
            const response3 = yield axios_1.default.get(url, {
                headers: {
                    Cookie: cookies,
                },
            });
            const page = cheerio_1.default.load(response3.data);
            const scripts = page("script");
            let script = "";
            for (let s of scripts.get()) {
                const _script = (_c = s.children[0]) === null || _c === void 0 ? void 0 : _c.data;
                if (_script != undefined) {
                    if (_script.includes("__serverSettings")) {
                        script = _script;
                    }
                }
            }
            if (script != "") {
                return JSON.parse(`${(_d = script.match(/({"StreamInfo":\[(.*?)\]})/g)) === null || _d === void 0 ? void 0 : _d[0]}]}`).StreamInfo[0].OutputStream;
            }
            else {
                new logger_helper_1.Logger("getMpdLink").error("script is empty");
                return "";
            }
        }
        catch (error) {
            new logger_helper_1.Logger("getMpdLink").error(`processing error\n${error}`);
            return "";
        }
    });
}
exports.getMpdFromDzen = getMpdFromDzen;
