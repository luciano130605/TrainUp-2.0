import type { Exercise, Muscle, Equipment } from "./types";
import ejerciciosLocal, { type EjercicioLocal } from "./exercises-local";

export const MUSCLE_LABEL: Record<Muscle, string> = {
  pecho: "Pecho",
  espalda: "Espalda",
  hombros: "Hombros",
  piernas: "Piernas",
  cuadriceps: "Cuádriceps",
  isquiotibiales: "Isquiotibiales",
  gemelos: "Gemelos",
  gluteos: "Glúteos",
  aductores: "Aductores",
  abductores: "Abductores",
  biceps: "Bíceps",
  triceps: "Tríceps",
  core: "Core",
  cardio: "Cardio",
};

// Body parts that read as one region from the athlete's side but are worth
// keeping apart in a routine, so each gets its own label above.
const LEG_SUB_MUSCLES = new Set<Muscle>([
  "cuadriceps",
  "isquiotibiales",
  "gemelos",
  "aductores",
  "abductores",
]);

/** True when the muscle is trained as part of the lower body. */
export function isLegMuscle(muscle: Muscle) {
  return LEG_SUB_MUSCLES.has(muscle);
}

export const EQUIPMENT_LABEL: Record<Equipment, string> = {
  barra: "Barra",
  mancuernas: "Mancuernas",
  maquina: "Máquina",
  "peso-corporal": "Peso corporal",
  kettlebell: "Kettlebell",
  polea: "Polea",
  banco: "Banco",
};

