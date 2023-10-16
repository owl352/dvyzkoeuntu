import { downloadVideoFromDzen } from "./helpers/download-video-from-dzen.helper";

export * from "./helpers/download-video-from-dzen.helper";
export * from "./helpers/download-video-from-vk.helper";
export * from "./helpers/download-video-from-youtube.helper";



function main(){
    downloadVideoFromDzen('https://dzen.ru/video/watch/62345889ef6d237b56dac844','dzen')
}
main()