import { downloadVideoViaYTDLP } from "./download-video-via-ytdlp.helper";

export async function downloadVideoFromYoutube(
  url: string,
  prefix: string,
  path: string,
  callback?: Function,
  onError?: Function,
  onChanges?: Function
) {
  downloadVideoViaYTDLP(url, prefix,path, callback, onError, onChanges);
}
