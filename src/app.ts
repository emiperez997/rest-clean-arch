import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  new Server({
    port: 5000,
  }).start();
}
