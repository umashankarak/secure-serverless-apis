// ============================================
// File: metrics.js
// ============================================

const fs = require('fs');

const results =
  JSON.parse(fs.readFileSync('results.json', 'utf8'));

let TP = 0;
let FP = 0;
let TN = 0;
let FN = 0;

results.forEach((result) => {

  const actual = result.actual;
  const predicted = result.predicted;

  if (actual === 'ATTACK' && predicted === 'ATTACK') {
    TP++;
  }
  else if (actual === 'BENIGN' && predicted === 'ATTACK') {
    FP++;
  }
  else if (actual === 'BENIGN' && predicted === 'BENIGN') {
    TN++;
  }
  else if (actual === 'ATTACK' && predicted === 'BENIGN') {
    FN++;
  }
});

const accuracy =
  (TP + TN) / (TP + TN + FP + FN);

const precision =
  TP / (TP + FP);

const recall =
  TP / (TP + FN);

const f1 =
  2 * (precision * recall) / (precision + recall);

const fpr =
  FP / (FP + TN);

console.log('\n=== Causal-SLS Results ===\n');

console.log(`TP: ${TP}`);
console.log(`FP: ${FP}`);
console.log(`TN: ${TN}`);
console.log(`FN: ${FN}`);

console.log('');

console.log(`Accuracy: ${(accuracy * 100).toFixed(2)}%`);
console.log(`Precision: ${(precision * 100).toFixed(2)}%`);
console.log(`Recall: ${(recall * 100).toFixed(2)}%`);
console.log(`F1-score: ${(f1 * 100).toFixed(2)}%`);
console.log(`False Positive Rate: ${(fpr * 100).toFixed(2)}%`);