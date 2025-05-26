// --- ПРОМОКОДЫ ДЛЯ КАЗИНО ---
const DRAVONA_PROMOCODES = [
  'DRVN-7Q2K9L1A','DRVN-4X8J2M5B','DRVN-9W3E6T7C','DRVN-2A5S8D9F','DRVN-6Z1X4C7V','DRVN-3B7N2M8Q','DRVN-5L9K1J4H','DRVN-8G2F5D6S','DRVN-1P4O7I3U','DRVN-7Y2T5R8E',
  'DRVN-4W9Q1A6S','DRVN-2D5F8G3H','DRVN-6J1K4L7Z','DRVN-3X7C2V5B','DRVN-5N8M1Q4W','DRVN-9E2R5T6Y','DRVN-1U4I7O3P','DRVN-7S2D5F8G','DRVN-4H9J1K6L','DRVN-2Z5X8C3V',
  'DRVN-AB12CD34','DRVN-EF56GH78','DRVN-IJ90KL12','DRVN-MN34OP56','DRVN-QR78ST90','DRVN-UV12WX34','DRVN-YZ56AB78','DRVN-CD90EF12','DRVN-GH34IJ56','DRVN-KL78MN90',
];

// --- ПРОМОКОДЫ НА МОНЕТЫ ---
const DRAVCOIN_PROMOS = {
  'OSSSIX': {reward: 50000, limit: 5},
  'OPEN': {reward: 50, limit: 100},
  'ITAL': {reward: 100, limit: 2},
  'PIKMI': {reward: 150, limit: 1},
  'CIMF': {reward: 150, limit: 1},
  'OPIC': {reward: 150, limit: 1},
  'FGW': {reward: 150, limit: 1},
  'KOKOY': {reward: 150, limit: 3},
  'CANDI': {reward: 50, limit: 5},
  'SPONER': {reward: 100, limit: 5},
  'TEST': {reward: 10, limit: 500},
  'SIMISI': {reward: 50, limit: 50},
  'Love_HILEL': {reward: 10000, limit: 3},
};

function showMenu() {
  document.getElementById('game-area').innerHTML = '';
  document.querySelector('.game-section').style.display = '';
  document.onkeydown = null;
}

function addBackButton() {
  const area = document.getElementById('game-area');
  Array.from(area.querySelectorAll('.back-btn')).forEach(btn => btn.remove());
  const btn = document.createElement('button');
  btn.innerText = 'Назад в меню';
  btn.className = 'back-btn';
  btn.onclick = showMenu;
  area.appendChild(btn);
}

