/**
 * Checks the owner's catalogue survives normalisation: every row must come out
 * with a valid muscle, equipment and usable default sets. Run with
 * `npx tsx scripts/check-local-exercises.mjs`.
 */
import { LOCAL_EXERCISES, EQUIPMENT_LABEL, MUSCLE_LABEL } from "../src/lib/exercises.ts";
import local from "../src/lib/exercises-local.ts";

const problems = [];

if (LOCAL_EXERCISES.length !== local.length) {
  problems.push(`count mismatch: ${LOCAL_EXERCISES.length} vs ${local.length}`);
}

const byMuscle = {};
for (const ex of LOCAL_EXERCISES) {
  const src = ex.id.replace(/^ex-/, "");
  if (!MUSCLE_LABEL[ex.muscle]) problems.push(`${src} bad muscle ${ex.muscle}`);
  if (!EQUIPMENT_LABEL[ex.equipment]) problems.push(`${src} bad equipment ${ex.equipment}`);
  if (!ex.defaultSets || !ex.defaultReps) problems.push(`${src} missing defaults`);
  if (!ex.gif) problems.push(`${src} lost its gif`);
  byMuscle[ex.muscle] = (byMuscle[ex.muscle] ?? 0) + 1;
}

// Every muscle the catalogue declares must be representable.
for (const raw of new Set(local.map((e) => e.parteDelCuerpo))) {
  const hit = LOCAL_EXERCISES.find((e) => raw && e.name === local.find((l) => l.parteDelCuerpo === raw)?.nombre);
  if (!hit) problems.push(`body part unmapped: ${raw}`);
}

console.log("total:", LOCAL_EXERCISES.length);
console.log("por músculo:", JSON.stringify(byMuscle, null, 0));
console.log("plancha esTiempo:", LOCAL_EXERCISES.find((e) => e.esTiempo)?.name ?? "NINGUNA");
console.log("problemas:", problems.length ? problems : "ninguno");
process.exit(problems.length ? 1 : 0);