export const EXERCISES: Exercise[] = [
  {
    id: "press-banca",
    name: "Press de banca",
    muscle: "pecho",
    secondary: ["triceps", "hombros"],
    equipment: "barra",
    cues: ["Escápulas juntas", "Pies firmes", "Barra al pecho medio"],
    defaultSets: 4,
    defaultReps: 8,
    restSec: 150,
    compound: true,
  },
  {
    id: "press-inclinado",
    name: "Press inclinado",
    muscle: "pecho",
    secondary: ["hombros", "triceps"],
    equipment: "barra",
    cues: ["Banco a 30°", "Recorrido controlado", "No rebotar"],
    defaultSets: 4,
    defaultReps: 8,
    restSec: 120,
    compound: true,
  },
  {
    id: "press-mancuernas",
    name: "Press con mancuernas",
    muscle: "pecho",
    secondary: ["triceps"],
    equipment: "mancuernas",
    cues: ["Muñecas neutras", "Rango amplio", "Pausa arriba"],
    defaultSets: 3,
    defaultReps: 10,
    restSec: 90,
    compound: true,
  },
  {
    id: "aperturas",
    name: "Aperturas",
    muscle: "pecho",
    equipment: "mancuernas",
    cues: ["Codo suave", "Estirar sin dolor", "Apriete al cierre"],
    defaultSets: 3,
    defaultReps: 12,
    restSec: 60,
    compound: false,
  },
  {
    id: "fondos",
    name: "Fondos",
    muscle: "pecho",
    secondary: ["triceps"],
    equipment: "peso-corporal",
    cues: ["Torso levemente inclinado", "Hombros abajo", "Rango cómodo"],
    defaultSets: 3,
    defaultReps: 10,
    restSec: 90,
    compound: true,
  },
  {
    id: "cruce-poleas",
    name: "Cruce de poleas",
    muscle: "pecho",
    equipment: "polea",
    cues: ["Paso estable", "Codos altos", "Apriete de 1s"],
    defaultSets: 3,
    defaultReps: 12,
    restSec: 60,
    compound: false,
  },
  {
    id: "dominadas",
    name: "Dominadas",
    muscle: "espalda",
    secondary: ["biceps"],
    equipment: "peso-corporal",
    cues: ["Hombros lejos de las orejas", "Pecho a la barra", "Bajada lenta"],
    defaultSets: 4,
    defaultReps: 6,
    restSec: 150,
    compound: true,
  },
  {
    id: "jalon",
    name: "Jalón al pecho",
    muscle: "espalda",
    secondary: ["biceps"],
    equipment: "polea",
    cues: ["Pecho alto", "Tirar con los codos", "No balancear"],
    defaultSets: 4,
    defaultReps: 10,
    restSec: 90,
    compound: true,
  },
  {
    id: "remo-barra",
    name: "Remo con barra",
    muscle: "espalda",
    secondary: ["biceps"],
    equipment: "barra",
    cues: ["Espalda neutra", "Barra al ombligo", "Pausa 1s"],
    defaultSets: 4,
    defaultReps: 8,
    restSec: 120,
    compound: true,
  },
  {
    id: "remo-mancuerna",
    name: "Remo con mancuerna",
    muscle: "espalda",
    secondary: ["biceps"],
    equipment: "mancuernas",
    cues: ["Mano y rodilla en banco", "Codo pegado", "Sin rotar el torso"],
    defaultSets: 3,
    defaultReps: 10,
    restSec: 75,
    compound: true,
  },
  {
    id: "peso-muerto",
    name: "Peso muerto",
    muscle: "espalda",
    secondary: ["piernas", "gluteos"],
    equipment: "barra",
    cues: ["Barra pegada", "Dorsal activo", "Caderas atrás"],
    defaultSets: 4,
    defaultReps: 5,
    restSec: 180,
    compound: true,
  },
  {
    id: "face-pull",
    name: "Face pull",
    muscle: "espalda",
    secondary: ["hombros"],
    equipment: "polea",
    cues: ["Cuerda a la cara", "Rotación externa", "Escápulas juntas"],
    defaultSets: 3,
    defaultReps: 15,
    restSec: 45,
    compound: false,
  },
  {
    id: "press-militar",
    name: "Press militar",
    muscle: "hombros",
    secondary: ["triceps"],
    equipment: "barra",
    cues: ["Core cerrado", "Cabeza atrás al subir", "No hiperextender"],
    defaultSets: 4,
    defaultReps: 6,
    restSec: 150,
    compound: true,
  },
  {
    id: "press-hombro-mancuernas",
    name: "Press de hombro",
    muscle: "hombros",
    secondary: ["triceps"],
    equipment: "mancuernas",
    cues: ["Muñecas sobre el codo", "Recorrido completo", "Sin impulso"],
    defaultSets: 3,
    defaultReps: 10,
    restSec: 90,
    compound: true,
  },
  {
    id: "laterales",
    name: "Elevaciones laterales",
    muscle: "hombros",
    equipment: "mancuernas",
    cues: ["Meñique levemente arriba", "Sin trapecio", "Control al bajar"],
    defaultSets: 4,
    defaultReps: 12,
    restSec: 45,
    compound: false,
  },
  {
    id: "pajaros",
    name: "Pájaros",
    muscle: "hombros",
    secondary: ["espalda"],
    equipment: "mancuernas",
    cues: ["Pecho adelante", "Pulgares ligeramente in", "Apriete posterior"],
    defaultSets: 3,
    defaultReps: 12,
    restSec: 45,
    compound: false,
  },
  {
    id: "sentadilla",
    name: "Sentadilla",
    muscle: "piernas",
    secondary: ["gluteos", "core"],
    equipment: "barra",
    cues: ["Rodillas en línea", "Pecho alto", "Profundidad controlada"],
    defaultSets: 4,
    defaultReps: 6,
    restSec: 180,
    compound: true,
  },
  {
    id: "prensa",
    name: "Prensa",
    muscle: "piernas",
    secondary: ["gluteos"],
    equipment: "maquina",
    cues: ["Pies medios", "No bloquear", "Rango sin despegar lumbar"],
    defaultSets: 4,
    defaultReps: 10,
    restSec: 120,
    compound: true,
  },
  {
    id: "zancadas",
    name: "Zancadas",
    muscle: "piernas",
    secondary: ["gluteos"],
    equipment: "mancuernas",
    cues: ["Paso largo", "Torso erguido", "Rodilla estable"],
    defaultSets: 3,
    defaultReps: 10,
    restSec: 75,
    compound: true,
  },
  {
    id: "bulgara",
    name: "Sentadilla búlgara",
    muscle: "piernas",
    secondary: ["gluteos"],
    equipment: "mancuernas",
    cues: ["Pie atrasero ligero", "Tibia vertical", "Bajada lenta"],
    defaultSets: 3,
    defaultReps: 8,
    restSec: 90,
    compound: true,
  },
  {
    id: "extension-cuad",
    name: "Extensión de cuádriceps",
    muscle: "piernas",
    equipment: "maquina",
    cues: ["Pausa arriba", "Sin balanceo", "Control total"],
    defaultSets: 3,
    defaultReps: 12,
    restSec: 60,
    compound: false,
  },
  {
    id: "curl-femoral",
    name: "Curl femoral",
    muscle: "piernas",
    equipment: "maquina",
    cues: ["Cadera pegada", "Apriete 1s", "Estirar sin rebotar"],
    defaultSets: 3,
    defaultReps: 12,
    restSec: 60,
    compound: false,
  },
  {
    id: "rumano",
    name: "Peso muerto rumano",
    muscle: "piernas",
    secondary: ["gluteos", "espalda"],
    equipment: "barra",
    cues: ["Caderas atrás", "Barra pegada", "Rodillas suaves"],
    defaultSets: 3,
    defaultReps: 8,
    restSec: 120,
    compound: true,
  },
  {
    id: "hip-thrust",
    name: "Hip thrust",
    muscle: "gluteos",
    secondary: ["piernas"],
    equipment: "barra",
    cues: ["Mentón metido", "Apriete arriba", "Costillas abajo"],
    defaultSets: 4,
    defaultReps: 8,
    restSec: 90,
    compound: true,
  },
  {
    id: "gemelos",
    name: "Elevación de gemelos",
    muscle: "piernas",
    equipment: "maquina",
    cues: ["Pausa arriba", "Estirar abajo", "Sin rebotar"],
    defaultSets: 4,
    defaultReps: 12,
    restSec: 45,
    compound: false,
  },
  {
    id: "curl-biceps",
    name: "Curl de bíceps",
    muscle: "biceps",
    equipment: "barra",
    cues: ["Codos fijos", "Sin balanceo", "Bajada de 3s"],
    defaultSets: 3,
    defaultReps: 10,
    restSec: 60,
    compound: false,
  },
  {
    id: "curl-martillo",
    name: "Curl martillo",
    muscle: "biceps",
    equipment: "mancuernas",
    cues: ["Agarre neutro", "Hombros quietos", "Rango completo"],
    defaultSets: 3,
    defaultReps: 10,
    restSec: 60,
    compound: false,
  },
  {
    id: "extension-triceps",
    name: "Extensión de tríceps",
    muscle: "triceps",
    equipment: "polea",
    cues: ["Codos pegados", "Solo antebrazo", "Apriete abajo"],
    defaultSets: 3,
    defaultReps: 12,
    restSec: 45,
    compound: false,
  },
  {
    id: "press-frances",
    name: "Press francés",
    muscle: "triceps",
    equipment: "barra",
    cues: ["Codos al techo", "Bajar a la frente", "Sin abrir"],
    defaultSets: 3,
    defaultReps: 10,
    restSec: 75,
    compound: false,
  },
  {
    id: "plancha",
    name: "Plancha",
    muscle: "core",
    equipment: "peso-corporal",
    cues: ["Glúteo activo", "Costillas cerradas", "Cuello largo"],
    defaultSets: 3,
    defaultReps: 45,
    restSec: 45,
    compound: false,
  },
  {
    id: "elevacion-piernas",
    name: "Elevación de piernas",
    muscle: "core",
    equipment: "peso-corporal",
    cues: ["Lumbar pegada", "Subir con control", "No balancear"],
    defaultSets: 3,
    defaultReps: 12,
    restSec: 45,
    compound: false,
  },
  {
    id: "crunch",
    name: "Crunch",
    muscle: "core",
    equipment: "peso-corporal",
    cues: ["Exhalar al subir", "Mentón neutro", "Rango corto"],
    defaultSets: 3,
    defaultReps: 15,
    restSec: 30,
    compound: false,
  },
  {
    id: "pallof",
    name: "Pallof press",
    muscle: "core",
    equipment: "polea",
    cues: ["Anti-rotación", "Caderas cuadradas", "Brazos largos"],
    defaultSets: 3,
    defaultReps: 10,
    restSec: 45,
    compound: false,
  },
  {
    id: "russian-twist",
    name: "Russian twist",
    muscle: "core",
    equipment: "peso-corporal",
    cues: ["Pecho alto", "Girar desde el torso", "Talones ligeros"],
    defaultSets: 3,
    defaultReps: 16,
    restSec: 30,
    compound: false,
  },
  {
    id: "farmer",
    name: "Farmer carry",
    muscle: "core",
    secondary: ["hombros"],
    equipment: "mancuernas",
    cues: ["Hombros abajo", "Pasos cortos", "Costillas cerradas"],
    defaultSets: 3,
    defaultReps: 40,
    restSec: 60,
    compound: true,
  },
  {
    id: "kb-swing",
    name: "Swing de kettlebell",
    muscle: "gluteos",
    secondary: ["espalda", "core"],
    equipment: "kettlebell",
    cues: ["Bisagra, no sentadilla", "Snap de cadera", "Brazos relajados"],
    defaultSets: 4,
    defaultReps: 12,
    restSec: 60,
    compound: true,
  },
  {
    id: "remo-erg",
    name: "Remo máquina cardio",
    muscle: "cardio",
    equipment: "maquina",
    cues: ["Piernas-torso-brazos", "Ritmo constante", "No encorvar"],
    defaultSets: 1,
    defaultReps: 10,
    restSec: 0,
    compound: true,
  },
  {
    id: "burpees",
    name: "Burpees",
    muscle: "cardio",
    equipment: "peso-corporal",
    cues: ["Pecho al suelo", "Salto completo", "Ritmo sostenible"],
    defaultSets: 3,
    defaultReps: 10,
    restSec: 45,
    compound: true,
  },
  {
    id: "sentadilla-goblet",
    name: "Sentadilla goblet",
    muscle: "piernas",
    secondary: ["gluteos", "core"],
    equipment: "kettlebell",
    cues: ["Codos adentro", "Talones firmes", "Torso alto"],
    defaultSets: 3,
    defaultReps: 12,
    restSec: 75,
    compound: true,
  },
  {
    id: "flexiones",
    name: "Flexiones",
    muscle: "pecho",
    secondary: ["triceps", "core"],
    equipment: "peso-corporal",
    cues: ["Cuerpo en línea", "Codos 45°", "Pecho cerca del suelo"],
    defaultSets: 3,
    defaultReps: 12,
    restSec: 60,
    compound: true,
  },
];

