import { downloadVideoViaYTDLP } from "./download-video-via-ytdlp.helper";

export async function downloadVideoFromYoutube(
  url: string,
  prefix: string,
  callback?: Function,
  onError?: Function,
  onChanges?: Function
) {
  downloadVideoViaYTDLP(url, prefix, callback, onError, onChanges);
}
