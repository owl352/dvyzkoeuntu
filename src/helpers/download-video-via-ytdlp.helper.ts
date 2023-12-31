import { spawn } from "child_process";
import { Logger } from "./logger.helper";

export async function downloadVideoViaYTDLP(
  url: string,
  prefix: string,
  path: string,
  callback: Function = (fname: string) =>
    new Logger("ytdlp callback").info(`${fname} is ready`),
  onError: Function = (fname: string) =>
    new Logger("ytdlp error").error(`${fname} error!`),
  onChanges: Function = (data: string) =>
    new Logger("ytdlp on changes").info(data.toString())
) {
  const fname = prefix + Date.now();
  const binName = process.platform == "darwin" ? "yt-dlp_macos" : "yt-dlp_linux";
  const ytdlp = spawn(
    `${process.cwd()}/node_modules/@owl352/video-downloader/bins/${binName}`,
    [
      "-f",
      url.substring(0,15).includes('vk')?"best":"bestaudio+bestvideo",
      "-S",
      "res,ext:mp4:m4a",
      "--recode",
      "mp4",
      "-v",
      `${url}`,
      "-o",
      `${process.cwd()}/${path + fname}.mp4`,
    ],
    { cwd: process.cwd() }
  );
  ytdlp.on("exit", () => {
    callback(fname);
    new Logger('ytdlp process').info("exit");
  });
  ytdlp.on("error", (err) => {
    new Logger("ytdlp process").error(err);
    onError(fname);
  });
  ytdlp.stdout.on("data", (d) => onChanges(d));
}
