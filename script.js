function showMenu() {
  document.getElementById('game-area').innerHTML = '';
  document.querySelector('.game-section').style.display = '';
  document.onkeydown = null;
  removeMemoryGameIfExtra();
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
    if (guess === number) { document.getElementById('result').innerText = 'Правильно!'; }
    else { document.getElementById('result').innerText = 'Неправильно! Было: ' + number; }
  };
  addBackButton();
}

function startRoulette() {
  document.querySelector('.game-section').style.display = 'none';
  const area = document.getElementById("game-area");
  area.innerHTML = `<h2>Рулетка</h2><canvas id='roulette-canvas' width='320' height='320'></canvas><br><button id='spin-btn'>Крутить</button>`;

  const outcomes = [
    {text: "-3 очка", score: -3, color: '#e53935'},
    {text: "-2 очка", score: -2, color: '#fb8c00'},
    {text: "-1 очко", score: -1, color: '#fbc02d'},
    {text: "0 очков", score: 0, color: '#bdbdbd'},
    {text: "+1 очко", score: 1, color: '#43a047'},
    {text: "+2 очка", score: 2, color: '#1e88e5'},
    {text: "+3 очка", score: 3, color: '#8e24aa'}
  ];
  const canvas = document.getElementById('roulette-canvas');
  const ctx = canvas.getContext('2d');
  const center = 160;
  const radius = 140;
  const sectorAngle = 2 * Math.PI / outcomes.length;
  let angle = 0;
  let spinning = false;

  function drawWheel(highlightIdx = null) {
    ctx.clearRect(0, 0, 320, 320);
    for (let i = 0; i < outcomes.length; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle + i * sectorAngle, angle + (i + 1) * sectorAngle);
      ctx.closePath();
      ctx.fillStyle = outcomes[i].color;
      ctx.globalAlpha = (highlightIdx === i) ? 0.85 : 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
      // Текст
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + (i + 0.5) * sectorAngle);
      ctx.textAlign = 'right';
      ctx.font = 'bold 13px Arial';
      ctx.fillStyle = '#222';
      wrapText(ctx, outcomes[i].text, radius - 12, 0, 60, 13);
      ctx.restore();
    }
    // Стрелка
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(center, center - radius - 10);
    ctx.lineTo(center - 15, center - radius + 20);
    ctx.lineTo(center + 15, center - radius + 20);
    ctx.closePath();
    ctx.fillStyle = '#FF7043';
    ctx.fill();
    ctx.restore();
  }

  drawWheel();

  document.getElementById('spin-btn').onclick = function() {
    if (spinning) return;
    spinning = true;
    let spinAngle = Math.random() * 4 * Math.PI + 6 * Math.PI; // 3-5 оборотов
    let start = null;
    let lastAngle = angle;
    function animate(ts) {
      if (!start) start = ts;
      let elapsed = ts - start;
      let progress = Math.min(elapsed / 3000, 1); // 3 секунды
      // easeOutCubic
      let eased = 1 - Math.pow(1 - progress, 3);
      angle = lastAngle + spinAngle * eased;
      drawWheel();
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        angle = angle % (2 * Math.PI);
        let idx = Math.floor(((2 * Math.PI - angle + sectorAngle / 2) % (2 * Math.PI)) / sectorAngle);
        drawWheel(idx);
        spinning = false;
      }
    }
    requestAnimationFrame(animate);
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
        started = false;
        clicks = 0;
      }, 3000);
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

// Инициализация
window.onload = function() {
  // Автозапуск музыки
  const music = document.getElementById('bg-music');
  const volumeSlider = document.getElementById('music-volume');
  if (music) {
    music.volume = volumeSlider ? parseFloat(volumeSlider.value) : 0.5;
    music.play().catch(()=>{});
    document.body.addEventListener('click', function oncePlay() {
      music.play().catch(()=>{});
      document.body.removeEventListener('click', oncePlay);
    });
    if (volumeSlider) {
      volumeSlider.addEventListener('input', function() {
        music.volume = parseFloat(this.value);
      });
    }
  }
  showMenu();
};

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
  function playerReset() {
    const pieces = 'TJLOSZI';
    player.matrix = createPiece(pieces[Math.floor(Math.random() * pieces.length)]).matrix;
    player.pos.y = 0;
    player.pos.x = Math.floor(COLS / 2) - Math.floor(player.matrix[0].length / 2);
    if(collide(grid, player)) {
      grid.forEach(row => row.fill(0));
      player.score = 0;
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
  updateScore();
  running = true;
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

// Автоматическое удаление игры на память, если в меню больше 9 игр
function removeMemoryGameIfExtra() {
  const menu = document.querySelector('.game-section');
  const memoryBtn = Array.from(menu.children).find(btn => btn.innerText.includes('Игра на память'));
  if (menu.children.length > 9 && memoryBtn) {
    memoryBtn.remove();
    const memArea = document.getElementById('memory-area');
    if (memArea) memArea.remove();
  }
}

// Проверять при каждом открытии меню
const origShowMenu = showMenu;
showMenu = function() {
  origShowMenu();
  removeMemoryGameIfExtra();
};

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
  let rocketX = (gameArea.offsetWidth - rocket.offsetWidth) / 2;
  let rocketY = gameArea.offsetHeight - rocket.offsetHeight - 10;
  let meteors = [];
  let meteorInterval = null;
  let moveInterval = null;
  let gameRunning = true;

  function resetGame() {
    document.querySelector('.game-section').style.display = 'none';
    meteors.forEach(m => m.el.remove());
    meteors = [];
    rocketX = (gameArea.offsetWidth - rocket.offsetWidth) / 2;
    rocket.style.left = rocketX + 'px';
    rocket.style.bottom = '30px';
    gameoverDiv.style.display = 'none';
    gameRunning = true;
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