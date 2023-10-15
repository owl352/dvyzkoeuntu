import axios from "axios";
import fs from "fs";
export async function downloadMPD(
  mpdUrl: string,
  fname: string,
  outputDirectory: string
): Promise<string> {
  const response = await axios.get(mpdUrl, { responseType: "arraybuffer" });
  const mpdFilePath = `${outputDirectory}/${fname}.mpd`;
  fs.writeFileSync(mpdFilePath, response.data);
  return mpdFilePath;
}
