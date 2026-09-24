/**
 * Checks the exercise catalogue survives de-duplication: every row must come
 * out with a valid muscle, equipment and usable default sets, and no two rows
 * may describe the same movement on the same equipment. Run with
 * `npx tsx scripts/check-local-exercises.mjs`.
 */
import { ALL_EXERCISES, EXERCISES, EQUIPMENT_LABEL, MUSCLE_LABEL } from "../src/lib/exercises.ts";

const problems = [];

if (ALL_EXERCISES.length > EXERCISES.length) {
  problems.push(`duplicates survived: ${ALL_EXERCISES.length} vs ${EXERCISES.length}`);
}

const byMuscle = {};
const seen = new Map();
for (const ex of ALL_EXERCISES) {
  if (!MUSCLE_LABEL[ex.muscle]) problems.push(`${ex.id} bad muscle ${ex.muscle}`);
  if (!EQUIPMENT_LABEL[ex.equipment]) problems.push(`${ex.id} bad equipment ${ex.equipment}`);
  if (!ex.defaultSets || !ex.defaultReps) problems.push(`${ex.id} missing defaults`);
  if (/(barra|mancuernas?|m[aá]quinas?|polea|kettlebell|banco)\)\s*$/i.test(ex.name)) {
    problems.push(`${ex.id} still carries equipment in the name: ${ex.name}`);
  }
  const key = `${ex.name}|${ex.equipment}`;
  if (seen.has(key)) problems.push(`${ex.id} duplicates ${seen.get(key)} (${key})`);
  else seen.set(key, ex.id);
  byMuscle[ex.muscle] = (byMuscle[ex.muscle] ?? 0) + 1;
}

// The two movements the owner asked for must be present and reachable.
for (const id of ["extension-katana", "jalon-uni"]) {
  if (!ALL_EXERCISES.some((e) => e.id === id)) problems.push(`missing exercise: ${id}`);
}

console.log("total:", ALL_EXERCISES.length);
console.log("por músculo:", JSON.stringify(byMuscle, null, 0));
console.log("problemas:", problems.length ? problems : "ninguno");
process.exit(problems.length ? 1 : 0);