function startTicTacToe() {
  document.querySelector('.game-section').style.display = 'none';
    const area = document.getElementById("game-area");
    area.innerHTML = '<h2>Крестики-нолики</h2><div class="board" id="board"></div><p id="status"></p>';
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    let cells = Array(9).fill('');
    let gameOver = false;

    function renderBoard() {
      board.innerHTML = '';
      cells.forEach((val, i) => {
        const btn = document.createElement("button");
        btn.className = 'cell';
        btn.innerText = val;
        btn.disabled = val || gameOver;
        btn.onclick = () => {
          if (!val && !gameOver) {
            cells[i] = 'X';
            botMove();
            checkGame();
            renderBoard();
          }
        };
        board.appendChild(btn);
      });
    }

    function botMove() {
      const winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    // 1. Попытка выиграть
      for (let combo of winCombos) {
        let [a,b,c] = combo;
        if (cells[a] === 'O' && cells[b] === 'O' && !cells[c]) { cells[c] = 'O'; return; }
        if (cells[a] === 'O' && cells[c] === 'O' && !cells[b]) { cells[b] = 'O'; return; }
        if (cells[b] === 'O' && cells[c] === 'O' && !cells[a]) { cells[a] = 'O'; return; }
      }
    // 2. Блокировка игрока
    for (let combo of winCombos) {
      let [a,b,c] = combo;
      if (cells[a] === 'X' && cells[b] === 'X' && !cells[c]) { cells[c] = 'O'; return; }
      if (cells[a] === 'X' && cells[c] === 'X' && !cells[b]) { cells[b] = 'O'; return; }
      if (cells[b] === 'X' && cells[c] === 'X' && !cells[a]) { cells[a] = 'O'; return; }
    }
    // 3. Центр
    if (cells[4] === '') { cells[4] = 'O'; return; }
    // 4. Углы
    const corners = [0,2,6,8];
    const emptyCorners = corners.filter(i => cells[i] === '');
    if (emptyCorners.length) {
      cells[emptyCorners[Math.floor(Math.random()*emptyCorners.length)]] = 'O';
      return;
    }
    // 5. Любая свободная
      let empty = cells.map((v,i) => v === '' ? i : null).filter(i => i !== null);
      if (empty.length) {
        const rand = empty[Math.floor(Math.random() * empty.length)];
        cells[rand] = 'O';
      }
    }

    function checkGame() {
      const win = (sym) => [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        .some(([a,b,c]) => cells[a] === sym && cells[b] === sym && cells[c] === sym);
      if (win('X')) { status.innerText = "Ты победил!"; gameOver = true; }
      else if (win('O')) { status.innerText = "Ты проиграл!"; gameOver = true; }
      else if (!cells.includes('')) { status.innerText = "Ничья."; gameOver = true; }
    }

    renderBoard();
  addBackButton();
  }

  function startBombGame() {
  document.querySelector('.game-section').style.display = 'none';
    const area = document.getElementById("game-area");
  function renderBoxes() {
    area.innerHTML = '<h2>Не попади на бомбу</h2><div id="boxes-row" style="font-size:48px;margin:20px 0;">📦 📦 📦</div>';
    const correct = Math.floor(Math.random() * 3);
    const boxesRow = document.getElementById('boxes-row');
    let finished = false;
    boxesRow.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const span = document.createElement('span');
      span.textContent = '📦';
      span.style.cursor = 'pointer';
      span.style.margin = '0 18px';
      span.onclick = () => {
        if (finished) return;
        finished = true;
        if (i === correct) {
          boxesRow.innerHTML = '💥 💣 💥';
          area.innerHTML += "<div style='color:#fff;background:#e53935;font-size:1.5em;margin:18px 0;padding:10px 0;border-radius:8px;'>🟥Ты проиграл🟥</div>";
        } else {
          boxesRow.innerHTML = '✅✅✅';
          area.innerHTML += "<div style='color:#fff;background:#43a047;font-size:1.5em;margin:18px 0;padding:10px 0;border-radius:8px;'>🟩Ты победил🟩</div>";
        }
        setTimeout(renderBoxes, 1500);
      };
      boxesRow.appendChild(span);
    }
    addBackButton();
  }
  renderBoxes();
  }

  function startGuessNumber() {
  document.querySelector('.game-section').style.display = 'none';
    const area = document.getElementById("game-area");
    const number = Math.floor(Math.random() * 10) + 1;
  area.innerHTML = `<h2>Угадай число от 1 до 10</h2><input id='guess' type='number' min='1' max='10'><button id='guess-btn'>Проверить</button><p id='result'></p>`;
  document.getElementById('guess-btn').onclick = function () {
    const guess = parseInt(document.getElementById('guess').value);
    if (guess === number) {
      document.getElementById('result').innerText = 'Правильно!';
    } else {
      document.getElementById('result').innerText = 'Неправильно! Было: ' + number;
    }
  };
  addBackButton();
  }

  function startMathQuiz() {
  document.querySelector('.game-section').style.display = 'none';
    const area = document.getElementById("game-area");
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
  area.innerHTML = `<h2>Сколько будет ${a} × ${b}?</h2><input id='answer' type='number'><button onclick='checkMath()'>Ответить</button><p id='math-result'></p>`;
    window.checkMath = function () {
      const ans = parseInt(document.getElementById('answer').value);
    if (ans === (a * b)) { document.getElementById('math-result').innerText = 'Верно!'; }
    else { document.getElementById('math-result').innerText = 'Неверно!'; }
  }
  addBackButton();
}

function startButtonGame() {
  document.querySelector('.game-section').style.display = 'none';
  const area = document.getElementById('game-area');
  area.innerHTML = `<h2>Кликни на кнопку!</h2><button id='main-btn' style='font-size:22px;margin:30px 0;'>Нажми меня</button><p id='btn-result'></p>`;
  let clicks = 0;
  let timer = null;
  let started = false;
  const btn = document.getElementById('main-btn');
  btn.onclick = function() {
    if (!started) {
      started = true;
      timer = setTimeout(() => {
        btn.disabled = false;
        document.getElementById('btn-result').innerText = `Время вышло! Клики: ${clicks}`;
        if (clicks >= 100) addScore(2);
        started = false;
        clicks = 0;
      }, 60000);
    }
    clicks++;
    btn.innerText = `Клики: ${clicks}`;
  };
  addBackButton();
}

