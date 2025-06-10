// --- ПРОМОКОДЫ ДЛЯ КАЗИНО ---
const DRAVONA_PROMOCODES = [
  'DRVN-7Q2K9L1A','DRVN-4X8J2M5B','DRVN-9W3E6T7C','DRVN-2A5S8D9F','DRVN-6Z1X4C7V','DRVN-3B7N2M8Q','DRVN-5L9K1J4H','DRVN-8G2F5D6S','DRVN-1P4O7I3U','DRVN-7Y2T5R8E',
  'DRVN-4W9Q1A6S','DRVN-2D5F8G3H','DRVN-6J1K4L7Z','DRVN-3X7C2V5B','DRVN-5N8M1Q4W','DRVN-9E2R5T6Y','DRVN-1U4I7O3P','DRVN-7S2D5F8G','DRVN-4H9J1K6L','DRVN-2Z5X8C3V',
  'DRVN-AB12CD34','DRVN-EF56GH78','DRVN-IJ90KL12','DRVN-MN34OP56','DRVN-QR78ST90','DRVN-UV12WX34','DRVN-YZ56AB78','DRVN-CD90EF12','DRVN-GH34IJ56','DRVN-KL78MN90',
];

// --- ПРОМОКОДЫ НА МОНЕТЫ ---
const DRAVCOIN_PROMOS = {
};

// Base names mapping to first upgrade level
const BASE_TO_FIRST_UPGRADE = {
  'candy': 'candy1',
  'cookie': 'cookie1', 
  'duxi': 'duxi1',
  'egg': 'egg1',
  'eye': 'eye1',
  'happy': 'happy1',
  'box': 'box1',  // Fix: ensure pure Latin characters
  'metla': 'metla1',
  'pepe': 'pepe1',
  'posion': 'posion1',
  'rabit': 'rabit1',
  'tamagochi': 'tamagochi1',
  'tikva': 'tikva1',
  'cake': 'cake1',
  'zvezda': 'zvezda1',
  'bengalski': 'bengalski1',
};

// Changed UPGRADE_GROUPS to an object with full upgrade paths
const UPGRADE_GROUPS = {
  "candy": ["candy1", "candy2", "candy3", "candy4", "candy5", "candy6"],
  "cookie": ["cookie1", "cookie2", "cookie3", "cookie4", "cookie5", "cookie6"],
  "duxi": ["duxi1", "duxi2", "duxi3", "duxi4", "duxi5", "duxi6"],
  "egg": ["egg1", "egg2", "egg3", "egg4", "egg5", "egg6"],
  "eye": ["eye1", "eye2", "eye3", "eye4", "eye5", "eye6"],
  "happy": ["happy1", "happy2", "happy3", "happy4", "happy5", "happy6"],
  "box": ["box1", "box2", "box3", "box4", "box5", "box6"],
  "metla": ["metla1", "metla2", "metla3", "metla4", "metla5", "metla6"],
  "pepe": ["pepe1", "pepe2", "pepe3", "pepe4", "pepe5", "pepe6"],
  "posion": ["posion1", "posion2", "posion3", "posion4", "posion5", "posion6"],
  "rabit": ["rabit1", "rabit2", "rabit3", "rabit4", "rabit5", "rabit6"],
  "tamagochi": ["tamagochi1", "tamagochi2", "tamagochi3", "tamagochi4", "tamagochi5", "tamagochi6"],
  "tikva": ["tikva1", "tikva2", "tikva3", "tikva4", "tikva5", "tikva6"],
  "cake": ["cake1", "cake2", "cake3", "cake4", "cake5", "cake6"],
  "zvezda": ["zvezda1", "zvezda2", "zvezda3", "zvezda4", "zvezda5", "zvezda6"],
  "bengalski": ["bengalski1", "bengalski2", "bengalski3", "bengalski4", "bengalski5", "bengalski6"]

};

function upgradeToy(toy) {
  // Get base name without any numbers
  const baseName = toy.name.replace(/[0-9()]/g, '');
  const upgradePath = UPGRADE_GROUPS[baseName];
  
  if (!upgradePath) {
    console.log('No upgrade path found for:', baseName);
    return null;
  }

  // Pick a random level between 1-6 with equal probability
  const newLevel = Math.floor(Math.random() * 6) + 1;
  return baseName + newLevel;
}

// Add this helper function to ensure equal random chances
function getRandomUpgrade(baseName) {
  // Generate random level 1-6 with equal probability
  const level = Math.floor(Math.random() * 6) + 1;
  return baseName + level;
}

function addToyToInventory(toy) {
  let inv = getInventory();
  
  if (!inv.toys) {
    inv.toys = [];
  }

  // Clean up the name and convert PNG to MP4 path
  const baseName = toy.name.replace(/\.[^/.]+$/, ''); // Remove any file extension
  const videoPath = convertToVideoPath(toy.src);

  // Add toy with MP4 video source
  inv.toys.push({
    name: baseName,
    src: videoPath,
    upgraded: false
  });

  saveInventory(inv);
  
  if (document.getElementById('inventory-area').style.display !== 'none') {
    renderInventoryNew();
  }
}

// Helper function to convert PNG to MP4 filename
function convertToVideoPath(pngPath) {
  return pngPath.replace('.png', '.mp4');
}

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

