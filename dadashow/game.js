/**
 * ========================================================
 * DADASHOW GROUP - BRAIN TRAINER MEMORY GAME
 * Complete 20-Level Interactive Game Engine
 * ========================================================
 */

// --- Web Audio SFX Synthesizer (No external sound files required) ---
class SoundSynth {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playFlip() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(540, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playMatch() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.2, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  playHint() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.25, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.5);
    });
  }
}

const sfx = new SoundSynth();

// --- 20 LEVELS DATABASE ---
// Each level contains unique items, pair/single composition, and custom time limits.
const LEVELS_CONFIG = [
  {
    id: 1,
    name: "Başlanğıc Səviyyə",
    pairs: [
      { id: 'apple', name: 'Alma', emoji: '🍎' },
      { id: 'tree', name: 'Ağac', emoji: '🌲' },
      { id: 'bolt', name: 'Bolt', emoji: '🔩' },
      { id: 'car', name: 'Avtomobil', emoji: '🚗' },
    ],
    singles: [
      { id: 'clock', name: 'Saat', emoji: '⏰' },
      { id: 'book', name: 'Kitab', emoji: '📖' },
    ], // 4*2 + 2 = 10 cards
    timeLimit: 180, // 3 minutes
    cols: 5
  },
  {
    id: 2,
    name: "Meyvələr & Tərəvəzlər",
    pairs: [
      { id: 'banana', name: 'Banan', emoji: '🍌' },
      { id: 'cherry', name: 'Albalı', emoji: '🍒' },
      { id: 'grapes', name: 'Üzüm', emoji: '🍇' },
      { id: 'watermelon', name: 'Qarpız', emoji: '🍉' },
      { id: 'lemon', name: 'Limon', emoji: '🍋' },
      { id: 'carrot', name: 'Yerkökü', emoji: '🥕' },
    ],
    singles: [
      { id: 'lamp', name: 'Lampa', emoji: '💡' },
      { id: 'bicycle', name: 'Velosiped', emoji: '🚲' },
    ], // 6*2 + 2 = 14 cards
    timeLimit: 120, // 2 minutes
    cols: 5
  },
  {
    id: 3,
    name: "Nəqliyyat & Texnika",
    pairs: [
      { id: 'plane', name: 'Təyyarə', emoji: '✈️' },
      { id: 'train', name: 'Qatar', emoji: '🚆' },
      { id: 'ship', name: 'Gəmi', emoji: '🚢' },
      { id: 'motorcycle', name: 'Motosiklet', emoji: '🏍️' },
      { id: 'helicopter', name: 'Helikopter', emoji: '🚁' },
      { id: 'tractor', name: 'Traktor', emoji: '🚜' },
      { id: 'firetruck', name: 'Yanğın Maşını', emoji: '🚒' },
    ],
    singles: [
      { id: 'police', name: 'Polis Maşını', emoji: '🚓' },
      { id: 'rocket', name: 'Raket', emoji: '🚀' },
    ], // 7*2 + 2 = 16 cards
    timeLimit: 110,
    cols: 4
  },
  {
    id: 4,
    name: "Vəhşi Təbiət",
    pairs: [
      { id: 'lion', name: 'Şir', emoji: '🦁' },
      { id: 'tiger', name: 'Pələng', emoji: '🐯' },
      { id: 'elephant', name: 'Fil', emoji: '🐘' },
      { id: 'monkey', name: 'Meymun', emoji: '🐵' },
      { id: 'panda', name: 'Panda', emoji: '🐼' },
      { id: 'giraffe', name: 'Zürafə', emoji: '🦒' },
      { id: 'wolf', name: 'Canavar', emoji: '🐺' },
      { id: 'bear', name: 'Ayı', emoji: '🐻' },
    ],
    singles: [], // 8*2 = 16 cards
    timeLimit: 100,
    cols: 4
  },
  {
    id: 5,
    name: "Okean Dünyası",
    pairs: [
      { id: 'dolphin', name: 'Delfin', emoji: '🐬' },
      { id: 'fish', name: 'Balıq', emoji: '🐠' },
      { id: 'shark', name: 'Köpəkbalığı', emoji: '🦈' },
      { id: 'crab', name: 'Xərçəng', emoji: '🦀' },
      { id: 'octopus', name: 'Ahtapot', emoji: '🐙' },
      { id: 'whale', name: 'Balina', emoji: '🐳' },
      { id: 'turtle', name: 'Tısbağa', emoji: '🐢' },
      { id: 'penguin', name: 'Pinqvin', emoji: '🐧' },
    ],
    singles: [
      { id: 'jellyfish', name: 'Meduza', emoji: '🪼' },
      { id: 'seahorse', name: 'Dənizatı', emoji: '🌊' },
    ], // 8*2 + 2 = 18 cards
    timeLimit: 100,
    cols: 6
  },
  {
    id: 6,
    name: "Kosmos & Qalaktika",
    pairs: [
      { id: 'sun', name: 'Günəş', emoji: '☀️' },
      { id: 'moon', name: 'Ay', emoji: '🌙' },
      { id: 'star', name: 'Ulduz', emoji: '⭐' },
      { id: 'telescope', name: 'Teleskop', emoji: '🔭' },
      { id: 'astronaut', name: 'Astronavt', emoji: '👨‍🚀' },
      { id: 'comet', name: 'Kometa', emoji: '☄️' },
      { id: 'satellite', name: 'Peyk', emoji: '🛰️' },
      { id: 'galaxy', name: 'Qalaktika', emoji: '🌌' },
      { id: 'mars', name: 'Mars', emoji: '🪐' },
    ],
    singles: [], // 9*2 = 18 cards
    timeLimit: 95,
    cols: 6
  },
  {
    id: 7,
    name: "Mətbəx & Ləzzətlər",
    pairs: [
      { id: 'pizza', name: 'Pizza', emoji: '🍕' },
      { id: 'burger', name: 'Burger', emoji: '🍔' },
      { id: 'icecream', name: 'Dondurma', emoji: '🍦' },
      { id: 'donut', name: 'Ponçik', emoji: '🍩' },
      { id: 'coffee', name: 'Qəhvə', emoji: '☕' },
      { id: 'chocolate', name: 'Şokolad', emoji: '🍫' },
      { id: 'cheese', name: 'Pendir', emoji: '🧀' },
      { id: 'cake', name: 'Tort', emoji: '🎂' },
      { id: 'strawberry', name: 'Çiyələk', emoji: '🍓' },
    ],
    singles: [
      { id: 'croissant', name: 'Kruasan', emoji: '🥐' },
      { id: 'sushi', name: 'Suşi', emoji: '🍣' },
    ], // 9*2 + 2 = 20 cards
    timeLimit: 90,
    cols: 5
  },
  {
    id: 8,
    name: "İdman & Fəaliyyət",
    pairs: [
      { id: 'soccer', name: 'Futbol', emoji: '⚽' },
      { id: 'basketball', name: 'Basketbol', emoji: '🏀' },
      { id: 'tennis', name: 'Tennis', emoji: '🎾' },
      { id: 'boxing', name: 'Boks', emoji: '🥊' },
      { id: 'trophy', name: 'Kubok', emoji: '🏆' },
      { id: 'medal', name: 'Medal', emoji: '🥇' },
      { id: 'golf', name: 'Qolf', emoji: '⛳' },
      { id: 'ski', name: 'Xizək', emoji: '⛷️' },
      { id: 'dumbbell', name: 'Qantel', emoji: '🏋️' },
      { id: 'bowling', name: 'Boulinq', emoji: '🎳' },
    ],
    singles: [], // 10*2 = 20 cards
    timeLimit: 85,
    cols: 5
  },
  {
    id: 9,
    name: "Musiqi & Sənət",
    pairs: [
      { id: 'guitar', name: 'Gitara', emoji: '🎸' },
      { id: 'piano', name: 'Piano', emoji: '🎹' },
      { id: 'drums', name: 'Nağara', emoji: '🥁' },
      { id: 'violin', name: 'Skripka', emoji: '🎻' },
      { id: 'mic', name: 'Mikrofon', emoji: '🎤' },
      { id: 'headphones', name: 'Qulaqlıq', emoji: '🎧' },
      { id: 'saxophone', name: 'Saksofon', emoji: '🎷' },
      { id: 'note', name: 'Musiqi Notu', emoji: '🎵' },
      { id: 'palette', name: 'Rəng Palitrası', emoji: '🎨' },
      { id: 'theatre', name: 'Teatr', emoji: '🎭' },
    ],
    singles: [
      { id: 'trumpet', name: 'Truba', emoji: '🎺' },
      { id: 'cassette', name: 'Kaset', emoji: '📼' },
    ], // 10*2 + 2 = 22 cards
    timeLimit: 80,
    cols: 6
  },
  {
    id: 10,
    name: "Geyimlər & Aksesuarlar",
    pairs: [
      { id: 'crown', name: 'Tac', emoji: '👑' },
      { id: 'diamond', name: 'Almaz', emoji: '💎' },
      { id: 'ring', name: 'Üzük', emoji: '💍' },
      { id: 'sunglasses', name: 'Eynək', emoji: '🕶️' },
      { id: 'hat', name: 'Papaq', emoji: '🎩' },
      { id: 'backpack', name: 'Çanta', emoji: '🎒' },
      { id: 'sneaker', name: 'Krossovka', emoji: '👟' },
      { id: 'watch', name: 'Qol Saati', emoji: '⌚' },
      { id: 'tie', name: 'Qalstuk', emoji: '👔' },
      { id: 'umbrella', name: 'Çətir', emoji: '☂️' },
      { id: 'gloves', name: 'Əlcək', emoji: '🧤' },
    ],
    singles: [], // 11*2 = 22 cards
    timeLimit: 80,
    cols: 6
  },
  {
    id: 11,
    name: "Təbiət & Hava Hadisələri",
    pairs: [
      { id: 'lightning', name: 'Şimşək', emoji: '⚡' },
      { id: 'tornado', name: 'Qasırğa', emoji: '🌪️' },
      { id: 'rainbow', name: 'Göyqurşağı', emoji: '🌈' },
      { id: 'fire', name: 'Od', emoji: '🔥' },
      { id: 'volcano', name: 'Vulkan', emoji: '🌋' },
      { id: 'water', name: 'Su Damlası', emoji: '💧' },
      { id: 'mountain', name: 'Dağ', emoji: '🏔️' },
      { id: 'snowflake', name: 'Qar Dənəsi', emoji: '❄️' },
      { id: 'cactus', name: 'Kaktus', emoji: '🌵' },
      { id: 'flower', name: 'Çiçək', emoji: '🌸' },
      { id: 'leaf', name: 'Yarpaq', emoji: '🍃' },
    ],
    singles: [
      { id: 'cloud', name: 'Bulud', emoji: '☁️' },
      { id: 'wind', name: 'Külək', emoji: '💨' },
    ], // 11*2 + 2 = 24 cards
    timeLimit: 75,
    cols: 6
  },
  {
    id: 12,
    name: "Ofis & Texnologiya",
    pairs: [
      { id: 'computer', name: 'Kompüter', emoji: '💻' },
      { id: 'monitor', name: 'Monitor', emoji: '🖥️' },
      { id: 'printer', name: 'Printer', emoji: '🖨️' },
      { id: 'phone', name: 'Smartfon', emoji: '📱' },
      { id: 'pen', name: 'Qələm', emoji: '✏️' },
      { id: 'ruler', name: 'Xətkeş', emoji: '📏' },
      { id: 'scissors', name: 'Qayçı', emoji: '✂️' },
      { id: 'folder', name: 'Qovluq', emoji: '📁' },
      { id: 'bell', name: 'Zəng', emoji: '🔔' },
      { id: 'calendar', name: 'Təqvim', emoji: '📅' },
      { id: 'microscope', name: 'Mikroskop', emoji: '🔬' },
      { id: 'chair', name: 'Kreslo', emoji: '🪑' },
    ],
    singles: [], // 12*2 = 24 cards
    timeLimit: 75,
    cols: 6
  },
  {
    id: 13,
    name: "Şəhər & Memarlıq",
    pairs: [
      { id: 'skyscraper', name: 'Göydələn', emoji: '🏢' },
      { id: 'castle', name: 'Qəsr', emoji: '🏰' },
      { id: 'tower', name: 'Qüllə', emoji: '🗼' },
      { id: 'bridge', name: 'Körpü', emoji: '🌉' },
      { id: 'house', name: 'Ev', emoji: '🏠' },
      { id: 'stadium', name: 'Stadion', emoji: '🏟️' },
      { id: 'factory', name: 'Zavod', emoji: '🏭' },
      { id: 'tent', name: 'Çadır', emoji: '⛺' },
      { id: 'fountain', name: 'Fontan', emoji: '⛲' },
      { id: 'pyramid', name: 'Piramida', emoji: '🏜️' },
      { id: 'windmill', name: 'Dəyirman', emoji: '🪵' },
      { id: 'bank', name: 'Bank', emoji: '🏦' },
    ],
    singles: [
      { id: 'church', name: 'Məbəd', emoji: '🏛️' },
      { id: 'hospital', name: 'Xəstəxana', emoji: '🏥' },
    ], // 12*2 + 2 = 26 cards
    timeLimit: 70,
    cols: 6
  },
  {
    id: 14,
    name: "Qədim Dünya & Döyüş",
    pairs: [
      { id: 'trex', name: 'T-Rex', emoji: '🦖' },
      { id: 'dragon', name: 'Əjdaha', emoji: '🐉' },
      { id: 'fossil', name: 'Fosil', emoji: '🦴' },
      { id: 'sword', name: 'Qılınc', emoji: '⚔️' },
      { id: 'shield', name: 'Qalxan', emoji: '🛡️' },
      { id: 'bow', name: 'Ox-Yay', emoji: '🏹' },
      { id: 'helmet', name: 'Dəbilqə', emoji: '🪖' },
      { id: 'dagger', name: 'Xəncər', emoji: '🗡️' },
      { id: 'torch', name: 'Məşəl', emoji: '🪵' },
      { id: 'chest', name: 'Sandıq', emoji: '🧰' },
      { id: 'compass', name: 'Kompas', emoji: '🧭' },
      { id: 'map', name: 'Xəritə', emoji: '🗺️' },
      { id: 'scroll', name: 'Perqament', emoji: '📜' },
    ],
    singles: [], // 13*2 = 26 cards
    timeLimit: 70,
    cols: 6
  },
  {
    id: 15,
    name: "Sehr & Fantaziya",
    pairs: [
      { id: 'wand', name: 'Sehrli Əsa', emoji: '🪄' },
      { id: 'crystal', name: 'Büllur Kürə', emoji: '🔮' },
      { id: 'potion', name: 'İksir', emoji: '🧪' },
      { id: 'wizard', name: 'Sehrbaz Papağı', emoji: '🧙' },
      { id: 'unicorn', name: 'Təkbuynuz', emoji: '🦄' },
      { id: 'sparkles', name: 'Parıltı', emoji: '✨' },
      { id: 'ghost', name: 'Kabus', emoji: '👻' },
      { id: 'key', name: 'Qədim Açar', emoji: '🗝️' },
      { id: 'lock', name: 'Qıfıl', emoji: '🔒' },
      { id: 'hourglass', name: 'Qum Saatı', emoji: '⏳' },
      { id: 'mushroom', name: 'Sehrli Göbələk', emoji: '🍄' },
      { id: 'fox', name: 'Sehrli Tülkü', emoji: '🦊' },
      { id: 'snake', name: 'İlan', emoji: '🐍' },
    ],
    singles: [
      { id: 'spellbook', name: 'Qara Kitab', emoji: '📕' },
      { id: 'mirror', name: 'Güzgü', emoji: '🪞' },
    ], // 13*2 + 2 = 28 cards
    timeLimit: 65,
    cols: 7
  },
  {
    id: 16,
    name: "Gaming & Cyberpunk",
    pairs: [
      { id: 'gamepad', name: 'Gamepad', emoji: '🎮' },
      { id: 'joystick', name: 'Joystick', emoji: '🕹️' },
      { id: 'vr', name: 'VR Eynək', emoji: '🥽' },
      { id: 'cyborg', name: 'Kiborq Robot', emoji: '🤖' },
      { id: 'disk', name: 'Flopi Disk', emoji: '💾' },
      { id: 'pager', name: 'Peycer', emoji: '📟' },
      { id: 'server', name: 'Server', emoji: '🗄️' },
      { id: 'web', name: 'Şəbəkə', emoji: '🌐' },
      { id: 'mechhand', name: 'Robot Əl', emoji: '🦾' },
      { id: 'laser', name: 'Lazer Silahı', emoji: '🔫' },
      { id: 'battery', name: 'Batareya', emoji: '🔋' },
      { id: 'dice', name: 'Oyun Zəri', emoji: '🎲' },
      { id: 'cpu', name: 'Mikroprosessor', emoji: '🎛️' },
      { id: 'slot', name: 'Kazino Slot', emoji: '🎰' },
    ],
    singles: [], // 14*2 = 28 cards
    timeLimit: 65,
    cols: 7
  },
  {
    id: 17,
    name: "Səyahət & Dünya",
    pairs: [
      { id: 'eiffel', name: 'Eyfel Qülləsi', emoji: '🗼' },
      { id: 'statue', name: 'Azadlıq Heykəli', emoji: '🗽' },
      { id: 'taj', name: 'Tac Mahal', emoji: '🕌' },
      { id: 'colosseum', name: 'Kolizey', emoji: '🏛️' },
      { id: 'fuji', name: 'Fuji Dağı', emoji: '🗻' },
      { id: 'luggage', name: 'Çamadan', emoji: '🧳' },
      { id: 'passport', name: 'Pasport', emoji: '🛂' },
      { id: 'parachute', name: 'Paraşüt', emoji: '🪂' },
      { id: 'hotair', name: 'Hava Şarı', emoji: '🎈' },
      { id: 'buoy', name: 'Xilasedici', emoji: '🛟' },
      { id: 'binoculars', name: 'Durbin', emoji: '🔭' },
      { id: 'gift', name: 'Hədiyyə', emoji: '🎁' },
      { id: 'ticket', name: 'Bilet', emoji: '🎫' },
      { id: 'flag', name: 'Zəfər Bayrağı', emoji: '🚩' },
    ],
    singles: [
      { id: 'camera', name: 'Fotoaparat', emoji: '📷' },
      { id: 'postbox', name: 'Məktub Qutusu', emoji: '📮' },
    ], // 14*2 + 2 = 30 cards
    timeLimit: 60,
    cols: 6
  },
  {
    id: 18,
    name: "Elm & Laboratoriya",
    pairs: [
      { id: 'dna', name: 'DNT Kodu', emoji: '🧬' },
      { id: 'atom', name: 'Atom Modeli', emoji: '⚛️' },
      { id: 'flask', name: 'Kolba', emoji: '🧪' },
      { id: 'pills', name: 'Dərman', emoji: '💊' },
      { id: 'syringe', name: 'Şpris', emoji: '💉' },
      { id: 'xray', name: 'Rentgen', emoji: '🩻' },
      { id: 'thermometer', name: 'Termometr', emoji: '🌡️' },
      { id: 'magnet', name: 'Maqnit', emoji: '🧲' },
      { id: 'stethoscope', name: 'Stetoskop', emoji: '🩺' },
      { id: 'scale', name: 'Tərəzi', emoji: '⚖️' },
      { id: 'gear', name: 'Ötürücü Çarx', emoji: '⚙️' },
      { id: 'magnifier', name: 'Böyüdücü Şüşə', emoji: '🔎' },
      { id: 'biohazard', name: 'Biotəhlükə', emoji: '☣️' },
      { id: 'radioactive', name: 'Radiasiya', emoji: '☢️' },
      { id: 'circuit', name: 'Mikrosxem', emoji: '🔌' },
    ],
    singles: [], // 15*2 = 30 cards
    timeLimit: 60,
    cols: 6
  },
  {
    id: 19,
    name: "Fauna & Flora (Hardcore)",
    pairs: [
      { id: 'eagle', name: 'Qartal', emoji: '🦅' },
      { id: 'parrot', name: 'Tutuquşu', emoji: '🦜' },
      { id: 'owl', name: 'Bayquş', emoji: '🦉' },
      { id: 'blueberry', name: 'Moruq', emoji: '🫐' },
      { id: 'pineapple', name: 'Ananas', emoji: '🍍' },
      { id: 'kiwi', name: 'Kivi', emoji: '🥝' },
      { id: 'gorilla', name: 'Qorilla', emoji: '🦍' },
      { id: 'leopard', name: 'Bəbir', emoji: '🐆' },
      { id: 'rhino', name: 'Kərgədan', emoji: '🦏' },
      { id: 'hippo', name: 'Begemot', emoji: '🦛' },
      { id: 'deer', name: 'Maral', emoji: '🦌' },
      { id: 'bat', name: 'Yarasa', emoji: '🦇' },
      { id: 'bee', name: 'Arı', emoji: '🐝' },
      { id: 'butterfly', name: 'Kəpənək', emoji: '🦋' },
      { id: 'scorpion', name: 'Əqrəb', emoji: '🦂' },
    ],
    singles: [
      { id: 'flamingo', name: 'Flaminqo', emoji: '🦩' },
      { id: 'hedgehog', name: 'Kirpi', emoji: '🦔' },
    ], // 15*2 + 2 = 32 cards
    timeLimit: 55,
    cols: 8
  },
  {
    id: 20,
    name: "DADASHOW Çempionu (Final Boss)",
    pairs: [
      { id: 'goldensword', name: 'Qızıl Qılınc', emoji: '⚔️' },
      { id: 'emerald_crown', name: 'Zümrüd Tac', emoji: '👑' },
      { id: 'dg_shield', name: 'DG Qalxan', emoji: '🛡️' },
      { id: 'neon_pad', name: 'Neon Gamepad', emoji: '🎮' },
      { id: 'cyborg_lion', name: 'Kiborq Şir', emoji: '🦁' },
      { id: 'ufo', name: 'Kosmik Gəmi', emoji: '🛸' },
      { id: 'champion_cup', name: 'Çempion Kuboku', emoji: '🏆' },
      { id: 'phoenix', name: 'Feniks Quşu', emoji: '🦅' },
      { id: 'titan_bolt', name: 'Titan Bolt', emoji: '🔩' },
      { id: 'saturn', name: 'Saturn Planeti', emoji: '🪐' },
      { id: 'laser_bolt', name: 'Kvant Lazeri', emoji: '⚡' },
      { id: 'gold_bar', name: 'Qızıl Külçə', emoji: '🧈' },
      { id: 'dg_star', name: 'DADASHOW Ulduzu', emoji: '🌟' },
      { id: 'cosmic_crystal', name: 'Kosmik Kristal', emoji: '💎' },
      { id: 'cyber_car', name: 'Kiber Maşın', emoji: '🏎️' },
      { id: 'atomic_core', name: 'Nüvə Reaktoru', emoji: '☢️' },
    ],
    singles: [], // 16*2 = 32 cards
    timeLimit: 50,
    cols: 8
  }
];

