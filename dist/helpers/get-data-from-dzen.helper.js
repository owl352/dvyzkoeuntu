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
function getMpdFromDzen(url) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response1 = yield axios_1.default.get(url, {
                responseType: "text",
                withCredentials: true,
            });
            const key = (_a = response1.data
                .match(/(value = \'(.*?)\')/g)) === null || _a === void 0 ? void 0 : _a[0].slice(9, -1);
            const response2 = yield axios_1.default.get(constants_helper_1.firstLoginDzen + "8a428cf8-6ae4-11ee-b962-0242ac120002", {
                responseType: "text",
                withCredentials: true,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
                    // "User-Agent": "PostmanRuntime/7.32.3",
                    Accept: "*/*",
                    "Postman-Token": "f769e61b-aeaf-48e5-bc1a-4db3ba11a37c",
                    "Accept-Encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                },
                data: {
                    retpath: url,
                    container: key,
                },
            });
            const cookies = ((_b = response2.headers["set-cookie"]) === null || _b === void 0 ? void 0 : _b[0]) + "; zen_sso_checked=1";
            console.log(cookies);
            const response3 = yield axios_1.default.get(url, {
                headers: {
                    Cookie: cookies,
                },
            });
            //   console.log(response3);
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
                console.log(JSON.parse(`${(_d = script.match(/({"StreamInfo":\[(.*?)\]})/g)) === null || _d === void 0 ? void 0 : _d[0]}]}`));
                return JSON.parse(`${(_e = script.match(/({"StreamInfo":\[(.*?)\]})/g)) === null || _e === void 0 ? void 0 : _e[0]}]}`).StreamInfo[0].OutputStream;
            }
            else {
                //TODO: implement if script == ''
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
