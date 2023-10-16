import { downloadVideoFromDzen } from "./helpers/download-video-from-dzen.helper";
import { downloadVideoViaYTDLP } from "./helpers/download-video-via-ytdlp.helper";

export * from "./helpers/download-video-from-dzen.helper";
export * from "./helpers/download-video-from-vk.helper";
export * from "./helpers/download-video-from-youtube.helper";

function main() {
  downloadVideoViaYTDLP(
    "https://youtube.com/shorts/KWZMI3Y2ngw?si=sa8HuVAbdYDgBUy6",
    "dzen"
  );
}
if (require.main === module) {
  main();
}