// --- GAME STATE ---
class GameEngine {
  constructor() {
    this.currentLevelIndex = 0;
    this.unlockedLevel = parseInt(localStorage.getItem('dadashow_unlocked_level') || '1', 10);
    this.points = parseInt(localStorage.getItem('dadashow_points') || '100', 10); // Start with 100 bonus points!
    
    this.cards = [];
    this.selectedCards = [];
    this.matchedCards = new Set();
    this.isBoardLocked = false;
    this.isMemorizationPhase = false;

    this.lives = 3;
    this.maxLives = 3;
    this.totalClicksInLevel = 0;
    this.mistakesInLevel = 0;

    this.memoTimerVal = 10;
    this.memoInterval = null;

    this.gameTimerVal = 180;
    this.gameInterval = null;

    this.audioPlaying = false;
    this.audioElement = document.getElementById('bgMusic');

    // DOM Elements
    this.dom = {
      levelNum: document.getElementById('currentLevelNumber'),
      points: document.getElementById('playerPoints'),
      timer: document.getElementById('gameTimer'),
      timerBadge: document.getElementById('timerBadge'),
      livesContainer: document.getElementById('livesContainer'),
      targetText: document.getElementById('targetPromptText'),
      matchedCount: document.getElementById('matchedCount'),
      totalPairsCount: document.getElementById('totalPairsCount'),
      cardsGrid: document.getElementById('cardsGrid'),
      memoBanner: document.getElementById('memoBanner'),
      memoTimer: document.getElementById('memoTimer'),
      memoProgress: document.getElementById('memoProgressFill'),
      btnSkipMemo: document.getElementById('btnSkipMemo'),
      btnRestart: document.getElementById('btnRestartLevel'),
      btnLevelList: document.getElementById('btnLevelList'),
      modalWin: document.getElementById('modalWin'),
      modalGameOver: document.getElementById('modalGameOver'),
      modalLevelSelect: document.getElementById('modalLevelSelect'),
      levelsGridContainer: document.getElementById('levelsGridContainer'),
      btnCloseLevels: document.getElementById('btnCloseLevels'),
      btnNextLevel: document.getElementById('btnNextLevel'),
      btnReplayLevel: document.getElementById('btnReplayLevel'),
      btnTryAgain: document.getElementById('btnTryAgain'),
      toast: document.getElementById('toastNotification'),
      // Hints
      btnHintSingle: document.getElementById('btnHintSingle'),
      btnHintPeekAll: document.getElementById('btnHintPeekAll'),
      btnHintTime: document.getElementById('btnHintTime'),
      // Audio
      btnToggleMusic: document.getElementById('btnToggleMusic'),
      musicIcon: document.getElementById('musicIcon'),
      volumeSlider: document.getElementById('volumeSlider')
    };

    this.initEvents();
    this.updateHUD();
    this.loadLevel(this.currentLevelIndex);
  }

