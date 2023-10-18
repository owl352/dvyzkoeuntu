import { getMpdFromDzen } from "./get-mpd-from-dzen.helper";
import { downloadVideoViaYTDLP } from "./download-video-via-ytdlp.helper";

export async function downloadVideoFromDzen(
  url: string,
  prefix: string,
  path: string,
  callback?: Function,
  onError?: Function,
  onChanges?: Function
) {
  const mpdURL = await getMpdFromDzen(url);
  downloadVideoViaYTDLP(mpdURL, prefix, path, callback, onError, onChanges);
}
