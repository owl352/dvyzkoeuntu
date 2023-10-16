import { spawn } from "child_process";
import { Logger } from "./logger.helper";
import { videoStoragePath } from "./constants.helper";

export async function downloadVideoViaYTDLP(
  url: string,
  prefix: string,
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
      "bestaudio+bestvideo",
      "-S",
      "res,ext:mp4:m4a",
      "--recode",
      "mp4",
      "-v",
      `${url}`,
      "-o",
      `${process.cwd()}/${videoStoragePath + fname}.mp4`,
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
