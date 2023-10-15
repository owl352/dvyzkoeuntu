import axios from "axios";
import cheerio from "cheerio";
import { firstLoginDzen } from "./constants.helper";
import { Logger } from "./logger.helper";
import { randomUUID } from "crypto";

export async function getMpdFromDzen(url: string): Promise<string> {
  try {
    const response1 = await axios.get(url, {
      responseType: "text",
      withCredentials: true,
    });
    const key: string = (response1.data as string)
      .match(/(value = \'(.*?)\')/g)?.[0]
      .slice(9, -1)!;
    const response2 = await axios.get(firstLoginDzen + randomUUID(), {
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
    const cookies =
      response2.headers["set-cookie"]?.[0] + "; zen_sso_checked=1";
    const response3 = await axios.get(url, {
      headers: {
        Cookie: cookies,
      },
    });
    const page = cheerio.load(response3.data);
    const scripts = page("script");
    let script: string = "";
    for (let s of scripts.get()) {
      const _script = s.children[0]?.data;
      if (_script != undefined) {
        if (_script.includes("__serverSettings")) {
          script = _script;
        }
      }
    }
    if (script != "") {

      return JSON.parse(
        `${script.match(/({"StreamInfo":\[(.*?)\]})/g)?.[0]!}]}`
      ).StreamInfo[0].OutputStream;
    } else {
      new Logger("getMpdLink").error("script is empty");
      return "";
    }
  } catch (error) {
    new Logger("getMpdLink").error(`processing error\n${error}`);
    return "";
  }
}