// --- Скрыть все игровые секции ---
function hideAllGameSections() {
  const ids = [
    'game-area',
    'tetris-area',
    'memory-area',
    'kosmo-area',
    'catch-button-area',
    'kazino2-area'
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// --- Скрыть все меню и игровые секции ---
function hideAllMenusAndSections() {
  const ids = [
    'main-menu',
    'games-section',
    'cases-section',
    'shop-area',
    'game-area',
    'tetris-area',
    'memory-area',
    'kosmo-area',
    'catch-button-area',
    'kazino2-area'
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

function hideAllSections() {
  document.getElementById('main-menu').style.display = 'none';
  document.getElementById('inventory-area').style.display = 'none';
  document.getElementById('background-case-area').style.display = 'none';
  document.getElementById('kazino2-area').style.display = 'none';
  document.getElementById('shop-area').style.display = 'none';
  document.getElementById('games-section').style.display = 'none';
  document.getElementById('game-area').style.display = 'none';
  // Добавь сюда другие секции, если появятся
}

function startTicTacToe() {
  hideAllMenusAndSections();
  document.getElementById('game-area').style.display = '';
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
      if (win('X')) { status.innerText = "Ты победил!"; gameOver = true; addScore(2); } // 2 монеты за победу
      else if (win('O')) { status.innerText = "Ты проиграл!"; gameOver = true; }
      else if (!cells.includes('')) { status.innerText = "Ничья."; gameOver = true; }
    }

    renderBoard();
  addBackButton();
  }

  function startBombGame() {
  hideAllMenusAndSections();
  document.getElementById('game-area').style.display = '';
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
          area.innerHTML += "<div style='color:#fff;background:#e53935;font-size:1.5em;margin:18px 0;padding:10px 0;border-radius:8px;'>🟥 Ты проиграл! 🟥</div>";
        } else {
          addScore(1); // 1 монета за победу
          boxesRow.innerHTML = '✅✅✅';
          area.innerHTML += "<div style='color:#fff;background:#43a047;font-size:1.5em;margin:18px 0;padding:10px 0;border-radius:8px;'>🟩 Ты победил! +1 монета 🟩</div>";
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
  hideAllMenusAndSections();
  document.getElementById('game-area').style.display = '';
  const area = document.getElementById("game-area");
  const number = Math.floor(Math.random() * 10) + 1;
  area.innerHTML = `<h2>Угадай число от 1 до 10</h2><input id='guess' type='number' min='1' max='10'><button id='guess-btn'>Проверить</button><p id='result'></p>`;
  document.getElementById('guess-btn').onclick = function () {
    const guess = parseInt(document.getElementById('guess').value);
    if (guess === number) {
      addScore(1); // 1 монета за победу
      document.getElementById('result').innerText = 'Правильно! +1 монета';
    } else {
      document.getElementById('result').innerText = 'Неправильно! Было: ' + number;
    }
  };
  addBackButton();
}

function startMathQuiz() {
  hideAllMenusAndSections();
  document.getElementById('game-area').style.display = '';
  const area = document.getElementById("game-area");
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  area.innerHTML = `<h2>Сколько будет ${a} × ${b}?</h2><input id='answer' type='number'><button onclick='checkMath()'>Ответить</button><p id='math-result'></p>`;
  window.checkMath = function () {
    const ans = parseInt(document.getElementById('answer').value);
    if (ans === (a * b)) { 
      addScore(2); // 2 монеты за правильный ответ
      document.getElementById('math-result').innerText = 'Верно! +2 монеты'; 
    }
    else { document.getElementById('math-result').innerText = 'Неверно!'; }
  }
  addBackButton();
}

function startButtonGame() {
  hideAllMenusAndSections();
  document.getElementById('game-area').style.display = '';
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
        if (clicks >= 100) {
          addScore(2);
          document.getElementById('btn-result').innerText = `Время вышло! Клики: ${clicks}\nОтлично! +2 монеты`;
        } else {
          document.getElementById('btn-result').innerText = `Время вышло! Клики: ${clicks}\nПопробуй набрать 100 кликов для награды!`;
        }
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
  hideAllMenusAndSections();
  document.getElementById('game-area').style.display = '';
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
      addScore(lines*10); // 10 монет за каждый ряд (10 очков)
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
  const gameSection = document.querySelector('.game-section');
  const shopPromo = document.getElementById('shop-promo');
  const shopBack = document.getElementById('shop-back');
  if (gameSection && shopPromo && shopBack) {
    shopBack.onclick = function() {
      gameSection.style.display = 'none';
      document.getElementById('game-area').style.display = 'none';
      shopPromo.textContent = '';
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
  // --- Новое меню ---
  const mainMenu = document.getElementById('main-menu');
  const gamesSection = document.getElementById('games-section');
  const shopArea = document.getElementById('shop-area');
  const gamesBtn = document.getElementById('menu-games-btn');
  const shopMenuBtn = document.getElementById('menu-shop-btn');
  const gamesBackBtn = document.getElementById('games-back-btn');
  const shopBackBtn = document.getElementById('shop-back');

  if (mainMenu && gamesSection && shopArea) {
    mainMenu.style.display = '';
    gamesSection.style.display = 'none';
    shopArea.style.display = 'none';
    document.getElementById('game-area').style.display = 'none';
    gamesBtn.onclick = function() {
      mainMenu.style.display = 'none';
      gamesSection.style.display = '';
      shopArea.style.display = 'none';
      document.getElementById('game-area').style.display = 'none';
    };
    shopMenuBtn.onclick = function() {
      mainMenu.style.display = 'none';
      gamesSection.style.display = 'none';
      shopArea.style.display = '';
      document.getElementById('game-area').style.display = 'none';
    };
    gamesBackBtn.onclick = function() {
      mainMenu.style.display = '';
      gamesSection.style.display = 'none';
      shopArea.style.display = 'none';
      document.getElementById('game-area').style.display = 'none';
    };
    if (shopBackBtn) {
      shopBackBtn.onclick = function() {
        // Скрыть все секции и показать только главное меню
        hideAllMenusAndSections();
        mainMenu.style.display = '';
      };
    }
  }
  // --- Глобальный обработчик для всех кнопок 'Назад в меню' ---
  document.addEventListener('click', function(e) {
    if (e.target.classList && e.target.classList.contains('back-btn')) {
      e.preventDefault();
      // Скрываем секцию кейса с фонами при любом возврате в меню
      const backgroundCaseArea = document.getElementById('background-case-area');
      if (backgroundCaseArea) backgroundCaseArea.style.display = 'none';
      // Скрываем инвентарь при любом возврате в меню
      const inventoryArea = document.getElementById('inventory-area');
      if (inventoryArea) inventoryArea.style.display = 'none';
      const mainMenu = document.getElementById('main-menu');
      const gamesSection = document.getElementById('games-section');
      const casesSection = document.getElementById('cases-section');
      const shopArea = document.getElementById('shop-area');
      const gameArea = document.getElementById('game-area');
      if (window._lastMenuSection === 'games') {
        if (mainMenu) mainMenu.style.display = 'none';
        if (gamesSection) gamesSection.style.display = '';
        if (casesSection) casesSection.style.display = 'none';
        if (shopArea) shopArea.style.display = 'none';
        if (gameArea) gameArea.style.display = 'none';
      } else if (window._lastMenuSection === 'cases') {
        if (mainMenu) mainMenu.style.display = 'none';
        if (gamesSection) gamesSection.style.display = 'none';
        if (casesSection) casesSection.style.display = '';
        if (shopArea) shopArea.style.display = 'none';
        if (gameArea) gameArea.style.display = 'none';
      } else {
        if (mainMenu) mainMenu.style.display = '';
        if (gamesSection) gamesSection.style.display = 'none';
        if (casesSection) casesSection.style.display = 'none';
        if (shopArea) shopArea.style.display = 'none';
        if (gameArea) gameArea.style.display = 'none';
      }
      window._lastMenuSection = null;
    }
  });
  // --- Назначение обработчиков для всех игровых кнопок ---
  if (gamesSection) {
    const btns = gamesSection.querySelectorAll('button');
    btns.forEach(btn => {
      switch (btn.textContent.trim()) {
        case '1. Крестики-нолики':
          btn.onclick = function() { window._lastMenuSection = 'games'; startTicTacToe(); };
          break;
        case '2. Не попади на бомбу':
          btn.onclick = function() { window._lastMenuSection = 'games'; startBombGame(); };
          break;
        case '3. Угадай число':
          btn.onclick = function() { window._lastMenuSection = 'games'; startGuessNumber(); };
          break;
        case '4. Математическая викторина':
          btn.onclick = function() { window._lastMenuSection = 'games'; startMathQuiz(); };
          break;
        case '5. Кнопка':
          btn.onclick = function() { window._lastMenuSection = 'games'; startButtonGame(); };
          break;
        case '6. Тетрис':
          btn.onclick = function() { window._lastMenuSection = 'games'; startTetris(); };
          break;
        case '7. Космическая игра':
          btn.onclick = function() { window._lastMenuSection = 'games'; startKosmoGame(); };
          break;
        case '8. Игра на память':
          btn.onclick = function() { window._lastMenuSection = 'games'; startMemoryGame(); };
          break;
      }
    });
  }
  const menuInventoryBtn = document.getElementById('menu-inventory-btn');
  if (menuInventoryBtn) {
    menuInventoryBtn.onclick = function() {
      window._lastMenuSection = null;
      openInventory();
    };
  }
  // Назначаем обработчик на кнопку открытия кейса с фонами
  var rollBtn = document.getElementById('background-case-roll');
  if (rollBtn) {
    rollBtn.onclick = function() {
      if (window._backgroundCaseRolling) return;
      if (getTotalScore() < backgroundCasePrice) {
        document.getElementById('background-case-result').innerText = 'Недостаточно монет!';
        return;
      }
      setScore(getTotalScore() - backgroundCasePrice);
      updateBackgroundCaseBalance();
      window._backgroundCaseRolling = true;
      document.getElementById('background-case-result').innerText = '';
      const itemsContainer = document.getElementById('background-case-items');
      const preItems = 60;
      const postItems = 10;
      const allItems = [];
      for (let i = 0; i < preItems; i++) allItems.push(getRandomBackgroundCaseItem());
      const winItem = getRandomBackgroundCaseItem();
      allItems.push(winItem);
      for (let i = 0; i < postItems; i++) allItems.push(getRandomBackgroundCaseItem());
      itemsContainer.innerHTML = '';
      allItems.forEach(num => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = backgroundCaseNames[num-1];
        itemsContainer.appendChild(div);
      });
      const winIndex = preItems;
      const itemWidth = 124;
      const offset = winIndex * itemWidth - (400 - itemWidth / 2);
      itemsContainer.style.transition = 'none';
      itemsContainer.style.transform = 'translateX(0)';
      void itemsContainer.offsetWidth;
      document.getElementById('background-case-spinSound').currentTime = 0;
      document.getElementById('background-case-spinSound').play();
      setTimeout(() => {
        itemsContainer.style.transition = 'transform 5s cubic-bezier(0.2, 1, 0.3, 1)';
        itemsContainer.style.transform = `translateX(-${offset}px)`;
      }, 50);
      setTimeout(() => {
        const selectedItem = itemsContainer.children[winIndex];
        const text = selectedItem.innerText;
        document.getElementById('background-case-winSound').currentTime = 0;
        document.getElementById('background-case-winSound').play();
        document.getElementById('background-case-result').innerText = `Выпало: ${text}`;
        
        // Add reward for specific background
        if (text === 'Black Wall') {
          addScore(40); // Return 40 coins for Black Wall background
          document.getElementById('background-case-result').innerText += '\nПолучено: 40 монет!';
        }

        addBackgroundToInventory({
          name: text,
          img: text + '.jpg'
        });
        window._backgroundCaseRolling = false;
      }, 5050);
    };
  }
  // --- Очистка инвентаря с подтверждением ---
  function clearInventory() {
    if (confirm('Вы уверены, что хотите полностью очистить инвентарь?')) {
      // Сохраняем только базовый фон
      localStorage.setItem('dravon_inventory', JSON.stringify({backgrounds:[{name:'Dravona',img:'Dravona.jpg'}]}));
      // Ставим фон Dravona.jpg как выбранный
      localStorage.setItem('dravon_selected_bg', 'Dravona.jpg');
      document.body.style.backgroundImage = "url('Dravona.jpg')";
      renderInventoryNew();
      const msgDiv = document.getElementById('inventory-message');
      if (msgDiv) msgDiv.textContent = 'Инвентарь очищен! Базовый фон сохранён и установлен.';
    }
  }
  // Назначаем обработчик на кнопку очистки инвентаря
  const clearBtn = document.getElementById('inventory-clear');
  if (clearBtn) {
    clearBtn.onclick = clearInventory;
  }
  // --- Кнопка Казино Видео в главном меню ---
  const mainCasinoVideoBtn = document.getElementById('main-casino-video-btn');
  if (mainCasinoVideoBtn) {
    mainCasinoVideoBtn.onclick = function() {
      startKazinoVideo();
    };
  }
});

// --- Поймай кнопку ---
function startCatchButtonGame() {
  hideAllMenusAndSections();
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
  hideAllMenusAndSections();
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

function startMemoryGame() {
  hideAllMenusAndSections();
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
        addScore(5); // 5 монет за победу
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

function startKosmoGame() {
  hideAllMenusAndSections();
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
        addScore(15); // 15 монет за 30 секунд
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
  };
  startGame();
}

// --- Глобальные функции для баллов ---
function getTotalScore() {
  const val = parseInt(localStorage.getItem('dravon_score'), 10);
  return isNaN(val) ? 0 : val;
}
function setScore(n) {
  const num = Number(n);
  localStorage.setItem('dravon_score', isNaN(num) ? 0 : num);
  updateScoreCounter();
}
function addScore(n) {
  setScore(getTotalScore() + n);
}
function updateScoreCounter() {
  const el = document.getElementById('score-counter');
  if (el) {
    const span = el.querySelector('span');
    if (span) span.textContent = 'DravCoin: ' + getTotalScore();
  }
}
// При загрузке страницы обновляем счётчик
window.addEventListener('DOMContentLoaded', updateScoreCounter);

function startKazino2() {
  hideAllMenusAndSections();
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
  const spinCost = 70; // Basic case cost
  const baseItems = generateItems(50);
  const repeatedItems = [...baseItems, ...baseItems, ...baseItems];
  function renderStrip(items) {
    slotStrip.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'slot-item';
      div.innerHTML = `<div class=\"emoji\">${item.emoji}</div><div>${item.text}</div>`;
      slotStrip.appendChild(div);
    });
  }
  renderStrip(repeatedItems);
  let currentIndex = baseItems.length;
  slotStrip.style.transform = `translateX(${-currentIndex * itemWidth + 300/2 - itemWidth/2}px)`;
  updateBalance();
  let spinning = false;
  spinBtn.onclick = function() {
    if (spinning) return;
    if (getTotalScore() < spinCost) {
      alert('Монеты не достают!');
      return;
    }
    setScore(getTotalScore() - spinCost);
    spinning = true;
    spinBtn.disabled = true;
    spinSound.currentTime = 0;
    spinSound.play().catch(() => {});
    const randomMove = Math.floor(30 + Math.random() * 20);
    let targetIndex = currentIndex + randomMove;
    const targetTranslateX = -targetIndex * itemWidth + 300/2 - itemWidth/2;
    slotStrip.style.transition = 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)';
    slotStrip.style.transform = `translateX(${targetTranslateX}px)`;
    setTimeout(() => {
      currentIndex = targetIndex;
      if (currentIndex >= baseItems.length * 2) {
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
      if (landedItem.coins) {
        addScore(landedItem.coins);
        alert(`Выпало: ${landedItem.emoji} ${landedItem.text}\nВы получили ${landedItem.coins} монет!`);
      } else if (landedItem.finished) {
        alert('Промокоды закончились, обратитесь в Тех. Поддержку: @sanyok6789');
      } else if (landedItem.promo) {
        // --- Кастомная модалка для продажи/сохранения ---
        currentPromo = landedItem.promo;
        casinoPromoCode.textContent = `🎟️`;
        casinoPromoModal.style.display = 'flex';
        casinoPromoSell.onclick = function() {
          addScore(700); // increased reward for selling
          markCasinoPromoUsed(currentPromo);
          casinoPromoModal.style.display = 'none';
          updateBalance();
          alert('Промокод успешно продан! Вы получили 700 DravCoin.');
        };
        casinoPromoKeep.onclick = function() {
          markCasinoPromoUsed(currentPromo);
          casinoPromoModal.style.display = 'none';
          updateBalance();
          alert(`Промокод сохранён: ${currentPromo}\nИспользуйте его в игре.`);
        };
      }
    }, 5000);
  };
  backBtn.onclick = function() {
    document.getElementById('kazino2-area').style.display = 'none';
    document.getElementById('game-area').style.display = '';
    showMenu();
  };
}

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

// === Инвентарь (переписано с нуля) ===
function openInventory() {
  hideAllSections();
  document.getElementById('inventory-area').style.display = '';
  document.getElementById('main-menu').style.display = 'none';
  window._lastMenuSection = null;
  renderInventoryNew();
}

function renderInventoryNew() {
  const invDiv = document.getElementById('inventory-backgrounds');
  const msgDiv = document.getElementById('inventory-message');
  const inventory = getInventory();
  const selectedBg = localStorage.getItem('dravon_selected_bg') || '';
  invDiv.innerHTML = '';
  // --- Фоны ---
  if (inventory.backgrounds && inventory.backgrounds.length > 0) {
  msgDiv.textContent = 'Кликните по фону, чтобы применить его!';
  inventory.backgrounds.forEach(bg => {
    const div = document.createElement('div');
    div.className = 'slot-item';
    div.style.cursor = 'pointer';
    div.style.border = (selectedBg === bg.img) ? '3px solid #ff9800' : '2px solid #444';
    div.style.boxShadow = (selectedBg === bg.img) ? '0 0 12px #ff9800' : '';
    if (bg.isVideo) {
      div.innerHTML = `<video src="${bg.img}" style="width:80px;height:60px;border-radius:8px;object-fit:cover;" muted loop autoplay playsinline preload="auto"></video><br>${bg.name}`;
    } else {
      div.innerHTML = `<img src="${bg.img}" alt="${bg.name}" style="width:80px;height:60px;border-radius:8px;"><br>${bg.name}`;
    }
    div.onclick = () => {
      applyBackground(bg.img);
      renderInventoryNew();
      msgDiv.textContent = `Фон '${bg.name}' применён!`;
    };
    invDiv.appendChild(div);
  });
  }
  // --- Игрушки ---
  if (inventory.toys && inventory.toys.length > 0) {
    const toysTitle = document.createElement('div');
    toysTitle.textContent = 'Ваши игрушки:';
    toysTitle.style = 'width:100%;text-align:center;font-weight:bold;margin:12px 0 4px 0;color:#1E90FF;';
    invDiv.appendChild(toysTitle);
    inventory.toys.forEach(toy => {
      const div = document.createElement('div');
      div.className = 'slot-item';
      div.style.cursor = 'pointer';
      
      // Add video preview
      div.innerHTML = `
        <video src="${toy.src}" style="width:80px;height:60px;border-radius:8px;object-fit:cover;" 
               muted loop autoplay playsinline preload="auto"></video>
        <br>${toy.name}`;

      // Add upgrade handler
      div.onclick = () => {
        if (toy.upgraded) {
          alert('Этот подарок уже был улучшен!');
          return;
        }

        // Check for next upgrade
        const nextLevel = upgradeToy(toy);
        if (!nextLevel) {
          alert('Этот подарок уже улучшен максимально!');
          return;
        }

        if (getTotalScore() < 25) {
          alert('Недостаточно монет! Нужно 25 монет для улучшения.');
          return;
        }

        if (confirm(`Улучшить ${toy.name} за 25 монет?`)) {
          addScore(-25);
          toy.name = nextLevel;
          toy.src = nextLevel + '.mp4';
          toy.upgraded = true;
          saveInventory(inventory);
          renderInventoryNew();
          alert('Подарок успешно улучшен!');
        }
      };

      invDiv.appendChild(div);
    });
  }
  if ((!inventory.backgrounds || inventory.backgrounds.length === 0) && (!inventory.toys || inventory.toys.length === 0)) {
    msgDiv.textContent = 'У вас пока нет фонов или игрушек. Выиграйте их в кейсе или казино!';
  }
}

function getInventory() {
  // Теперь поддерживает и backgrounds, и toys
  return JSON.parse(localStorage.getItem('dravon_inventory') || '{"backgrounds":[],"toys":[]}');
}
function saveInventory(inv) {
  localStorage.setItem('dravon_inventory', JSON.stringify(inv));
}
function addBackgroundToInventory(bg) {
  let inv;
  try {
    inv = getInventory();
    if (!inv.backgrounds) throw new Error();
  } catch {
    inv = {backgrounds:[], toys:[]};
  }
  // Check if background already exists - if so, give 40 coins
  if (inv.backgrounds.some(b => b.img === bg.img)) {
    addScore(40); // Give 40 coins for duplicate background
    document.getElementById('background-case-result').innerText += '\nЭтот фон у вас уже есть! Получено: 40 монет';
    return;
  }
  inv.backgrounds.push(bg);
  saveInventory(inv);
  // Если открыт инвентарь — сразу обновить
  if (document.getElementById('inventory-area').style.display !== 'none') {
    renderInventoryNew();
  }
}
function addToyToInventory(toy) {
  let inv = getInventory();
  
  if (!inv.toys) {
    inv.toys = [];
  }

  // Clean up the name and convert PNG to MP4 path
  const baseName = toy.name.replace(/\.[^/.]+$/, ''); // Remove any file extension
  const videoPath = convertToVideoPath(toy.src);

  // Add toy with MP4 video source
  inv.toys.push({
    name: baseName,
    src: videoPath,
    upgraded: false
  });

  saveInventory(inv);
  
  if (document.getElementById('inventory-area').style.display !== 'none') {
    renderInventoryNew();
  }
}

// Helper function to convert PNG to MP4 filename
function convertToVideoPath(pngPath) {
  return pngPath.replace('.png', '.mp4');
}

function applyBackground(img) {
  document.body.style.backgroundImage = `url('${img}')`;
  localStorage.setItem('dravon_selected_bg', img);
}
// При загрузке страницы применяем выбранный фон
window.addEventListener('DOMContentLoaded', function() {
  const bg = localStorage.getItem('dravon_selected_bg');
  if (bg) document.body.style.backgroundImage = `url('${bg}')`;
});

function openBackgroundCase() {
  hideAllMenusAndSections();
  document.getElementById('background-case-area').style.display = '';
  updateBackgroundCaseBalance();
  fillInitialBackgroundCaseItems();
  document.getElementById('background-case-result').innerText = '';
}
function updateBackgroundCaseBalance() {
  document.getElementById('background-case-balance').innerText = `Баланс: ${getTotalScore()} монет`;
}
const backgroundCasePrice = 50; // Changed from 100 to 50
const backgroundCaseNames = [
  'Black Wall', 'Black', 'Green cubes', 'Minecraft', 'Nature', 'Nitch', 'Telegram', 'Sea', 'Home'
];
function fillInitialBackgroundCaseItems() {
  const itemsContainer = document.getElementById('background-case-items');
  // Если массив пустой, используем дефолтные тестовые значения
  const fallbackNames = [
    'Black Wall', 'Black', 'Green cubes', 'Minecraft', 'Nature', 'Nitch', 'Telegram', 'Sea', 'Home'
  ];
  const names = (backgroundCaseNames && backgroundCaseNames.length) ? backgroundCaseNames : fallbackNames;
  const initialItems = [];
  for(let i = 0; i < 30; i++) {
    initialItems.push(Math.floor(Math.random() * names.length));
  }
  itemsContainer.innerHTML = '';
  initialItems.forEach(idx => {
    const name = names[idx];
    const imgPath = name + '.jpg';
    const div = document.createElement('div');
    div.className = 'item';
    // Попытка загрузить картинку, если не найдено — fallback с иконкой 🎁
    const img = new Image();
    img.src = imgPath;
    img.style.width = '80px';
    img.style.height = '60px';
    img.style.borderRadius = '8px';
    img.style.objectFit = 'cover';
    img.onload = function() {
      div.innerHTML = `<img src='${imgPath}' style='width:80px;height:60px;border-radius:8px;object-fit:cover;'><br>${name}`;
    };
    img.onerror = function() {
      div.innerHTML = `<div style='width:80px;height:60px;border-radius:8px;background:linear-gradient(135deg,#ff9800,#1e90ff);display:flex;align-items:center;justify-content:center;color:#fff;font-size:32px;'>🎁</div><br><span style='font-size:13px;'>${name}</span>`;
    };
    // Сначала показываем заглушку, потом заменяем если загрузится
    div.innerHTML = `<div style='width:80px;height:60px;border-radius:8px;background:#888;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;'>Загрузка...</div><br>${name}`;
    itemsContainer.appendChild(div);
  });
  itemsContainer.style.transition = 'none';
  itemsContainer.style.transform = `translateX(-${124 * 7}px)`;
}
function getRandomBackgroundCaseItem() {
  return Math.floor(Math.random() * backgroundCaseNames.length) + 1;
}

// === Видео-казино ===
function startKazinoVideo() {
  hideAllMenusAndSections();
  document.getElementById('kazino-video-area').style.display = '';



  const slotStrip = document.getElementById('kazino-video-slotStrip');
  const spinBtn = document.getElementById('kazino-video-spinBtn');
  const backBtn = document.getElementById('kazino-video-back');
  const resultDisplay = document.getElementById('result-display');
  const spinCost = 70;
  const itemWidth = 100;

  const VIDEO_ITEMS = [
    {src: 'bengalski.png', videoSrc: 'bengalski.mp4', name: 'bengalski', coins: 0},
    {src: 'egg.png', videoSrc: 'egg.mp4', name: 'egg', coins: 0}, 
    {src: 'candy.png', videoSrc: 'candy.mp4', name: 'candy', coins: 0},
    {src: 'cookie.png', videoSrc: 'cookie.mp4', name: 'cookie', coins: 0},
    {src: 'tamagochi.png', videoSrc: 'tamagochi.mp4', name: 'tamagochi', coins: 0},
    {src: 'eye.png', videoSrc: 'eye.mp4', name: 'eye', coins: 0}
  ];

  const baseItems = Array.from({length: 50}, () => 
    VIDEO_ITEMS[Math.floor(Math.random() * VIDEO_ITEMS.length)]
  );
  const repeatedItems = [...baseItems, ...baseItems, ...baseItems];

  function renderStrip(items) {
    slotStrip.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'slot-item';
      
      const img = document.createElement('img');
      img.src = item.src;
      img.style.width = '100px';
      img.style.height = '100px';
      img.style.borderRadius = '10px';
      img.style.objectFit = 'cover';
      div.appendChild(img);
      
      const textDiv = document.createElement('div');
      textDiv.className = 'slot-text';
      textDiv.textContent = item.name;
      div.appendChild(textDiv);
      slotStrip.appendChild(div);
    });
  }

  function updateScoreDisplay() {
    const el = document.getElementById('kazino-video-balanceDisplay');
    if (el) el.textContent = `Баланс: ${getTotalScore()} монет`;
  }

  renderStrip(repeatedItems);
  let currentIndex = baseItems.length;
  slotStrip.style.transform = `translateX(${-currentIndex * itemWidth + 150 - itemWidth/2}px)`;
  updateScoreDisplay();

  let spinning = false;

  spinBtn.onclick = function() {
    if (spinning) return;
    if (getTotalScore() < spinCost) {
      alert('Недостаточно монет!');
      return;
    }
    setScore(getTotalScore() - spinCost);
    spinning = true;
    spinBtn.disabled = true;

    const moveBy = Math.floor(20 + Math.random() * 10);
    let targetIndex = currentIndex + moveBy;
    const targetTranslateX = -targetIndex * itemWidth + 150 - itemWidth/2;

    slotStrip.style.transition = 'transform 3.5s cubic-bezier(0.33, 1, 0.68, 1)';
    slotStrip.style.transform = `translateX(${targetTranslateX}px)`;

    setTimeout(() => {
      currentIndex = targetIndex;
      if (currentIndex >= baseItems.length * 2) {
        currentIndex -= baseItems.length;
        slotStrip.style.transition = 'none';
        const resetTranslateX = -currentIndex * itemWidth + 150 - itemWidth/2;
        slotStrip.style.transform = `translateX(${resetTranslateX}px)`;
      }

      const landedItem = repeatedItems[currentIndex];
      if (landedItem) {
        addScore(landedItem.coins);
        addToyToInventory({
          name: landedItem.name,
          src: landedItem.videoSrc
        });
      }
      
      updateScoreDisplay();
      spinning = false;
      spinBtn.disabled = false;
    }, 3500);
  };

  backBtn.onclick = function() {
    document.getElementById('kazino-video-area').style.display = 'none';
    showMenu();
  };
}

