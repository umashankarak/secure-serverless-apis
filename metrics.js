const fs = require('fs');

const lines = fs.readFileSync('results.txt', 'utf8').split('\n');

let TP = 0;
let FP = 0;
let TN = 0;
let FN = 0;

lines.forEach((line) => {

  if (!line.trim()) return;

  const [actual, predicted] = line.split(',');

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

const accuracy = (TP + TN) / (TP + TN + FP + FN);
const precision = TP / (TP + FP);
const recall = TP / (TP + FN);
const f1 = 2 * (precision * recall) / (precision + recall);
const fpr = FP / (FP + TN);

console.log('=== Logs-Only Results ===');
console.log(`TP: ${TP}`);
console.log(`FP: ${FP}`);
console.log(`TN: ${TN}`);
console.log(`FN: ${FN}`);
console.log('');
console.log(`Accuracy: ${accuracy.toFixed(2)}`);
console.log(`Precision: ${precision.toFixed(2)}`);
console.log(`Recall: ${recall.toFixed(2)}`);
console.log(`F1-score: ${f1.toFixed(2)}`);
console.log(`False Positive Rate: ${fpr.toFixed(2)}`);