function startTetris() {
  document.querySelector('.game-section').style.display = 'none';
  const area = document.getElementById('game-area');
  area.innerHTML = `<h2>Тетрис</h2><canvas id='tetris-canvas' width='200' height='400'></canvas><div id='tetris-score'></div>`;
  const canvas = document.getElementById('tetris-canvas');
  const ctx = canvas.getContext('2d');
  const ROWS = 20, COLS = 10, BLOCK = 20;
  let board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
  let score = 0;
  let gameOver = false;
  let requestId;

  const shapes = [
    [[1,1,1,1]], // I
    [[1,1],[1,1]], // O
    [[0,1,0],[1,1,1]], // T
    [[1,1,0],[0,1,1]], // S
    [[0,1,1],[1,1,0]], // Z
    [[1,0,0],[1,1,1]], // J
    [[0,0,1],[1,1,1]]  // L
  ];
  const colors = ['#00BCD4','#FFEB3B','#9C27B0','#4CAF50','#F44336','#3F51B5','#FF9800'];

  function randomPiece() {
    const id = Math.floor(Math.random()*shapes.length);
    return {shape: shapes[id], color: colors[id], x: 3, y: 0};
  }
  let piece = randomPiece();

  function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*BLOCK, y*BLOCK, BLOCK-1, BLOCK-1);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(x*BLOCK, y*BLOCK, BLOCK-1, BLOCK-1);
  }

  function drawBoard() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let y=0;y<ROWS;y++) for(let x=0;x<COLS;x++)
      if(board[y][x]) drawBlock(x,y,board[y][x]);
    for(let y=0;y<piece.shape.length;y++)
      for(let x=0;x<piece.shape[y].length;x++)
        if(piece.shape[y][x]) drawBlock(piece.x+x,piece.y+y,piece.color);
  }

  function valid(dx,dy,shape=piece.shape) {
    for(let y=0;y<shape.length;y++)
      for(let x=0;x<shape[y].length;x++)
        if(shape[y][x]) {
          let nx=piece.x+x+dx, ny=piece.y+y+dy;
          if(nx<0||nx>=COLS||ny>=ROWS||ny>=0&&board[ny][nx]) return false;
        }
    return true;
  }

  function merge() {
    for(let y=0;y<piece.shape.length;y++)
      for(let x=0;x<piece.shape[y].length;x++)
        if(piece.shape[y][x]) board[piece.y+y][piece.x+x]=piece.color;
  }

  function clearLines() {
    let lines=0;
    for(let y=ROWS-1;y>=0;y--) {
      if(board[y].every(v=>v)) {
        board.splice(y,1);
        board.unshift(Array(COLS).fill(0));
        lines++;
        y++;
      }
    }
    if(lines) {
      score+=lines*10;
      document.getElementById('tetris-score').innerText = `Очки: ${score}`;
      addScore(lines);
    }
  }

  function drop() {
    if(!valid(0,1)) {
      merge();
      clearLines();
      piece = randomPiece();
      if(!valid(0,0)) { gameOver = true; cancelAnimationFrame(requestId); area.innerHTML += '<p style="color:red">Игра окончена!</p>'; addBackButton(); return; }
    } else piece.y++;
    drawBoard();
  }

  function move(dx) { if(valid(dx,0)) { piece.x+=dx; drawBoard(); } }
  function rotate() {
    const s = piece.shape;
    const r = s[0].map((_,i)=>s.map(row=>row[i])).reverse();
    if(valid(0,0,r)) { piece.shape = r; drawBoard(); }
  }

  function gameLoop() {
    drop();
    if(!gameOver) requestId = setTimeout(gameLoop, 400);
  }

  document.onkeydown = function(e) {
    if(gameOver) return;
    if(e.key==='ArrowLeft') move(-1);
    else if(e.key==='ArrowRight') move(1);
    else if(e.key==='ArrowDown') drop();
    else if(e.key==='ArrowUp') rotate();
  };
  drawBoard();
  addBackButton();
  gameLoop();
}

