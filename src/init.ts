import init, { run } from '@internal/game';

function loading_game_wasm_file({
  initFinish,
  progress,
}: {
  initFinish: () => void;
  progress: (rate: number) => void;
}) {
  const game_wasm_file_url = new URL('@internal/game/game_bg.wasm', import.meta.url).href
  const xhr = new XMLHttpRequest();
  xhr.open('GET', game_wasm_file_url);
  xhr.responseType = 'blob';
  xhr.addEventListener('loadend', async (ev) => {
    progressDOM.textContent = `loading finish. init game...`;
    await init(xhr.response.arrayBuffer());
    initFinish();
  });
  xhr.addEventListener('progress', ev => {
    progress(ev.loaded / ev.total);
  })
  xhr.send();
}

const progressDOM = document.createElement('div');
progressDOM.className = "progress";
document.body.appendChild(progressDOM);

const gameMainCanvas = document.createElement('canvas');
gameMainCanvas.id = 'game-main-canvas';



loading_game_wasm_file({
  initFinish: () => {
    progressDOM.remove();
    document.body.appendChild(gameMainCanvas);
    run();
  },
  progress(rate) {
    progressDOM.textContent = `loading... ${Math.floor(rate * 100)}%`;
  },
});