  initEvents() {
    // Audio toggles
    this.audioElement.volume = parseFloat(this.dom.volumeSlider.value);
    
    this.dom.btnToggleMusic.addEventListener('click', () => {
      sfx.init();
      if (this.audioPlaying) {
        this.audioElement.pause();
        this.audioPlaying = false;
        this.dom.musicIcon.textContent = '🔇';
      } else {
        this.audioElement.play().then(() => {
          this.audioPlaying = true;
          this.dom.musicIcon.textContent = '🎵';
        }).catch(() => {
          this.showToast("Musiqini oxutmaq üçün səhifəyə toxunun!");
        });
      }
    });

    this.dom.volumeSlider.addEventListener('input', (e) => {
      this.audioElement.volume = parseFloat(e.target.value);
      if (this.audioElement.volume === 0) {
        this.dom.musicIcon.textContent = '🔇';
      } else if (!this.audioPlaying) {
        this.dom.musicIcon.textContent = '🎵';
      }
    });

    // Page-wide click to initiate audio context & start audio on first interaction
    window.addEventListener('click', () => {
      sfx.init();
      if (!this.audioPlaying && this.audioElement.paused) {
        this.audioElement.play().then(() => {
          this.audioPlaying = true;
          this.dom.musicIcon.textContent = '🎵';
        }).catch(() => {});
      }
    }, { once: true });

    // Skip Memo Button
    this.dom.btnSkipMemo.addEventListener('click', () => {
      if (this.isMemorizationPhase) {
        this.endMemorization();
      }
    });

    // Restart Level Button
    this.dom.btnRestart.addEventListener('click', () => {
      this.loadLevel(this.currentLevelIndex);
      this.showToast("Kartlar yenidən qarışdırıldı!");
    });

    // Level Picker Dialog
    this.dom.btnLevelList.addEventListener('click', () => {
      this.renderLevelSelectModal();
      this.dom.modalLevelSelect.classList.add('active');
    });

    this.dom.btnCloseLevels.addEventListener('click', () => {
      this.dom.modalLevelSelect.classList.remove('active');
    });

    // Modals action buttons
    this.dom.btnNextLevel.addEventListener('click', () => {
      this.dom.modalWin.classList.remove('active');
      if (this.currentLevelIndex + 1 < LEVELS_CONFIG.length) {
        this.currentLevelIndex++;
        this.loadLevel(this.currentLevelIndex);
      } else {
        this.showToast("Təbriklər! Bütün 20 səviyyəni qazandınız! 🏆");
        this.loadLevel(0);
      }
    });

    this.dom.btnReplayLevel.addEventListener('click', () => {
      this.dom.modalWin.classList.remove('active');
      this.loadLevel(this.currentLevelIndex);
    });

    this.dom.btnTryAgain.addEventListener('click', () => {
      this.dom.modalGameOver.classList.remove('active');
      this.loadLevel(this.currentLevelIndex);
    });

    // Hints / Power-ups
    this.dom.btnHintSingle.addEventListener('click', () => this.useHintSingle());
    this.dom.btnHintPeekAll.addEventListener('click', () => this.useHintPeekAll());
    this.dom.btnHintTime.addEventListener('click', () => this.useHintTime());
  }

