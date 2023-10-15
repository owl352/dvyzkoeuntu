import { downloadVideoViaYTDLP } from "./download-video-via-ytdlp.helper";
import { Logger } from "./logger.helper";

export async function downloadVideoFromVk(
  url: string,
  prefix: string,
  callback?: Function,
  onError?: Function,
  onChanges?: Function
) {
  downloadVideoViaYTDLP(url, prefix, callback, onError, onChanges);
}