// Функция для переноса текста
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for(let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

// --- DOMContentLoaded: инициализация и обработчики ---
document.addEventListener('DOMContentLoaded', function() {
  updateScoreCounter();
  // --- Музыка: выбор трека ---
  const music = document.getElementById('bg-music');
  const musicSelect = document.getElementById('music-select');
  const volumeSlider = document.getElementById('music-volume');
  // Восстановить выбор трека
  if (musicSelect && music) {
    const savedTrack = localStorage.getItem('dravon_music_track');
    if (savedTrack && Array.from(musicSelect.options).some(opt => opt.value === savedTrack)) {
      music.src = savedTrack;
      musicSelect.value = savedTrack;
    }
    musicSelect.onchange = function() {
      music.src = this.value;
      localStorage.setItem('dravon_music_track', this.value);
      // применить текущую громкость
      if (volumeSlider) music.volume = parseFloat(volumeSlider.value);
      music.play().catch(()=>{});
    };
  }
  // --- Громкость ---
  if (volumeSlider && music) {
    // Восстановить громкость
    const savedVol = localStorage.getItem('dravon_music_volume');
    if (savedVol !== null) {
      volumeSlider.value = savedVol;
      music.volume = parseFloat(savedVol);
    } else {
      music.volume = parseFloat(volumeSlider.value);
    }
    volumeSlider.oninput = function() {
      music.volume = parseFloat(this.value);
      localStorage.setItem('dravon_music_volume', this.value);
    };
  }
  showMenu();
  // --- Магазин ---
  const shopBtn = document.getElementById('shop-btn');
  const shopArea = document.getElementById('shop-area');
  const gameSection = document.querySelector('.game-section');
  const shopPromo = document.getElementById('shop-promo');
  const shopBack = document.getElementById('shop-back');
  if (shopBtn && shopArea && gameSection) {
    shopBtn.onclick = function() {
      gameSection.style.display = 'none';
      document.getElementById('game-area').style.display = 'none';
      shopArea.style.display = '';
      shopPromo.textContent = '';
    };
    shopBack.onclick = function() {
      shopArea.style.display = 'none';
      gameSection.style.display = '';
      document.getElementById('game-area').style.display = '';
      showMenu();
    };
  }
  // --- Модальное окно для промокода ---
  const promoOpenBtn = document.getElementById('promo-open-btn');
  const promoModal = document.getElementById('promo-modal');
  const promoModalClose = document.getElementById('promo-modal-close');
  const promoInput = document.getElementById('promo-input');
  const promoBtn = document.getElementById('promo-activate-btn');
  if (promoOpenBtn && promoModal && promoModalClose) {
    promoOpenBtn.onclick = function() {
      promoModal.style.display = 'flex';
      promoInput.value = '';
      promoInput.focus();
    };
    promoModalClose.onclick = function() {
      promoModal.style.display = 'none';
    };
    promoModal.onclick = function(e) {
      if (e.target === promoModal) promoModal.style.display = 'none';
    };
  }
  if (promoInput && promoBtn) {
    promoBtn.onclick = function() {
      const code = promoInput.value.trim().toUpperCase();
      if (!code) return;
      const promo = DRAVCOIN_PROMOS[code];
      if (promo) {
        if (isPromoUsedByUser(code)) {
          alert('Вы уже активировали этот промокод!');
        } else {
          const usedCount = getPromoUsedCount(code);
          if (usedCount >= promo.limit) {
            alert('Лимит активаций этого промокода исчерпан!');
          } else {
            addScore(promo.reward);
            markPromoUsedCount(code);
            markPromoUsedByUser(code);
            alert(`Промокод активирован! Вы получили ${promo.reward} монет.`);
          }
        }
      } else {
        alert('Промокод не найден или недействителен!');
      }
      promoInput.value = '';
      promoModal.style.display = 'none';
    };
    promoInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') promoBtn.click();
    });
  }
});

// --- Поймай кнопку ---
function startCatchButtonGame() {
  document.querySelector('.game-section').style.display = 'none';
  document.getElementById('game-area').style.display = 'none';
  document.getElementById('catch-button-area').style.display = '';
  // Сброс
  let score = 0;
  let timeLeft = 30;
  let gameActive = false;
  let timerInterval;
  const scoreDisplay = document.getElementById('catch-score');
  const timerDisplay = document.getElementById('catch-timer');
  const startBtn = document.getElementById('catch-startBtn');
  const button = document.getElementById('catch-btn');
  const backBtn = document.getElementById('catch-back');
  scoreDisplay.textContent = 'Очки: 0';
  timerDisplay.textContent = 'Осталось: 30 сек';
  startBtn.style.display = '';
  button.style.display = 'none';

  function moveButton() {
    const maxX = document.getElementById('catch-button-area').offsetWidth - button.offsetWidth;
    const maxY = document.getElementById('catch-button-area').offsetHeight - button.offsetHeight - 40;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY + 60;
    button.style.left = x + 'px';
    button.style.top = y + 'px';
  }

  function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    scoreDisplay.textContent = 'Очки: 0';
    timerDisplay.textContent = 'Осталось: 30 сек';
    startBtn.style.display = 'none';
    button.style.display = 'block';
    moveButton();
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = 'Осталось: ' + timeLeft + ' сек';
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    clearInterval(timerInterval);
    gameActive = false;
    button.style.display = 'none';
    startBtn.style.display = 'inline-block';
    timerDisplay.textContent = 'Время вышло!';
    scoreDisplay.textContent += ' | Итог: ' + score;
  }

  startBtn.onclick = startGame;
  button.onclick = function() {
    if (!gameActive) return;
    score++;
    scoreDisplay.textContent = 'Очки: ' + score;
    moveButton();
  };
  backBtn.onclick = function() {
    document.getElementById('catch-button-area').style.display = 'none';
    document.getElementById('game-area').style.display = '';
    showMenu();
  };
}