/** Strips accents, lowercases and collapses non-alphanumerics to single spaces. */
function normalizeToken(raw: string) {
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const MUSCLE_BY_TOKEN: Record<string, Muscle> = {
  pecho: "pecho",
  espalda: "espalda",
  dorsal: "espalda",
  dorsales: "espalda",
  trapecio: "espalda",
  hombro: "hombros",
  hombros: "hombros",
  cuadriceps: "cuadriceps",
  isquiotibiales: "isquiotibiales",
  isquio: "isquiotibiales",
  gemelo: "gemelos",
  gemelos: "gemelos",
  gluteo: "gluteos",
  gluteos: "gluteos",
  aductor: "aductores",
  aductores: "aductores",
  adductor: "aductores",
  adductores: "aductores",
  abductor: "abductores",
  abductores: "abductores",
  biceps: "biceps",
  triceps: "triceps",
  antebrazo: "biceps",
  antebrazos: "biceps",
  abdominal: "core",
  abdominales: "core",
  abdomen: "core",
  core: "core",
  cardio: "cardio",
  piernas: "piernas",
  pierna: "piernas",
  femoral: "isquiotibiales",
};

/** Best-effort mapping from the catalogue's free-text body part to a muscle. */
function asMuscle(raw: string): Muscle {
  return MUSCLE_BY_TOKEN[normalizeToken(raw)] ?? "core";
}

/** Same, but returns undefined for entries the catalogue leaves empty. */
function asOptionalMuscle(raw: string): Muscle | undefined {
  const token = normalizeToken(raw);
  if (!token) return undefined;
  return MUSCLE_BY_TOKEN[token];
}

const EQUIPMENT_BY_TOKEN: Record<string, Equipment> = {
  barra: "barra",
  mancuerna: "mancuernas",
  mancuernas: "mancuernas",
  maquina: "maquina",
  maquinas: "maquina",
  smith: "maquina",
  polea: "polea",
  "p corporal": "peso-corporal",
  "peso corporal": "peso-corporal",
  corporal: "peso-corporal",
  kettlebell: "kettlebell",
  banco: "banco",
};

function asEquipment(raw: string): Equipment {
  return EQUIPMENT_BY_TOKEN[normalizeToken(raw)] ?? "peso-corporal";
}

/** Removes duplicated equipment labels from catalogue names, e.g. "(Polea)". */
function cleanExerciseName(raw: string) {
  return raw.replace(/\s*\((?:barra|mancuernas?|maquina|maquinas|polea|peso|p\.?\s*corporal)\)\s*$/i, "").trim();
}

/**
 * Slots the owner's catalogue fills, laid over the curated defaults so a
 * movement keeps sensible sets/reps/rest instead of inventing them.
 */
const LOCAL_DEFAULTS: Record<string, { sets: number; reps: number; restSec: number; compound: boolean }> = {
  pecho: { sets: 4, reps: 8, restSec: 120, compound: true },
  espalda: { sets: 4, reps: 10, restSec: 90, compound: true },
  hombros: { sets: 3, reps: 12, restSec: 60, compound: false },
  biceps: { sets: 3, reps: 10, restSec: 60, compound: false },
  triceps: { sets: 3, reps: 12, restSec: 45, compound: false },
  cuadriceps: { sets: 4, reps: 8, restSec: 120, compound: true },
  isquiotibiales: { sets: 3, reps: 12, restSec: 60, compound: false },
  gemelos: { sets: 4, reps: 12, restSec: 45, compound: false },
  gluteos: { sets: 3, reps: 10, restSec: 90, compound: true },
  aductores: { sets: 3, reps: 12, restSec: 45, compound: false },
  abductores: { sets: 3, reps: 12, restSec: 45, compound: false },
  core: { sets: 3, reps: 12, restSec: 45, compound: false },
  cardio: { sets: 3, reps: 10, restSec: 45, compound: true },
  piernas: { sets: 3, reps: 10, restSec: 90, compound: true },
};

/** Compound movements deserve a longer rest than the isolation default. */
function withCompoundRest(
  base: { sets: number; reps: number; restSec: number; compound: boolean },
  name: string,
) {
  const t = normalizeToken(name);
  const isCompound =
    t.includes("sentadilla") ||
    t.includes("prensa") ||
    t.includes("peso muerto") ||
    t.includes("press de banca") ||
    t.includes("remo") ||
    t.includes("jalon") ||
    t.includes("estocadas") ||
    t.includes("elevacion de cadera") ||
    t.includes("step up");
  if (!isCompound) return base;
  return { ...base, compound: true, restSec: Math.max(base.restSec, 120) };
}

/** Turns one catalogue row into the app's `Exercise` shape. */
function fromLocal(ej: EjercicioLocal): Exercise {
  const muscle = asMuscle(ej.parteDelCuerpo);
  const secondary = Array.from(
    new Set(ej.subMusculos.map(asOptionalMuscle).filter((m): m is Muscle => Boolean(m && m !== muscle))),
  );
  const rest = withCompoundRest(LOCAL_DEFAULTS[muscle]!, ej.nombre);
  return {
    id: `ex-${ej.id}`,
    name: cleanExerciseName(ej.nombre),
    muscle,
    ...(secondary.length ? { secondary } : {}),
    equipment: asEquipment(ej.equipamiento),
    cues: [],
    defaultSets: rest.sets,
    defaultReps: ej.esTiempo ? 45 : rest.reps,
    restSec: rest.restSec,
    compound: rest.compound,
    ...(ej.gif ? { gif: ej.gif } : {}),
    ...(ej.esTiempo ? { esTiempo: true } : {}),
  };
}

export const LOCAL_EXERCISES: Exercise[] = ejerciciosLocal.map(fromLocal);

// The owner's catalogue first: `getExercise` also falls back to index 0, and a
// movement present in their gym is the more useful placeholder than a built-in.
function uniqueExercises(exercises: Exercise[]) {
  const seen = new Set<string>();
  return exercises.filter((exercise) => {
    const key = `${normalizeToken(exercise.name)}|${exercise.muscle}|${exercise.equipment}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const ALL_EXERCISES: Exercise[] = uniqueExercises([...LOCAL_EXERCISES, ...EXERCISES]);
const byId = new Map(ALL_EXERCISES.map((e) => [e.id, e]));

export function getExercise(id: string): Exercise {
  return byId.get(id) ?? ALL_EXERCISES[0]!;
}

/**
 * Search across both catalogues. The owner's list is listed first so the
 * movements actually present in their gym lead the results.
 */
export function searchExercises(query: string, muscle?: Muscle | "todos") {
  const q = normalizeToken(query);
  return ALL_EXERCISES.filter((e) => {
    const muscleOk =
      !muscle ||
      muscle === "todos" ||
      e.muscle === muscle ||
      (isLegMuscle(muscle) && isLegMuscle(e.muscle));
    if (!q) return muscleOk;
    const hay = normalizeToken(`${e.name} ${MUSCLE_LABEL[e.muscle]} ${EQUIPMENT_LABEL[e.equipment]}`);
    return muscleOk && hay.includes(q);
  });
}
