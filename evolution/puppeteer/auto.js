const puppeteer = require('puppeteer');

// --- CONFIG ---
const INITIAL_URL = 'https://app.localhost.mobi';
const HEADLESS = false;

// --- MODEL & LEVEL CONFIG ---
const models = [
  { level: 1, name: "KLM" },
  { level: 2, name: "FLM" },
  { level: 3, name: "CLX" },
  { level: 4, name: "QLM" },
  { level: 5, name: "AXT" },
  { level: 6, name: "NXT" },
  { level: 7, name: "ZLM" },
  { level: 8, name: "BLM" },
  { level: 9, name: "OLM" },
  { level: 10, name: "LFX" },
  { level: 11, name: "CXP" },
  { level: 12, name: "PNX" },
  { level: 13, name: "VTX" },
  { level: 14, name: "REX" },
  { level: 15, name: "AXR" },
  { level: 16, name: "QPX" },
  { level: 17, name: "SYX" },
  { level: 18, name: "ORX" },
  { level: 19, name: "CRX" },
  { level: 20, name: "OMEGA" },
  { level: 21, name: "QL1" },
  { level: 22, name: "QL2" },
  { level: 23, name: "QL3" },
  { level: 24, name: "M1" },
  { level: 25, name: "M2" },
  { level: 26, name: "M3" },
];

// Thresholds for leveling up
const levelThresholds = [
  50, 100, 150, 200, 250, 300, 350, 400, 450, 500,
  550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
  1200, 1400, 1600, 1800, 2000, 2500
];

// --- MODEL STATE ---
let modelState = {
  level: 1,
  name: "KLM",
  performanceScore: 0,
  upvotes: 0,
  tasksCompleted: 0
};

// --- HELPER FUNCTIONS ---
function getModelForLevel(level) {
  return models.find(m => m.level === level) || models[models.length - 1];
}

function brainCapacityPercent(level) {
  return Math.floor((level / models.length) * 100);
}

// Unlock modules progressively
function unlockModulesForLevel(level) {
  if (level >= 6) console.log("💡 Embeddings enabled");
  if (level >= 10) console.log("💡 Autonomous learning enabled");
  if (level >= 16) console.log("💡 NeoMind + XLSL full integration");
  if (level >= 21) console.log("💡 Quantum-level reasoning unlocked");
  if (level >= 24) console.log("💡 Matrix-level multi-dimensional reasoning unlocked");
}

// Check if model can evolve
function checkEvolution() {
  const score = modelState.performanceScore;
  const currentLevel = modelState.level;

  if (currentLevel < models.length && score >= levelThresholds[currentLevel - 1]) {
    modelState.level += 1;
    modelState.name = getModelForLevel(modelState.level).name;
    console.log(`✨ Evolved to ${modelState.name} (Level ${modelState.level})`);
    console.log(`🧠 Brain capacity: ${brainCapacityPercent(modelState.level)}%`);
    unlockModulesForLevel(modelState.level);
  }
}

// Simulate AI completing a task (updates score & triggers evolution)
function completeTask(intelligenceGain = 10, upvote = false) {
  modelState.performanceScore += intelligenceGain;
  if (upvote) modelState.upvotes += 1;
  modelState.tasksCompleted += 1;
  console.log(`📈 Task completed! Performance: ${modelState.performanceScore}`);
  checkEvolution();
}

// --- PUPPETEER AUTOMATION ---
(async () => {
  const browser = await puppeteer.launch({ headless: HEADLESS, defaultViewport: null, args: ['--start-maximized'] });
  const page = await browser.newPage();

  console.log(`🚀 Opening Aura at ${INITIAL_URL}...`);
  await page.goto(INITIAL_URL, { waitUntil: 'networkidle2' });

  // Wait for model selector and select initial model
  await page.waitForSelector('#model-select');
  await page.select('#model-select', modelState.name);
  console.log(`🧠 Model loaded: ${modelState.name} (Level ${modelState.level})`);

  // Example: Auto chat loop simulating task completion
  const messages = [
    "Hello Aura, test connection",
    "Run XLSL analysis",
    "Show me model capabilities",
    "Perform predictive reasoning"
  ];

  while (true) {
    for (const msg of messages) {
      await page.type('#input', msg, { delay: 40 });
      await page.click('#send');
      console.log(`💬 Sent: "${msg}"`);

      // Simulate task completion & intelligence gain
      const intelligenceGain = Math.floor(Math.random() * 20) + 5; // random gain
      const upvote = Math.random() > 0.7; // 30% chance upvote
      completeTask(intelligenceGain, upvote);

      await page.waitForTimeout(3000);
    }
  }
})();