  // --- LEVEL INITIALIZATION & SPONTANEOUS SHUFFLE ---
  loadLevel(levelIndex) {
    this.currentLevelIndex = levelIndex;
    const config = LEVELS_CONFIG[levelIndex];

    // Clear timers
    clearInterval(this.memoInterval);
    clearInterval(this.gameInterval);

    // Reset state
    this.selectedCards = [];
    this.matchedCards.clear();
    this.lives = this.maxLives;
    this.isBoardLocked = true;
    this.isMemorizationPhase = true;
    this.totalClicksInLevel = 0;
    this.mistakesInLevel = 0;
    this.dom.timerBadge.classList.remove('warning');

    // Build Cards Deck: pairs (2 of each) and singles (1 of each)
    let deck = [];
    let uniqueTargets = 0;

    config.pairs.forEach(item => {
      uniqueTargets++;
      deck.push({ ...item, isSingle: false, uid: `${item.id}_a` });
      deck.push({ ...item, isSingle: false, uid: `${item.id}_b` });
    });

    config.singles.forEach(item => {
      uniqueTargets++;
      deck.push({ ...item, isSingle: true, uid: `${item.id}_single` });
    });

    // Spontaneous Random Shuffle (Fisher-Yates)
    this.cards = this.shuffleArray(deck);

    // Update HUD Stats
    this.dom.levelNum.textContent = config.id;
    this.dom.matchedCount.textContent = '0';
    this.dom.totalPairsCount.textContent = uniqueTargets;
    this.dom.targetText.textContent = `Yadda saxlayın: ${config.pairs.length} cüt, ${config.singles.length} tək kart var!`;
    this.renderLives();
    this.updateHUD();

    // Render Cards in Grid
    this.renderBoard(config.cols);

    // Start 10s Memorization Phase
    this.startMemorization();
  }

  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  renderBoard(cols) {
    this.dom.cardsGrid.innerHTML = '';
    
    // Set responsive grid column classes
    this.dom.cardsGrid.className = 'cards-grid';
    if (cols) {
      this.dom.cardsGrid.classList.add(`cols-${cols}`);
    } else {
      this.dom.cardsGrid.classList.add('cols-5');
    }

    this.cards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card-item flipped'; // Face-up initially during memorization
      cardEl.dataset.index = index;
      cardEl.dataset.id = card.id;

      cardEl.innerHTML = `
        <!-- Card Front Face (Picture) -->
        <div class="card-face card-front">
          <span class="card-emoji">${card.emoji}</span>
          <span class="card-name">${card.name}</span>
          <span class="card-tag">${card.isSingle ? '⚡ TƏK KART' : '✨ CÜT KART'}</span>
        </div>

        <!-- Card Back Face (DADASHOW GROUP Branded) -->
        <div class="card-face card-back">
          <div class="card-back-icon">🎮</div>
          <div class="card-back-title">DADASHOW</div>
          <div class="card-back-sub">GROUP</div>
          <div class="card-back-community">GAMING COMMUNITY</div>
        </div>
      `;

      cardEl.addEventListener('click', () => this.handleCardClick(index, cardEl));
      this.dom.cardsGrid.appendChild(cardEl);
    });
  }

  // --- MEMORIZATION PHASE (10 SECONDS) ---
  startMemorization() {
    this.isMemorizationPhase = true;
    this.isBoardLocked = true;
    this.memoTimerVal = 10;
    this.dom.memoTimer.textContent = this.memoTimerVal;
    this.dom.memoBanner.classList.remove('hidden');
    this.dom.memoProgress.style.width = '100%';

    const startTime = Date.now();
    const totalDuration = 10000; // 10s

    this.memoInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, totalDuration - elapsed);
      const remainingSec = Math.ceil(remaining / 1000);

      this.dom.memoTimer.textContent = remainingSec;
      this.dom.memoProgress.style.width = `${(remaining / totalDuration) * 100}%`;

      if (remainingSec !== this.memoTimerVal) {
        this.memoTimerVal = remainingSec;
        sfx.playFlip();
      }

      if (remaining <= 0) {
        clearInterval(this.memoInterval);
        this.endMemorization();
      }
    }, 100);
  }

  endMemorization() {
    clearInterval(this.memoInterval);
    this.isMemorizationPhase = false;
    this.dom.memoBanner.classList.add('hidden');

    // Flip all cards face down with smooth stagger
    const cardElements = this.dom.cardsGrid.querySelectorAll('.card-item');
    cardElements.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.remove('flipped');
        if (idx === cardElements.length - 1) {
          this.isBoardLocked = false;
          this.startGameCountdown();
        }
      }, idx * 25);
    });

    this.updateTargetPrompt();
    this.showToast("Kartlar bağlandı! Yaddaşınızdakıları tapın!");
  }

  // --- SOLVING PHASE & GAMEPLAY TIMER ---
  startGameCountdown() {
    const config = LEVELS_CONFIG[this.currentLevelIndex];
    this.gameTimerVal = config.timeLimit;
    this.renderGameTimer();

    this.gameInterval = setInterval(() => {
      this.gameTimerVal--;
      this.renderGameTimer();

      if (this.gameTimerVal <= 15) {
        this.dom.timerBadge.classList.add('warning');
      }

      if (this.gameTimerVal <= 0) {
        clearInterval(this.gameInterval);
        this.triggerGameOver("Vaxtınız başa çatdı!");
      }
    }, 1000);
  }

  renderGameTimer() {
    const mins = Math.floor(this.gameTimerVal / 60);
    const secs = this.gameTimerVal % 60;
    this.dom.timer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // --- CARD SELECTION & STRICT MATCHING LOGIC ---
  handleCardClick(index, cardEl) {
    if (this.isBoardLocked || this.isMemorizationPhase) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    sfx.playFlip();
    cardEl.classList.add('flipped');
    this.totalClicksInLevel++;

    const cardData = this.cards[index];

    // Single Card Rule: if it is a single card, finding it gives immediate completion!
    if (cardData.isSingle) {
      if (this.selectedCards.length === 1) {
        // Player had picked a pair card first, but clicked this single card -> MISMATCH!
        this.handleMismatch(this.selectedCards[0], { index, element: cardEl, data: cardData });
        return;
      }

      // Standalone single card discovered
      cardEl.classList.add('matched');
      cardEl.querySelector('.card-front').classList.add('is-matched');
      this.matchedCards.add(cardData.id);
      this.addPoints(40);
      sfx.playMatch();
      this.showToast(`⚡ Tək kart tapıldı: ${cardData.emoji} ${cardData.name}! +40 XP`);
      this.checkLevelComplete();
      this.updateTargetPrompt();
      return;
    }

    // Pair Card Logic
    if (this.selectedCards.length === 0) {
      // First card of pair chosen
      this.selectedCards.push({ index, element: cardEl, data: cardData });
      this.dom.targetText.innerHTML = `Açıldı: <b>${cardData.emoji} ${cardData.name}</b>. İndi digər <b>${cardData.name}</b> kartını tapın! (Səhv etmək olmaz)`;
    } else if (this.selectedCards.length === 1) {
      // Second card chosen
      const first = this.selectedCards[0];
      const second = { index, element: cardEl, data: cardData };

      if (first.index === second.index) return; // Prevent double click on same card

      if (first.data.id === second.data.id) {
        // EXACT MATCH!
        this.handleMatch(first, second);
      } else {
        // WRONG GUESS - STRIKE / PENALTY!
        this.handleMismatch(first, second);
      }
    }
  }

  handleMatch(first, second) {
    this.isBoardLocked = true;
    sfx.playMatch();

    setTimeout(() => {
      first.element.classList.add('matched');
      second.element.classList.add('matched');
      first.element.querySelector('.card-front').classList.add('is-matched');
      second.element.querySelector('.card-front').classList.add('is-matched');

      this.matchedCards.add(first.data.id);
      this.selectedCards = [];
      this.isBoardLocked = false;

      // Award points & check victory
      this.addPoints(80);
      this.showToast(`🎉 Əla! ${first.data.emoji} ${first.data.name} cütü tapıldı! +80 XP`);
      this.checkLevelComplete();
      this.updateTargetPrompt();
    }, 400);
  }

  handleMismatch(first, second) {
    this.isBoardLocked = true;
    this.mistakesInLevel++;
    sfx.playWrong();

    // Deduct a life
    this.lives--;
    this.renderLives();

    first.element.classList.add('wrong-shake');
    second.element.classList.add('wrong-shake');

    setTimeout(() => {
      first.element.classList.remove('wrong-shake', 'flipped');
      second.element.classList.remove('wrong-shake', 'flipped');
      this.selectedCards = [];
      this.isBoardLocked = false;

      if (this.lives <= 0) {
        this.triggerGameOver("Bütün canlarınız tükəndi! Çox səhv etdiniz.");
      } else {
        this.dom.targetText.textContent = `❌ Səhv təxmin! 1 can itirdiniz (${this.lives} can qaldı). Birinci kartı seçin.`;
      }
    }, 900);
  }

  updateTargetPrompt() {
    const config = LEVELS_CONFIG[this.currentLevelIndex];
    const totalTargets = config.pairs.length + config.singles.length;
    const remaining = totalTargets - this.matchedCards.size;

    this.dom.matchedCount.textContent = this.matchedCards.size;

    if (remaining > 0) {
      if (this.selectedCards.length === 0) {
        this.dom.targetText.textContent = `Hansı kartın harda olduğunu xatırla! Kartı aç və cütünü tap. (Qalan: ${remaining})`;
      }
    }
  }

  renderLives() {
    const hearts = this.dom.livesContainer.querySelectorAll('.heart');
    hearts.forEach((h, i) => {
      if (i < this.lives) {
        h.classList.remove('lost');
      } else {
        h.classList.add('lost');
      }
    });
  }

  // --- VICTORY & GAME OVER ---
  checkLevelComplete() {
    const config = LEVELS_CONFIG[this.currentLevelIndex];
    const totalTargets = config.pairs.length + config.singles.length;

    if (this.matchedCards.size >= totalTargets) {
      // LEVEL WON!
      clearInterval(this.gameInterval);
      sfx.playWin();

      // Calculate rewards
      const timeBonus = this.gameTimerVal * 2;
      const livesBonus = this.lives * 50;
      const baseLevelReward = 200 + this.currentLevelIndex * 25;
      const totalLevelXP = baseLevelReward + timeBonus + livesBonus;

      this.addPoints(totalLevelXP);

      // Unlock next level
      if (this.currentLevelIndex + 1 > this.unlockedLevel && this.currentLevelIndex + 1 <= 20) {
        this.unlockedLevel = this.currentLevelIndex + 2;
        localStorage.setItem('dadashow_unlocked_level', this.unlockedLevel);
      }

      // Show Win Modal
      document.getElementById('winScoreEarned').textContent = `+${totalLevelXP}`;
      const mins = Math.floor(this.gameTimerVal / 60);
      const secs = this.gameTimerVal % 60;
      document.getElementById('winTimeLeft').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      
      const accuracy = Math.max(20, Math.round(((totalTargets * 2) / Math.max(this.totalClicksInLevel, totalTargets * 2)) * 100));
      document.getElementById('winAccuracy').textContent = `${accuracy}%`;

      setTimeout(() => {
        this.dom.modalWin.classList.add('active');
      }, 600);
    }
  }

  triggerGameOver(reason) {
    clearInterval(this.gameInterval);
    sfx.playWrong();
    document.getElementById('gameOverReason').textContent = reason;
    this.dom.modalGameOver.classList.add('active');
  }

  // --- POWER-UPS & POINTS STORE (XP HINTS) ---
  addPoints(amount) {
    this.points += amount;
    localStorage.setItem('dadashow_points', this.points);
    this.updateHUD();
  }

  deductPoints(amount) {
    if (this.points < amount) return false;
    this.points -= amount;
    localStorage.setItem('dadashow_points', this.points);
    this.updateHUD();
    return true;
  }

  updateHUD() {
    this.dom.points.textContent = this.points;

    // Update Hint button enabled states
    this.dom.btnHintSingle.disabled = this.points < 60 || this.isBoardLocked || this.isMemorizationPhase;
    this.dom.btnHintPeekAll.disabled = this.points < 150 || this.isBoardLocked || this.isMemorizationPhase;
    this.dom.btnHintTime.disabled = this.points < 80 || this.isMemorizationPhase;
  }

  useHintSingle() {
    if (!this.deductPoints(60)) {
      this.showToast("Kifayət qədər XP yoxdur! (60 XP lazımdır)");
      return;
    }

    sfx.playHint();

    // Find an unmatched card
    const unmatchedIndices = [];
    this.cards.forEach((c, idx) => {
      if (!this.matchedCards.has(c.id)) {
        unmatchedIndices.push(idx);
      }
    });

    if (unmatchedIndices.length === 0) return;

    // Target the currently selected card's partner if one is selected
    let targetIdx = null;
    if (this.selectedCards.length === 1) {
      const selectedId = this.selectedCards[0].data.id;
      const partnerIdx = this.cards.findIndex((c, i) => c.id === selectedId && i !== this.selectedCards[0].index);
      if (partnerIdx !== -1) targetIdx = partnerIdx;
    }

    if (targetIdx === null) {
      targetIdx = unmatchedIndices[Math.floor(Math.random() * unmatchedIndices.length)];
    }

    const cardEl = this.dom.cardsGrid.children[targetIdx];
    const frontEl = cardEl.querySelector('.card-front');

    cardEl.classList.add('flipped');
    frontEl.classList.add('is-hinted');
    this.showToast(`🔍 İpucu: ${this.cards[targetIdx].emoji} ${this.cards[targetIdx].name} aşkarlandı!`);

    setTimeout(() => {
      if (!cardEl.classList.contains('matched') && !this.selectedCards.some(s => s.index === targetIdx)) {
        cardEl.classList.remove('flipped');
      }
      frontEl.classList.remove('is-hinted');
    }, 2500);
  }

  useHintPeekAll() {
    if (!this.deductPoints(150)) {
      this.showToast("Kifayət qədər XP yoxdur! (150 XP lazımdır)");
      return;
    }

    sfx.playHint();
    this.isBoardLocked = true;
    this.showToast("👁️ Bütün kartlar 2 saniyəlik açıldı!");

    const unrevealed = [];
    Array.from(this.dom.cardsGrid.children).forEach((el, idx) => {
      if (!el.classList.contains('flipped') && !el.classList.contains('matched')) {
        el.classList.add('flipped');
        unrevealed.push(el);
      }
    });

    setTimeout(() => {
      unrevealed.forEach(el => el.classList.remove('flipped'));
      this.isBoardLocked = false;
    }, 2000);
  }

  useHintTime() {
    if (!this.deductPoints(80)) {
      this.showToast("Kifayət qədər XP yoxdur! (80 XP lazımdır)");
      return;
    }

    sfx.playHint();
    this.gameTimerVal += 30;
    this.renderGameTimer();
    this.dom.timerBadge.classList.remove('warning');
    this.showToast("⏳ Vaxtınıza +30 saniyə əlavə olundu!");
  }

  // --- LEVEL SELECTION MODAL ---
  renderLevelSelectModal() {
    this.dom.levelsGridContainer.innerHTML = '';
    LEVELS_CONFIG.forEach((lvl, idx) => {
      const isUnlocked = idx + 1 <= this.unlockedLevel;
      const isActive = idx === this.currentLevelIndex;

      const card = document.createElement('div');
      card.className = `lvl-card ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}`;
      card.innerHTML = `
        <span class="lvl-num">${lvl.id}</span>
        <span class="lvl-info">${isUnlocked ? (isActive ? 'OYNAYIR' : 'AÇIQ') : '🔒 BAĞLI'}</span>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          this.dom.modalLevelSelect.classList.remove('active');
          this.loadLevel(idx);
        });
      }

      this.dom.levelsGridContainer.appendChild(card);
    });
  }

  // --- TOAST MESSAGES ---
  showToast(message) {
    this.dom.toast.textContent = message;
    this.dom.toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.toast.classList.remove('show');
    }, 2800);
  }
}

// Instantiate game engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.gameEngine = new GameEngine();
});