function startKazikVip() {
  hideAllMenusAndSections();
  document.getElementById('kazik-vip-area').style.display = '';

  const slotStrip = document.getElementById('kazik-vip-slotStrip');
  const spinBtn = document.getElementById('kazik-vip-spinBtn');
  const backBtn = document.getElementById('kazik-vip-back');
  const resultDisplay = document.getElementById('kazik-vip-result');
  const spinCost = 150;
  const itemWidth = 100;

  const VIP_ITEMS = [
    {src: 'happy.png', videoSrc: 'happy.mp4', name: 'happy', coins: 0},
    {src: 'metla.png', videoSrc: 'metla.mp4', name: 'metла', coins: 0},
    {src: 'rabit.png', videoSrc: 'rabit.mp4', name: 'rabit', coins: 0},
    {src: 'tikva.png', videoSrc: 'tikva.mp4', name: 'tikva', coins: 0},
    {src: 'cake.png', videoSrc: 'cake.mp4', name: 'cake', coins: 0},
    {src: 'zvezda.png', videoSrc: 'zvezda.mp4', name: 'zvezда', coins: 0}
  ];

  const baseItems = Array.from({length: 50}, () => 
    VIP_ITEMS[Math.floor(Math.random() * VIP_ITEMS.length)]
  );
  const repeatedItems = [...baseItems, ...baseItems, ...baseItems];

  function updateBalance() {
    const el = document.getElementById('kazik-vip-balanceDisplay');
    if (el) el.textContent = `Баланс: ${getTotalScore()} монет`;
  }

  function renderStrip(items) {
    slotStrip.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'slot-item';
      
      const img = document.createElement('img');
      img.src = item.src;
      img.style.width = '100px';
      img.style.height = '100px';
      img.style.borderRadius = '10px';
      img.style.objectFit = 'cover';
      div.appendChild(img);
      
      const textDiv = document.createElement('div');
      textDiv.className = 'slot-text';
      textDiv.textContent = item.name;
      div.appendChild(textDiv);
      slotStrip.appendChild(div);
    });
  }

  renderStrip(repeatedItems);
  let currentIndex = baseItems.length;
  slotStrip.style.transform = `translateX(${-currentIndex * itemWidth + 150 - itemWidth/2}px)`;
  updateBalance();

  let spinning = false;

  spinBtn.onclick = function() {
    if (spinning) return;
    if (getTotalScore() < spinCost) {
      resultDisplay.textContent = 'Недостаточно монет для прокрутки!';
      return;
    }
    addScore(-spinCost);
    spinning = true;
    spinBtn.disabled = true;

    const moveBy = Math.floor(20 + Math.random() * 10);
    let targetIndex = currentIndex + moveBy;
    const targetTranslateX = -targetIndex * itemWidth + 150 - itemWidth/2;

    slotStrip.style.transition = 'transform 3.5s cubic-bezier(0.33, 1, 0.68, 1)';
    slotStrip.style.transform = `translateX(${targetTranslateX}px)`;

    setTimeout(() => {
      currentIndex = targetIndex;
      if (currentIndex >= baseItems.length * 2) {
        currentIndex -= baseItems.length;
        slotStrip.style.transition = 'none';
        const resetTranslateX = -currentIndex * itemWidth + 150 - itemWidth/2;
        slotStrip.style.transform = `translateX(${resetTranslateX}px)`;
      }
      const landedItem = repeatedItems[currentIndex];
      if (landedItem?.src) {
        addScore(landedItem.coins);
        const fileName = landedItem.src.replace('.mp4', '');
        // Removed result display text
        addToyToInventory({
          name: fileName,
          src: landedItem.src
        });
      } else {
        resultDisplay.textContent = 'Ошибка при определении приза.';
      }
      updateBalance();
      spinning = false;
      spinBtn.disabled = false;
    }, 3500);
  };

  backBtn.onclick = function() {
    document.getElementById('kazik-vip-area').style.display = 'none';
    showMenu();
  };
  updateBalance();
}