// --- Тетрис (визуал и управление) ---
function startTetrisMain() {
  document.querySelector('.game-section').style.display = 'none';
  document.getElementById('game-area').style.display = 'none';
  document.getElementById('tetris-area').style.display = '';
  const canvas = document.getElementById('tetris-canvas-main');
  const ctx = canvas.getContext('2d');
  const ROWS = 20;
  const COLS = 10;
  const BLOCK_SIZE = 24;
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  let grid = createMatrix(COLS, ROWS);
  const PIECES = {
    I: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    J: [[2,0,0],[2,2,2],[0,0,0]],
    L: [[0,0,3],[3,3,3],[0,0,0]],
    O: [[4,4],[4,4]],
    S: [[0,5,5],[5,5,0],[0,0,0]],
    T: [[0,6,0],[6,6,6],[0,0,0]],
    Z: [[7,7,0],[0,7,7],[0,0,0]]
  };
  const COLORS = [null,'#00ffff','#0000ff','#ffa500','#ffff00','#00ff00','#800080','#ff0000'];
  function createMatrix(w, h) {
    const matrix = [];
    for(let i = 0; i < h; i++) matrix.push(new Array(w).fill(0));
    return matrix;
  }
  function collide(grid, piece) {
    const [m, pos] = [piece.matrix, piece.pos];
    for(let y = 0; y < m.length; y++)
      for(let x = 0; x < m[y].length; x++)
        if(m[y][x] !== 0 && (grid[y + pos.y] && grid[y + pos.y][x + pos.x]) !== 0) return true;
    return false;
  }
  function merge(grid, piece) {
    const [m, pos] = [piece.matrix, piece.pos];
    for(let y = 0; y < m.length; y++)
      for(let x = 0; x < m[y].length; x++)
        if(m[y][x] !== 0) grid[y + pos.y][x + pos.x] = m[y][x];
  }
  function sweep() {
    let rowCount = 0;
    outer: for(let y = grid.length - 1; y >= 0; y--) {
      for(let x = 0; x < grid[y].length; x++) if(grid[y][x] === 0) continue outer;
      const row = grid.splice(y, 1)[0].fill(0);
      grid.unshift(row); y++; rowCount++;
    }
    return rowCount;
  }
  function rotate(matrix, dir) {
    for(let y = 0; y < matrix.length; y++)
      for(let x = 0; x < y; x++) [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    if(dir > 0) matrix.forEach(row => row.reverse());
    else matrix.reverse();
  }
  function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, COLS, ROWS);
    drawMatrix(grid, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
  }
  function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if(value !== 0) {
          ctx.fillStyle = COLORS[value];
          ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
          ctx.strokeStyle = '#222';
          ctx.lineWidth = 0.05;
          ctx.strokeRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }
  function createPiece(type) {
    return {
      matrix: PIECES[type].map(row => row.slice()),
      pos: {x: Math.floor(COLS / 2) - Math.floor(PIECES[type][0].length / 2), y: 0}
    };
  }
  const player = { matrix: null, pos: {x:0, y:0}, score: 0 };
  let lastRewardScore = 0;
  function playerReset() {
    const pieces = 'TJLOSZI';
    player.matrix = createPiece(pieces[Math.floor(Math.random() * pieces.length)]).matrix;
    player.pos.y = 0;
    player.pos.x = Math.floor(COLS / 2) - Math.floor(player.matrix[0].length / 2);
    if(collide(grid, player)) {
      grid.forEach(row => row.fill(0));
      player.score = 0;
      lastRewardScore = 0;
      updateScore();
    }
  }
  function playerDrop() {
    player.pos.y++;
    if(collide(grid, player)) {
      player.pos.y--;
      merge(grid, player);
      const linesCleared = sweep();
      if(linesCleared > 0) {
        player.score += linesCleared * 10;
        updateScore();
        // --- награда за каждые 10 очков ---
        while (player.score - lastRewardScore >= 10) {
          addScore(2);
          lastRewardScore += 10;
        }
      }
      playerReset();
    }
    dropCounter = 0;
  }
  function playerMove(dir) {
    player.pos.x += dir;
    if(collide(grid, player)) player.pos.x -= dir;
  }
  function playerRotate(dir) {
    const posX = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while(collide(grid, player)) {
      player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if(offset > player.matrix[0].length) {
        rotate(player.matrix, -dir);
        player.pos.x = posX;
        return;
      }
    }
  }
  function updateScore() {
    document.getElementById('tetris-score-main').textContent = 'Очки: ' + player.score;
  }
  let dropCounter = 0;
  let dropInterval = 1000;
  let lastTime = 0;
  let running = true;
  function update(time = 0) {
    if(!running) return;
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if(dropCounter > dropInterval) playerDrop();
    draw();
    requestAnimationFrame(update);
  }
  function stopGame() { running = false; }
  document.onkeydown = function(e) {
    if(!running) return;
    if(e.key==='ArrowLeft') playerMove(-1);
    else if(e.key==='ArrowRight') playerMove(1);
    else if(e.key==='ArrowDown') playerDrop();
    else if(e.key==='ArrowUp') playerRotate(1);
  };
  // --- Мобильные стрелки ---
  document.getElementById('tetris-left').onclick = function() { if(running) playerMove(-1); };
  document.getElementById('tetris-right').onclick = function() { if(running) playerMove(1); };
  document.getElementById('tetris-down').onclick = function() { if(running) playerDrop(); };
  document.getElementById('tetris-rotate').onclick = function() { if(running) playerRotate(1); };
  playerReset();
  update();
  document.getElementById('tetris-back').onclick = function() {
    stopGame();
    document.getElementById('tetris-area').style.display = 'none';
    document.getElementById('game-area').style.display = '';
    showMenu();
  };
}

// --- Переопределяю кнопки меню ---
document.querySelector('button[onclick="startButtonGame()"]').onclick = startCatchButtonGame;
document.querySelector('button[onclick="startTetris()"]').onclick = startTetrisMain;

