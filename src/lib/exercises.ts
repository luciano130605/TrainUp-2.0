import type { Exercise, Muscle, Equipment } from "./types";

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

/**
 * Equipment shown under the exercise name, on its own line. Kept deliberately
 * short so it reads as a tag ("Espalda · Máquina"), not a sentence.
 */
export const EQUIPMENT_LABEL: Record<Equipment, string> = {
  barra: "Barra",
  mancuernas: "Mancuernas",
  maquina: "Máquina",
  "peso-corporal": "Peso corporal",
  kettlebell: "Kettlebell",
  polea: "Polea",
  banco: "Banco",
  smith: "Máquina Smith",
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
    id: "press-inclinado-manc",
    name: "Press inclinado con mancuernas",
    muscle: "pecho",
    secondary: ["hombros", "triceps"],
    equipment: "mancuernas",
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
    equipment: "polea",
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
    name: "Jalón al pecho abierto",
    muscle: "espalda",
    secondary: ["biceps"],
    equipment: "maquina",
    cues: ["Pecho alto", "Tirar con los codos", "No balancear"],
    defaultSets: 3,
    defaultReps: 8,
    restSec: 90,
    compound: true,
  },
  {
    id: "jalon-cerrado",
    name: "Jalón al pecho cerrado",
    muscle: "espalda",
    secondary: ["biceps"],
    equipment: "maquina",
    cues: ["Pecho alto", "Codos pegados al cuerpo", "No balancear"],
    defaultSets: 3,
    defaultReps: 8,
    restSec: 90,
    compound: true,
  },
  {
    id: "remo-punta",
    name: "Remo en punta",
    muscle: "espalda",
    secondary: ["biceps"],
    equipment: "maquina",
    cues: [
      "Pecho abierto y espalda neutra",
      "Llevá los codos hacia atrás",
      "Juntá las escápulas al final",
      "No encorves la espalda",
      "No uses impulso"
    ],
    defaultSets: 3,
    defaultReps: 8,
    restSec: 90,
    compound: true,
  },
  {
    id: "remo-unilateral",
    name: "Remo unilateral",
    muscle: "espalda",
    secondary: ["biceps"],
    equipment: "polea",
    cues: [
      "Espalda neutra",
      "Hombro abajo",
      "Llevá el codo hacia atrás",
      "No gires el torso",
      "Volvé controlando"
    ],
    defaultSets: 3,
    defaultReps: 8,
    restSec: 90,
    compound: true,
  },
  {
    id: "jalon-uni",
    name: "Jalón al pecho unilateral",
    muscle: "espalda",
    secondary: ["biceps"],
    equipment: "maquina",
    cues: [
      "Pecho alto",
      "Hombro abajo",
      "Llevá el codo hacia abajo",
      "Brazos pegados",
      "Subí controlando"
    ],
    defaultSets: 3,
    defaultReps: 8,
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
    muscle: "hombros",
    secondary: ["espalda"],
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
    id: "press-militar-mancuernas",
    name: "Press militar sentado",
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
    id: "laterales.polea",
    name: "Elevaciones laterales en polea",
    muscle: "hombros",
    equipment: "polea",
    cues: ["Meñique levemente arriba", "Sin trapecio", "Control al bajar"],
    defaultSets: 4,
    defaultReps: 12,
    restSec: 45,
    compound: false,
  },
  {
    id: "vuelos-posteriores",
    name: "Vuelos posteriores",
    muscle: "hombros",
    secondary: ["espalda"],
    equipment: "maquina",
    cues: ["Pecho adelante", "Apriete posterior"],
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
    id: "curl-femoral-sentado",
    name: "Curl femoral sentado",
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
    id: "peso-muerto-smith",
    name: "Peso muerto en Smith",
    muscle: "isquiotibiales",
    secondary: ["gluteos", "espalda"],
    equipment: "smith",
    cues: [
      "Espalda neutra",
      "Rodillas ligeramente flexionadas",
      "Llevá la cadera hacia atrás",
      "Barra cerca del cuerpo",
      "Subí extendiendo la cadera"
    ],
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
    equipment: "smith",
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
    id: "curl-z",
    name: "Curl con barra Z",
    muscle: "biceps",
    equipment: "barra",
    cues: [
      "Codos pegados al cuerpo",
      "Hombros quietos",
      "Subí sin balancearte",
      "Contraé arriba",
      "Bajá controlando"
    ],
    defaultSets: 3,
    defaultReps: 8,
    restSec: 90,
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
    id: "curl-bayesian",
    name: "Curl bayesian",
    muscle: "biceps",
    equipment: "polea",
    cues: [
      "Brazo detrás del cuerpo",
      "Codo fijo",
      "Subí sin mover el hombro",
      "Contraé arriba",
      "Bajá controlando"
    ],
    defaultSets: 3,
    defaultReps: 8,
    restSec: 90,
    compound: false,
  },
  {
    id: "extension-triceps",
    name: "Extensión de tríceps con soga",
    muscle: "triceps",
    equipment: "polea",
    cues: ["Codos pegados", "Solo antebrazo", "Apriete abajo"],
    defaultSets: 3,
    defaultReps: 12,
    restSec: 45,
    compound: false,
  },
  {
    id: "extension-katana",
    name: "Extensión katana",
    muscle: "triceps",
    equipment: "polea",
    cues: [
      "Codo fijo",
      "Brazo detrás de la cabeza",
      "Extendé sin mover el hombro",
      "Apretá el tríceps al final",
      "Volvé controlando"
    ],
    defaultSets: 3,
    defaultReps: 8,
    restSec: 90,
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
    id: "extension-triceps-unilateral",
    name: "Extensión de tríceps a 1 brazo",
    muscle: "triceps",
    secondary: [],
    equipment: "polea",
    cues: [
      "Codo fijo",
      "Hombro quieto",
      "Extendé completamente el brazo",
      "Apretá el tríceps al final",
      "Volvé controlando"
    ],
    defaultSets: 3,
    defaultReps: 8,
    restSec: 90,
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
    id: "sentadilla-hack",
    name: "Sentadilla hack",
    muscle: "cuadriceps",
    secondary: ["gluteos"],
    equipment: "maquina",
    cues: [
      "Pies firmes y separados al ancho de hombros",
      "Rodillas siguen la línea de los pies",
      "Bajá controlando",
      "Espalda y cadera apoyadas",
      "Subí empujando el suelo"
    ],
    defaultSets: 3,
    defaultReps: 8,
    restSec: 120,
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
    name: "Remo ergómetro",
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
  {
    id: "gemelos-sentado",
    name: "Elevación de gemelos sentado",
    muscle: "gemelos",
    equipment: "maquina",
    cues: ["Rodillas bajo la almohadilla", "Pausa arriba", "Estirá abajo sin rebotar"],
    defaultSets: 4,
    defaultReps: 15,
    restSec: 45,
    compound: false,
  },
  {
    id: "press-hombro-mancuernas",
    name: "Press de hombros con mancuernas",
    muscle: "hombros",
    secondary: ["triceps"],
    equipment: "mancuernas",
    cues: ["Muñecas sobre el codo", "Costillas abajo", "Sin impulso"],
    defaultSets: 3,
    defaultReps: 10,
    restSec: 90,
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

/** Maps free-text body parts (search aliases) onto the app's muscle ids. */
export function muscleFromToken(raw: string): Muscle | undefined {
  return MUSCLE_BY_TOKEN[normalizeToken(raw)];
}

/**
 * Collapses a movement to a comparable key so the same exercise can't be
 * listed twice: the equipment is part of the key (the app renders it on its own
 * line, so "Press de banca" and "Press de banca (Barra)" are one row) and the
 * name is normalised so accents/punctuation do not split a duplicate.
 */
function exerciseKey(name: string, equipment: Equipment) {
  return `${normalizeToken(name)}|${equipment}`;
}

/**
 * Merges entries that describe the same movement on the same equipment. The
 * first one wins — the list is ordered so the richer, curated entry lands
 * first — and the survivor absorbs any demonstration clip the duplicate had.
 */
function dedupeExercises(exercises: Exercise[]) {
  const seenId = new Set<string>();
  const seenKey = new Set<string>();
  const out: Exercise[] = [];

  for (const exercise of exercises) {
    if (seenId.has(exercise.id)) continue;
    const key = exerciseKey(exercise.name, exercise.equipment);
    const previous = out.find((e) => exerciseKey(e.name, e.equipment) === key);
    if (previous) {
      if (!previous.gif && exercise.gif) previous.gif = exercise.gif;
      if (!previous.cues.length && exercise.cues.length) previous.cues = exercise.cues;
      continue;
    }
    seenId.add(exercise.id);
    seenKey.add(key);
    out.push(exercise);
  }

  return out;
}

export const ALL_EXERCISES: Exercise[] = dedupeExercises(EXERCISES);

const byId = new Map(ALL_EXERCISES.map((e) => [e.id, e]));

export function getExercise(id: string): Exercise {
  return byId.get(id) ?? ALL_EXERCISES[0]!;
}

/**
 * Search the catalogue by name, with a muscle filter. Also matches the search
 * alias for a body part ("dorsal", "femoral") so older free-text habits still
 * land on the right movements.
 */
export function searchExercises(
  query: string,
  muscle: Muscle | "todos" = "todos",
) {
  const q = normalizeToken(query);
  const aliasMuscle = q ? muscleFromToken(q) : undefined;

  const matches = (ex: Exercise) => {
    if (muscle !== "todos" && ex.muscle !== muscle) return false;
    if (!q) return true;
    if (aliasMuscle) return ex.muscle === aliasMuscle || ex.secondary?.includes(aliasMuscle);
    return normalizeToken(ex.name).includes(q);
  };

  // Movements led by the queried muscle come first, so the list reads in the
  // order an athlete trains rather than the order the catalogue was typed in.
  const hits = ALL_EXERCISES.filter(matches);
  if (!aliasMuscle) return hits;
  return hits.sort((a, b) => {
    const rank = (ex: Exercise) => (ex.muscle === aliasMuscle ? 0 : 1);
    return rank(a) - rank(b);
  });
}