// --- Казино подарки(Премиум) ---
function startKazikPremium() {
  hideAllMenusAndSections();
  document.getElementById('kazik-premium-area').style.display = '';

  const slotStrip = document.getElementById('kazik-premium-slotStrip');
  const spinBtn = document.getElementById('kazik-premium-spinBtn');
  const backBtn = document.getElementById('kazik-premium-back');
  const resultDisplay = document.getElementById('kazik-premium-result');
  const spinCost = 250;
  const itemWidth = 100;

  // Changed to use static images in slot but keep video references
  const PREMIUM_ITEMS = [
    {src: 'duxi.png', videoSrc: 'duxi.mp4', name: 'duxi', coins: 0},
    {src: 'box.png', videoSrc: 'box.mp4', name: 'box', coins: 0},
    {src: 'posion.png', videoSrc: 'posion.mp4', name: 'posion', coins: 0}
  ];
  const PEPE_ITEM = {src: 'pepe.png', videoSrc: 'pepe.mp4', name: 'pepe', coins: 0};

  function getRandomPremiumItem() {
    if (Math.random() < 1/20) return PEPE_ITEM;
    return PREMIUM_ITEMS[Math.floor(Math.random() * PREMIUM_ITEMS.length)];
  }

  const baseItems = Array.from({length: 50}, getRandomPremiumItem);
  const repeatedItems = [...baseItems, ...baseItems, ...baseItems];

  function updateBalance() {
    const el = document.getElementById('kazik-premium-balanceDisplay');
    if (el) el.textContent = `Баланс: ${getTotalScore()} монет`;
  }

  function renderStrip(items) {
    slotStrip.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'slot-item';
      
      // Use static PNG image in roulette
      const img = document.createElement('img');
      img.src = item.src;
      img.style.width = '100px';
      img.style.height = '100px';
      img.style.borderRadius = '10px';
      img.style.objectFit = 'cover';
      div.appendChild(img);
      
      const textDiv = document.createElement('div');
      textDiv.className = 'slot-text';
      textDiv.textContent = item.name;
      div.appendChild(textDiv);
      slotStrip.appendChild(div);
    });
  }

  renderStrip(repeatedItems);
  let currentIndex = baseItems.length;
  slotStrip.style.transform = `translateX(${-currentIndex * itemWidth + 150 - itemWidth/2}px)`;
  updateBalance();

  let spinning = false;

  spinBtn.onclick = function() {
    if (spinning) return;
    if (getTotalScore() < spinCost) {
      alert('Недостаточно монет!');
      return;
    }
    addScore(-spinCost);
    spinning = true;
    spinBtn.disabled = true;

    const moveBy = Math.floor(20 + Math.random() * 10);
    let targetIndex = currentIndex + moveBy;
    const targetTranslateX = -targetIndex * itemWidth + 150 - itemWidth/2;

    slotStrip.style.transition = 'transform 3.5s cubic-bezier(0.33, 1, 0.68, 1)';
    slotStrip.style.transform = `translateX(${targetTranslateX}px)`;

    setTimeout(() => {
      currentIndex = targetIndex;
      if (currentIndex >= baseItems.length * 2) {
        currentIndex -= baseItems.length;
        slotStrip.style.transition = 'none';
        const resetTranslateX = -currentIndex * itemWidth + 150 - itemWidth/2;
        slotStrip.style.transform = `translateX(${resetTranslateX}px)`;
      }

      const landedItem = repeatedItems[currentIndex];
      if (landedItem) {
        addScore(landedItem.coins);
        addToyToInventory({
          name: landedItem.name,
          src: landedItem.videoSrc // Use MP4 for inventory
        });
      }
      
      updateBalance();
      spinning = false;
      spinBtn.disabled = false;
    }, 3500);
  };

  backBtn.onclick = function() {
    document.getElementById('kazik-premium-area').style.display = 'none';
    showMenu();
  };
  updateBalance();
}