function startMemoryGame() {
  document.querySelector('.game-section').style.display = 'none';
  document.getElementById('game-area').style.display = 'none';
  document.getElementById('memory-area').style.display = '';
  const gameBoard = document.getElementById('memory-game-board');
  const gameOver = document.getElementById('memory-game-over');
  const backBtn = document.getElementById('memory-back');
  const symbols = ["🍎", "🍌", "🍓", "🍉", "🍍", "🍇", "🍒", "🍊"];
  let cards = [...symbols, ...symbols];
  let flippedCards = [];
  let matchedCards = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    gameOver.classList.remove('active');
    for (let i = 0; i < cards.length; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-index', i);
      card.addEventListener('click', flipCard);
      gameBoard.appendChild(card);
    }
  }

  function flipCard() {
    const card = this;
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
      card.classList.add('flipped');
      card.textContent = cards[card.getAttribute('data-index')];
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (cards[card1.getAttribute('data-index')] === cards[card2.getAttribute('data-index')]) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedCards++;
      if (matchedCards === 8) {
        gameOver.classList.add('active');
        addScore(2);
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
    }
    flippedCards = [];
  }

  backBtn.onclick = function() {
    document.getElementById('memory-area').style.display = 'none';
    document.getElementById('game-area').style.display = '';
    showMenu();
  };

  createBoard();
}

// Переопределяю кнопку меню для memory game (добавить в меню вручную)
document.addEventListener('DOMContentLoaded', function() {
  const memoryBtn = document.createElement('button');
  memoryBtn.innerText = '9. Игра на память';
  memoryBtn.onclick = startMemoryGame;
  document.querySelector('.game-section').appendChild(memoryBtn);
});

// --- Глобальный обработчик для всех кнопок 'Назад в меню' ---
document.addEventListener('click', function(e) {
  if (e.target.classList && e.target.classList.contains('back-btn')) {
    e.preventDefault();
    showMenu();
  }
});

function startKosmoGame() {
  document.querySelector('.game-section').style.display = 'none';
  document.getElementById('game-area').style.display = 'none';
  document.getElementById('kosmo-area').style.display = '';
  const gameArea = document.getElementById('kosmo-gameArea');
  const rocket = document.getElementById('kosmo-rocket');
  const leftBtn = document.getElementById('kosmo-left');
  const rightBtn = document.getElementById('kosmo-right');
  const gameoverDiv = document.getElementById('kosmo-gameover');
  const backBtn = document.getElementById('kosmo-back');
  const timerDisplay = document.getElementById('kosmo-timer');
  let rocketX = (gameArea.offsetWidth - rocket.offsetWidth) / 2;
  let rocketY = gameArea.offsetHeight - rocket.offsetHeight - 10;
  let meteors = [];
  let meteorInterval = null;
  let moveInterval = null;
  let gameRunning = true;
  let kosmoTimer = 0;
  let kosmoRewardTimer = null;
  let kosmoTimerInterval = null;
  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  function resetGame() {
    document.querySelector('.game-section').style.display = 'none';
    meteors.forEach(m => m.el.remove());
    meteors = [];
    rocketX = (gameArea.offsetWidth - rocket.offsetWidth) / 2;
    rocket.style.left = rocketX + 'px';
    rocket.style.bottom = '30px';
    gameoverDiv.style.display = 'none';
    gameRunning = true;
    kosmoTimer = 0;
    timerDisplay.textContent = formatTime(kosmoTimer);
    if (kosmoRewardTimer) clearInterval(kosmoRewardTimer);
    if (kosmoTimerInterval) clearInterval(kosmoTimerInterval);
    kosmoRewardTimer = setInterval(() => {
      if (gameRunning) {
        kosmoTimer += 30;
        addScore(3);
      }
    }, 30000);
    kosmoTimerInterval = setInterval(() => {
      if (gameRunning) {
        kosmoTimer++;
        timerDisplay.textContent = formatTime(kosmoTimer);
      }
    }, 1000);
  }
  function moveRocket(dx) {
    if (!gameRunning) return;
    rocketX += dx;
    rocketX = Math.max(0, Math.min(gameArea.offsetWidth - rocket.offsetWidth, rocketX));
    rocket.style.left = rocketX + 'px';
  }
  function createMeteor() {
    if (!gameRunning) return;
    const meteor = document.createElement('div');
    meteor.className = 'kosmo-meteor';
    const size = Math.random() * 10 + 30;
    meteor.style.width = size + 'px';
    meteor.style.height = size + 'px';
    let x = Math.random() * (gameArea.offsetWidth - size);
    meteor.style.left = x + 'px';
    meteor.style.top = '-40px';
    gameArea.appendChild(meteor);
    meteors.push({el: meteor, x, y: -40, size, speed: Math.random() * 2 + 2});
  }
  function updateMeteors() {
    if (!gameRunning) return;
    for (let i = meteors.length - 1; i >= 0; i--) {
      let m = meteors[i];
      m.y += m.speed;
      m.el.style.top = m.y + 'px';
      // Проверка столкновения
      let rx = rocketX;
      let ry = rocketY;
      let rw = rocket.offsetWidth;
      let rh = rocket.offsetHeight;
      let mx = m.x;
      let my = m.y;
      let mw = m.size;
      let mh = m.size;
      if (
        mx < rx + rw &&
        mx + mw > rx &&
        my < ry + rh &&
        my + mh > ry
      ) {
        endGame();
        return;
      }
      // Удаление метеора, если вышел за пределы
      if (m.y > gameArea.offsetHeight) {
        m.el.remove();
        meteors.splice(i, 1);
      }
    }
  }
  function gameLoop() {
    if (!gameRunning) return;
    updateMeteors();
    requestAnimationFrame(gameLoop);
  }
  function endGame() {
    gameRunning = false;
    gameoverDiv.innerHTML = '💥 Ты проиграл!';
    gameoverDiv.style.display = '';
    clearInterval(meteorInterval);
    if (kosmoRewardTimer) clearInterval(kosmoRewardTimer);
    if (kosmoTimerInterval) clearInterval(kosmoTimerInterval);
    meteors.forEach(m => m.el.remove());
    meteors = [];
  }
  function startGame() {
    document.querySelector('.game-section').style.display = 'none';
    resetGame();
    meteorInterval = setInterval(createMeteor, 900);
    function move() { updateMeteors(); if (gameRunning) requestAnimationFrame(move); }
    move();
  }
  leftBtn.onclick = () => moveRocket(-32);
  rightBtn.onclick = () => moveRocket(32);
  document.onkeydown = function(e) {
    if (!gameRunning) return;
    if (e.key === 'ArrowLeft') moveRocket(-32);
    else if (e.key === 'ArrowRight') moveRocket(32);
  };
  backBtn.onclick = function() {
    gameRunning = false;
    clearInterval(meteorInterval);
    if (kosmoRewardTimer) clearInterval(kosmoRewardTimer);
    if (kosmoTimerInterval) clearInterval(kosmoTimerInterval);
    meteors.forEach(m => m.el.remove());
    meteors = [];
    document.getElementById('kosmo-area').style.display = 'none';
    document.getElementById('game-area').style.display = '';
    showMenu();
  };
  startGame();
}

// --- Переопределяю кнопки меню ---
document.querySelector('button[onclick="startKosmoGame()"]') && (document.querySelector('button[onclick="startKosmoGame()"]').onclick = startKosmoGame);

// --- Глобальные функции для баллов ---
function getTotalScore() {
  return parseInt(localStorage.getItem('dravon_score') || '0', 10);
}
function setScore(n) {
  localStorage.setItem('dravon_score', n);
  updateScoreCounter();
}
function addScore(n) {
  setScore(getTotalScore() + n);
}
function updateScoreCounter() {
  const el = document.getElementById('score-counter');
  if (el) el.textContent = 'DravCoin: ' + getTotalScore();
}
// При загрузке страницы обновляем счётчик
window.addEventListener('DOMContentLoaded', updateScoreCounter);

function startKazino2() {
  document.querySelector('.game-section').style.display = 'none';
  document.getElementById('game-area').style.display = 'none';
  document.getElementById('kazino2-area').style.display = '';
  // Элементы
  const balanceDisplay = document.getElementById('kazino2-balanceDisplay');
  const slotStrip = document.getElementById('kazino2-slotStrip');
  const spinBtn = document.getElementById('kazino2-spinBtn');
  const spinSound = document.getElementById('kazino2-spinSound');
  const caseOpenSound = document.getElementById('kazino2-caseOpenSound');
  const backBtn = document.getElementById('kazino2-back');
  const casinoPromoModal = document.getElementById('casino-promo-modal');
  const casinoPromoCode = document.getElementById('casino-promo-code');
  const casinoPromoSell = document.getElementById('casino-promo-sell');
  const casinoPromoKeep = document.getElementById('casino-promo-keep');
  let currentPromo = null;
  // Баланс = DravCoin
  function updateBalance() {
    balanceDisplay.textContent = `Баланс: ${getTotalScore()} монет`;
  }
  // Генерация предметов
  function getUsedCasinoPromos() {
    return JSON.parse(localStorage.getItem('dravona_casino_promos_used') || '[]');
  }
  function markCasinoPromoUsed(code) {
    const used = getUsedCasinoPromos();
    used.push(code);
    localStorage.setItem('dravona_casino_promos_used', JSON.stringify(used));
  }
  function generateItems(count) {
    const items = [];
    for(let i=0; i<count; i++) {
      if (Math.random() < 0.10) {
        const usedPromos = getUsedCasinoPromos();
        const availablePromos = DRAVONA_PROMOCODES.filter(p => !usedPromos.includes(p));
        if (availablePromos.length === 0) {
          items.push({emoji: '🎟️', text: 'Промокоды закончились', promo: null, finished: true});
        } else {
          const promo = availablePromos[Math.floor(Math.random()*availablePromos.length)];
          items.push({emoji: '🎟️', text: `Промокод`, promo});
        }
      } else {
        const coins = 5 * (4 + Math.floor(Math.random() * 13));
        items.push({emoji: '🪙', text: `${coins} монет`, coins});
      }
    }
    return items;
  }
  const itemWidth = 100;
  const spinCost = 150;
  const baseItems = generateItems(50);
  const repeatedItems = [...baseItems, ...baseItems, ...baseItems];
  function renderStrip(items) {
    slotStrip.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'slot-item';
      div.innerHTML = `<div class="emoji">${item.emoji}</div><div>${item.text}</div>`;
      slotStrip.appendChild(div);
    });
  }
  renderStrip(repeatedItems);
  let currentIndex = baseItems.length;
  slotStrip.style.transform = `translateX(${-currentIndex * itemWidth + 300/2 - itemWidth/2}px)`;
  updateBalance();
  let spinning = false;
  spinBtn.onclick = function() {
    if(spinning) return;
    if(getTotalScore() < spinCost) {
      alert('Недостаточно монет для прокрутки!');
      return;
    }
    setScore(getTotalScore() - spinCost);
    updateBalance();
    spinning = true;
    spinBtn.disabled = true;
    spinSound.currentTime = 0;
    spinSound.play().catch(() => {});
    const moveBy = Math.floor(30 + Math.random() * 20);
    let targetIndex = currentIndex + moveBy;
    const targetTranslateX = -targetIndex * itemWidth + 300/2 - itemWidth/2;
    slotStrip.style.transition = 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)';
    slotStrip.style.transform = `translateX(${targetTranslateX}px)`;
    setTimeout(() => {
      currentIndex = targetIndex;
      if(currentIndex >= baseItems.length * 2) {
        currentIndex -= baseItems.length;
        slotStrip.style.transition = 'none';
        const resetTranslateX = -currentIndex * itemWidth + 300/2 - itemWidth/2;
        slotStrip.style.transform = `translateX(${resetTranslateX}px)`;
      }
      spinSound.pause();
      spinSound.currentTime = 0;
      caseOpenSound.currentTime = 0;
      caseOpenSound.play().catch(() => {});
      const landedItem = repeatedItems[currentIndex];
      if(landedItem.coins) {
        addScore(landedItem.coins);
        alert(`Выпало: ${landedItem.emoji} ${landedItem.text}\nВы получили ${landedItem.coins} монет!`);
      } else if (landedItem.finished) {
        alert('Промокоды закончились, обратитесь в Тех. Поддержку: @sanyok6789');
      } else if (landedItem.promo) {
        // --- Кастомная модалка для продажи/оставить ---
        currentPromo = landedItem.promo;
        casinoPromoCode.textContent = `🎟️`;
        casinoPromoModal.style.display = 'flex';
        casinoPromoSell.onclick = function() {
          addScore(600);
          markCasinoPromoUsed(currentPromo);
          casinoPromoModal.style.display = 'none';
          updateBalance();
          alert('Промокод продан! Вы получили 600 DravCoin.');
        };
        casinoPromoKeep.onclick = function() {
          markCasinoPromoUsed(currentPromo);
          casinoPromoModal.style.display = 'none';
          updateBalance();
          alert(`Выпал промокод: ${currentPromo}\nВведи его в бота @Dravon_bot`);
          alert(`Выпало: 🎟️ Промокод\nПоздравляем!`);
        };
        return;
      }
      updateBalance();
      spinning = false;
      spinBtn.disabled = false;
    }, 5000);
  };
  backBtn.onclick = function() {
    document.getElementById('kazino2-area').style.display = 'none';
    document.getElementById('game-area').style.display = '';
    showMenu();
  };
}
// --- Переопределяю кнопку меню ---
document.querySelector('button[onclick="startKazino2()"]') && (document.querySelector('button[onclick="startKazino2()"]').onclick = startKazino2);

function getPromoUsedCount(code) {
  const used = JSON.parse(localStorage.getItem('dravcoin_promos_used_count') || '{}');
  return used[code] || 0;
}
function markPromoUsedCount(code) {
  const used = JSON.parse(localStorage.getItem('dravcoin_promos_used_count') || '{}');
  used[code] = (used[code] || 0) + 1;
  localStorage.setItem('dravcoin_promos_used_count', JSON.stringify(used));
}

function isPromoUsedByUser(code) {
  const used = JSON.parse(localStorage.getItem('dravcoin_promos_used_by_user') || '[]');
  return used.includes(code);
}
function markPromoUsedByUser(code) {
  const used = JSON.parse(localStorage.getItem('dravcoin_promos_used_by_user') || '[]');
  used.push(code);
  localStorage.setItem('dravcoin_promos_used_by_user', JSON.stringify(used));
}
