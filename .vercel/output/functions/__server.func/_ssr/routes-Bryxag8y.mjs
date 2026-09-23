import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import "./client-BjbFQbVA.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react_dom } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-wG7fM00R.mjs";
import { a as useCurrentUserState, i as useCurrentUser, n as cn, r as uid, t as Mark } from "./mark-SSOXUADh.mjs";
import { n as Splash, r as createSsrRpc, t as RedirectToSignIn } from "./splash-BPtHK1vV.mjs";
import { i as hasGateSessionMarker } from "./server-BHRbO-e7.mjs";
import { t as Button } from "./button-D9xwQ7hg.mjs";
import { _ as Check, a as Search, c as Plus, d as Minus, f as House, g as ChevronLeft, h as ChevronRight, i as Trash2, l as Play, m as CirclePlus, n as User, o as RotateCcw, p as Dumbbell, s as Replace, t as X, u as Pause, v as Activity } from "../_libs/lucide-react.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { a as startOfWeek, i as format, n as subDays, r as isToday, t as es } from "../_libs/date-fns.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bryxag8y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var ejerciciosLocal = [
	{
		id: "0001",
		nombre: "Press de banca (Barra)",
		gif: "/gifs/press-banca-barra.gif",
		parteDelCuerpo: "Pecho",
		subMusculos: ["Triceps", "Hombros"],
		equipamiento: "Barra"
	},
	{
		id: "0002",
		nombre: "Press de banca inclinado (Mancuernas)",
		gif: "/gifs/press-banca-inclinado-manc.jpg",
		parteDelCuerpo: "Pecho",
		subMusculos: ["Triceps", "Hombros"],
		equipamiento: "Mancuernas"
	},
	{
		id: "0003",
		nombre: "Aperturas (Polea)",
		gif: "/gifs/aperturas-polea.jpg",
		parteDelCuerpo: "Pecho",
		subMusculos: [],
		equipamiento: "Polea"
	},
	{
		id: "0060",
		nombre: "Press de banca smith (Maquina)",
		gif: "/gifs/press-banca-smith.jpg",
		parteDelCuerpo: "Pecho",
		subMusculos: ["Hombros", "triceps"],
		equipamiento: "Maquinas"
	},
	{
		id: "0004",
		nombre: "Extensión de tríceps por encima de la cabeza (Polea)",
		gif: "/gifs/extension-cabeza-polea.gif",
		parteDelCuerpo: "Triceps",
		subMusculos: [],
		equipamiento: "Polea"
	},
	{
		id: "0005",
		nombre: "Tríceps con barra (Polea)",
		gif: "/gifs/triceps-con-barra.gif",
		parteDelCuerpo: "Triceps",
		subMusculos: [],
		equipamiento: "Polea"
	},
	{
		id: "0006",
		nombre: "Tríceps con soga (Polea)",
		gif: "/gifs/triceps-con-soga.gif",
		parteDelCuerpo: "Triceps",
		subMusculos: [],
		equipamiento: "Polea"
	},
	{
		id: "0007",
		nombre: "Tríceps a un brazo (Polea)",
		subMusculos: [],
		gif: "/gifs/triceps-una-mano.gif",
		parteDelCuerpo: "Triceps",
		equipamiento: "Polea"
	},
	{
		id: "0066",
		nombre: "Patada de triceps (Polea)",
		subMusculos: [],
		gif: "/gifs/patada-polea.jpg",
		parteDelCuerpo: "Triceps",
		equipamiento: "Polea"
	},
	{
		id: "0067",
		nombre: "Katana",
		subMusculos: [],
		gif: "/gifs/katana-polea.jpg",
		parteDelCuerpo: "Triceps",
		equipamiento: "Polea"
	},
	{
		id: "0008",
		nombre: "Curl Z (Barra)",
		gif: "/gifs/curl-z.gif",
		parteDelCuerpo: "Biceps",
		equipamiento: "Barra",
		subMusculos: []
	},
	{
		id: "0009",
		nombre: "Curl martillo (Mancuernas)",
		gif: "/gifs/curl-martillo-con-mancuernas.jpg",
		parteDelCuerpo: "Biceps",
		subMusculos: ["Antebrazo"],
		equipamiento: "Mancuernas"
	},
	{
		id: "0010",
		nombre: "Curl predicador (Maquina)",
		gif: "/gifs/predicador-maquina.gif",
		parteDelCuerpo: "Biceps",
		subMusculos: [],
		equipamiento: "Maquinas"
	},
	{
		id: "0011",
		nombre: "Curl predicador (Barra)",
		gif: "/gifs/predicador-barra.gif",
		subMusculos: [],
		parteDelCuerpo: "Biceps",
		equipamiento: "Barra"
	},
	{
		id: "0062",
		nombre: "Curl bayesian (Polea)",
		gif: "/gifs/curl-bayesian.gif",
		subMusculos: [],
		parteDelCuerpo: "Biceps",
		equipamiento: "Polea"
	},
	{
		id: "0012",
		nombre: "Jalón al pecho - Agarre abierto (Maquina)",
		gif: "/gifs/jalon-pecho-abierto.gif",
		parteDelCuerpo: "Espalda",
		subMusculos: [
			"Dorsales",
			"Bíceps",
			"Antebrazos"
		],
		equipamiento: "Maquinas"
	},
	{
		id: "0055",
		nombre: "Jalón al pecho - Agarre neutro (Maquina)",
		gif: "/gifs/jalon-pecho-neutro.jpg",
		parteDelCuerpo: "Espalda",
		subMusculos: [
			"Dorsales",
			"Bíceps",
			"Antebrazos"
		],
		equipamiento: "Maquinas"
	},
	{
		id: "0013",
		nombre: "Jalón al pecho - Agarre cerrado (Maquina)",
		gif: "/gifs/jalon-pecho-cerrado.gif",
		parteDelCuerpo: "Espalda",
		equipamiento: "Maquinas",
		subMusculos: [
			"Dorsales",
			"Bíceps",
			"Antebrazos"
		]
	},
	{
		id: "0014",
		nombre: "Remo en punta (Maquina)",
		gif: "/gifs/remo-punta.gif",
		parteDelCuerpo: "Espalda",
		subMusculos: [
			"Dorsales",
			"Bíceps",
			"Antebrazos"
		],
		equipamiento: "Maquinas"
	},
	{
		id: "0015",
		nombre: "Remo inclinado (Barra)",
		gif: "/gifs/remo-parado.gif",
		parteDelCuerpo: "Espalda",
		equipamiento: "Barra",
		subMusculos: [
			"Dorsales",
			"Bíceps",
			"Antebrazos"
		]
	},
	{
		id: "0016",
		nombre: "Remo sentado - Agarre V (Maquina)",
		gif: "/gifs/remo-sentado-v.gif",
		parteDelCuerpo: "Espalda",
		equipamiento: "Maquinas",
		subMusculos: [
			"Dorsales",
			"Bíceps",
			"Antebrazos"
		]
	},
	{
		id: "0056",
		nombre: "Remo sentado - Agarre abierto (Maquina)",
		gif: "/gifs/remo-sentado-abierto.jpg",
		parteDelCuerpo: "Espalda",
		subMusculos: [
			"Dorsales",
			"Bíceps",
			"Antebrazos"
		],
		equipamiento: "Maquinas"
	},
	{
		id: "0064",
		nombre: "Remo unilateral (Polea)",
		gif: "/gifs/remo-uni-polea.jpg",
		parteDelCuerpo: "Espalda",
		subMusculos: [
			"Dorsales",
			"Bíceps",
			"Antebrazos"
		],
		equipamiento: "Polea"
	},
	{
		id: "0068",
		nombre: "Jalón al pecho con una sola mano",
		gif: "/gifs/jalon-una-mano-polea.jpg",
		parteDelCuerpo: "Espalda",
		subMusculos: [
			"Dorsales",
			"Bíceps",
			"Antebrazos"
		],
		equipamiento: "Polea"
	},
	{
		id: "0017",
		nombre: "Sentadilla Hack (Maquina)",
		gif: "/gifs/sentadilla-hack.gif",
		parteDelCuerpo: "Cuadriceps",
		subMusculos: ["Gluteos", "Isquiotibiales"],
		equipamiento: "Maquinas"
	},
	{
		id: "0018",
		nombre: "Sentadilla libre (Barra)",
		gif: "/gifs/sentadilla-libre.gif",
		parteDelCuerpo: "Cuadriceps",
		subMusculos: ["Gluteos", "Isquiotibiales"],
		equipamiento: "Barra"
	},
	{
		id: "0019",
		nombre: "Sentadilla smith (Maquina)",
		gif: "/gifs/sentadilla-smith.gif",
		parteDelCuerpo: "Cuadriceps",
		subMusculos: ["Gluteos", "Isquiotibiales"],
		equipamiento: "Maquinas"
	},
	{
		id: "0020",
		nombre: "Prensa (Maquina)",
		gif: "/gifs/prensa.gif",
		parteDelCuerpo: "Cuadriceps",
		subMusculos: ["Gluteos", "Isquiotibiales"],
		equipamiento: "Maquinas"
	},
	{
		id: "0021",
		nombre: "Extension (Maquina)",
		gif: "/gifs/extension-pierna.gif",
		parteDelCuerpo: "Cuadriceps",
		subMusculos: [],
		equipamiento: "Maquinas"
	},
	{
		id: "0022",
		nombre: "Peso muerto smith (Maquina)",
		gif: "/gifs/peso-muerto-smith.jpg",
		parteDelCuerpo: "Cuadriceps",
		subMusculos: [
			"Gluteos",
			"Isquiotibiales",
			"Espalda",
			"Dorsales",
			"Trapecio"
		],
		equipamiento: "Maquinas"
	},
	{
		id: "0023",
		nombre: "Peso muerto libre (Barra)",
		gif: "/gifs/peso-muerto.gif",
		parteDelCuerpo: "Cuadriceps",
		equipamiento: "Barra",
		subMusculos: [
			"Gluteos",
			"Isquiotibiales",
			"Espalda",
			"Dorsales",
			"Trapecio"
		]
	},
	{
		id: "0061",
		nombre: "Estocadas (Mancuernas)",
		gif: "/gifs/estocadas.gif",
		parteDelCuerpo: "Cuadriceps",
		equipamiento: "Mancuernas",
		subMusculos: ["Gluteos", "Isquiotibiales"]
	},
	{
		id: "0024",
		nombre: "Curl femoral sentado (Maquina)",
		gif: "/gifs/curl-sentado-isquio.gif",
		parteDelCuerpo: "Isquiotibiales",
		equipamiento: "Maquinas",
		subMusculos: ["Gemelos"]
	},
	{
		id: "0025",
		nombre: "Curl femoral acostado (Maquina)",
		gif: "/gifs/curl-acostado-isquio.gif",
		parteDelCuerpo: "Isquiotibiales",
		equipamiento: "Maquinas",
		subMusculos: ["Gemelos"]
	},
	{
		id: "0026",
		nombre: "Elevacion de gemelos parado (Maquina)",
		gif: "/gifs/elevacion-gemelo-parado.jpg",
		parteDelCuerpo: "Gemelos",
		equipamiento: "Maquinas",
		subMusculos: []
	},
	{
		id: "0027",
		nombre: "Elevacion de gemelos sentado (Maquina)",
		gif: "/gifs/elevacion-gemelo-sentado.jpg",
		parteDelCuerpo: "Gemelos",
		equipamiento: "Maquinas",
		subMusculos: []
	},
	{
		id: "0063",
		nombre: "Elevacion de gemelos parado smith (Maquina)",
		gif: "/gifs/elevacion-gemelo-smith.jpg",
		parteDelCuerpo: "Gemelos",
		equipamiento: "Maquinas",
		subMusculos: []
	},
	{
		id: "0028",
		nombre: "Patada de gluteo (Maquina)",
		gif: "/gifs/patada-gluteo-maquina.jpg",
		parteDelCuerpo: "Gluteos",
		equipamiento: "Maquinas",
		subMusculos: ["Isquiotibiales"]
	},
	{
		id: "0029",
		nombre: "Patada de gluteo (Polea)",
		gif: "/gifs/patada-gluteo-polea.jpg",
		parteDelCuerpo: "Gluteos",
		equipamiento: "Polea",
		subMusculos: ["Isquiotibiales"]
	},
	{
		id: "0030",
		nombre: "Elevacion de cadera smith (Maquina)",
		gif: "/gifs/elevacion-cadera-smith.gif",
		parteDelCuerpo: "Gluteos",
		equipamiento: "Maquinas",
		subMusculos: [
			"Isquiotibiales",
			"Cuadriceps",
			"Adductores"
		]
	},
	{
		id: "0031",
		nombre: "Elevacion de cadera (Barra)",
		gif: "/gifs/elevacion-cadera-barra.jpg",
		parteDelCuerpo: "Gluteos",
		equipamiento: "Barra",
		subMusculos: [
			"Isquiotibiales",
			"Cuadriceps",
			"Adductores"
		]
	},
	{
		id: "0057",
		nombre: "Hiperextension (Maquina)",
		gif: "/gifs/hiperextension-maq.jpg",
		parteDelCuerpo: "Gluteos",
		equipamiento: "Maquinas",
		subMusculos: ["Isquiotibiales", "Espalda"]
	},
	{
		id: "0032",
		nombre: "Step up (Mancuernas)",
		gif: "/gifs/step-up-manc.gif",
		parteDelCuerpo: "Gluteos",
		equipamiento: "Mancuernas",
		subMusculos: ["Isquiotibiales", "Cuadriceps"]
	},
	{
		id: "0033",
		nombre: "Aduccion de caderas (Maquina)",
		gif: "/gifs/aducciom-cad-maq.jpg",
		parteDelCuerpo: "Adductores",
		equipamiento: "Maquinas",
		subMusculos: []
	},
	{
		id: "0034",
		nombre: "Aduccion de caderas (Polea)",
		gif: "/gifs/aduccion-cad-polea.jpg",
		parteDelCuerpo: "Adductores",
		equipamiento: "Polea",
		subMusculos: []
	},
	{
		id: "0035",
		nombre: "Abduccion de caderas (Maquina)",
		gif: "/gifs/abduccion-cad-maq.jpg",
		parteDelCuerpo: "Abductores",
		equipamiento: "Maquinas",
		subMusculos: []
	},
	{
		id: "0036",
		nombre: "Abduccion de caderas (Polea)",
		gif: "/gifs/abduccion-cad-polea.jpg",
		parteDelCuerpo: "Abductores",
		equipamiento: "Polea",
		subMusculos: []
	},
	{
		id: "0058",
		nombre: "Abduccion de caderas de pie (Maquina)",
		gif: "/gifs/abduccion-cad-maq-pie.jpg",
		parteDelCuerpo: "Abductores",
		equipamiento: "Maquinas",
		subMusculos: ["Gluteos"]
	},
	{
		id: "0037",
		nombre: "Vuelos posteriores (Mancuernas)",
		gif: "/gifs/vuelos-poste-manc.gif",
		parteDelCuerpo: "Hombros",
		equipamiento: "Mancuernas",
		subMusculos: ["Trapecio"]
	},
	{
		id: "0038",
		nombre: "Vuelos posteriores (Maquina)",
		gif: "/gifs/vuelos-poste-maq.gif",
		parteDelCuerpo: "Hombros",
		equipamiento: "Maquinas",
		subMusculos: ["Espalda"]
	},
	{
		id: "0039",
		nombre: "Vuelos posteriores (Polea)",
		gif: "/gifs/vuelos-poste-polea.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Polea",
		subMusculos: ["Espalda"]
	},
	{
		id: "0040",
		nombre: "Vuelos posteriores invertido (Mancuernas)",
		gif: "/gifs/vuelos-poste-invertido.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Mancuernas",
		subMusculos: ["Espalda"]
	},
	{
		id: "0041",
		nombre: "Elevacion lateral sentado (Maquina)",
		gif: "/gifs/elevaciones-lat-maq.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Maquinas",
		subMusculos: []
	},
	{
		id: "0042",
		nombre: "Elevacion lateral parado (Maquina)",
		gif: "/gifs/elevaciones-lat-p-maq.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Maquinas",
		subMusculos: []
	},
	{
		id: "0043",
		nombre: "Elevacion lateral (Mancuernas)",
		gif: "/gifs/elevaciones-lat-manc.gif",
		parteDelCuerpo: "Hombros",
		equipamiento: "Mancuernas",
		subMusculos: []
	},
	{
		id: "0044",
		nombre: "Elevacion lateral (Polea)",
		gif: "/gifs/elevaciones-lat-polea.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Polea",
		subMusculos: []
	},
	{
		id: "0045",
		nombre: "Elevacion lateral a un brazo (Polea)",
		gif: "/gifs/elevaciones-lat-uno-polea.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Polea",
		subMusculos: []
	},
	{
		id: "0046",
		nombre: "Press militar (Maquina)",
		gif: "/gifs/press-militar-maq.gif",
		parteDelCuerpo: "Hombros",
		equipamiento: "Maquinas",
		subMusculos: ["Triceps"]
	},
	{
		id: "0047",
		nombre: "Press militar parado (Mancuernas)",
		gif: "/gifs/press-militar-mac-p.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Mancuernas",
		subMusculos: ["Triceps"]
	},
	{
		id: "0048",
		nombre: "Press militar sentado (Mancuernas)",
		gif: "/gifs/press-militar-mac-s.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Mancuernas",
		subMusculos: ["Triceps"]
	},
	{
		id: "0049",
		nombre: "Press militar parado (Barra)",
		gif: "/gifs/press-militar-b-p.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Barra",
		subMusculos: ["Triceps", "Abdominales"]
	},
	{
		id: "0050",
		nombre: "Press militar sentado (Barra)",
		gif: "/gifs/press-militar-b-s.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Barra",
		subMusculos: ["Triceps"]
	},
	{
		id: "0065",
		nombre: "Press militar sentado smith (Maquina)",
		gif: "/gifs/press-militar-s-smith.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Maquinas",
		subMusculos: ["Triceps"]
	},
	{
		id: "0051",
		nombre: "Tiron a la cara (Polea)",
		gif: "/gifs/face-pull.jpg",
		parteDelCuerpo: "Hombros",
		equipamiento: "Polea",
		subMusculos: ["Espalda"]
	},
	{
		id: "0052",
		nombre: "Elevacion de piernas",
		gif: "/gifs/elevacion-piernas.gif",
		parteDelCuerpo: "Abdominales",
		equipamiento: "P. corporal",
		subMusculos: []
	},
	{
		id: "0053",
		nombre: "Abdominales cortos (Peso)",
		gif: "/gifs/abd-cortos-p.jpg",
		parteDelCuerpo: "Abdominales",
		equipamiento: "Mancuernas",
		subMusculos: []
	},
	{
		id: "0054",
		nombre: "Plancha",
		gif: "/gifs/plancha.jpg",
		parteDelCuerpo: "Abdominales",
		equipamiento: "P. corporal",
		subMusculos: [],
		esTiempo: true
	},
	{
		id: "0059",
		nombre: "Rueda abdominal",
		gif: "/gifs/rueda-abd.jpg",
		parteDelCuerpo: "Abdominales",
		equipamiento: "P. corporal",
		subMusculos: ["Hombros"]
	}
];
var MUSCLE_LABEL = {
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
	cardio: "Cardio"
};
var LEG_SUB_MUSCLES = /* @__PURE__ */ new Set([
	"cuadriceps",
	"isquiotibiales",
	"gemelos",
	"aductores",
	"abductores"
]);
/** True when the muscle is trained as part of the lower body. */
function isLegMuscle(muscle) {
	return LEG_SUB_MUSCLES.has(muscle);
}
var EQUIPMENT_LABEL = {
	barra: "Barra",
	mancuernas: "Mancuernas",
	maquina: "Máquina",
	"peso-corporal": "Peso corporal",
	kettlebell: "Kettlebell",
	polea: "Polea",
	banco: "Banco"
};
var EXERCISES = [
	{
		id: "press-banca",
		name: "Press de banca",
		muscle: "pecho",
		secondary: ["triceps", "hombros"],
		equipment: "barra",
		cues: [
			"Escápulas juntas",
			"Pies firmes",
			"Barra al pecho medio"
		],
		defaultSets: 4,
		defaultReps: 8,
		restSec: 150,
		compound: true
	},
	{
		id: "press-inclinado",
		name: "Press inclinado",
		muscle: "pecho",
		secondary: ["hombros", "triceps"],
		equipment: "barra",
		cues: [
			"Banco a 30°",
			"Recorrido controlado",
			"No rebotar"
		],
		defaultSets: 4,
		defaultReps: 8,
		restSec: 120,
		compound: true
	},
	{
		id: "press-mancuernas",
		name: "Press con mancuernas",
		muscle: "pecho",
		secondary: ["triceps"],
		equipment: "mancuernas",
		cues: [
			"Muñecas neutras",
			"Rango amplio",
			"Pausa arriba"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 90,
		compound: true
	},
	{
		id: "aperturas",
		name: "Aperturas",
		muscle: "pecho",
		equipment: "mancuernas",
		cues: [
			"Codo suave",
			"Estirar sin dolor",
			"Apriete al cierre"
		],
		defaultSets: 3,
		defaultReps: 12,
		restSec: 60,
		compound: false
	},
	{
		id: "fondos",
		name: "Fondos",
		muscle: "pecho",
		secondary: ["triceps"],
		equipment: "peso-corporal",
		cues: [
			"Torso levemente inclinado",
			"Hombros abajo",
			"Rango cómodo"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 90,
		compound: true
	},
	{
		id: "cruce-poleas",
		name: "Cruce de poleas",
		muscle: "pecho",
		equipment: "polea",
		cues: [
			"Paso estable",
			"Codos altos",
			"Apriete de 1s"
		],
		defaultSets: 3,
		defaultReps: 12,
		restSec: 60,
		compound: false
	},
	{
		id: "dominadas",
		name: "Dominadas",
		muscle: "espalda",
		secondary: ["biceps"],
		equipment: "peso-corporal",
		cues: [
			"Hombros lejos de las orejas",
			"Pecho a la barra",
			"Bajada lenta"
		],
		defaultSets: 4,
		defaultReps: 6,
		restSec: 150,
		compound: true
	},
	{
		id: "jalon",
		name: "Jalón al pecho",
		muscle: "espalda",
		secondary: ["biceps"],
		equipment: "polea",
		cues: [
			"Pecho alto",
			"Tirar con los codos",
			"No balancear"
		],
		defaultSets: 4,
		defaultReps: 10,
		restSec: 90,
		compound: true
	},
	{
		id: "remo-barra",
		name: "Remo con barra",
		muscle: "espalda",
		secondary: ["biceps"],
		equipment: "barra",
		cues: [
			"Espalda neutra",
			"Barra al ombligo",
			"Pausa 1s"
		],
		defaultSets: 4,
		defaultReps: 8,
		restSec: 120,
		compound: true
	},
	{
		id: "remo-mancuerna",
		name: "Remo con mancuerna",
		muscle: "espalda",
		secondary: ["biceps"],
		equipment: "mancuernas",
		cues: [
			"Mano y rodilla en banco",
			"Codo pegado",
			"Sin rotar el torso"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 75,
		compound: true
	},
	{
		id: "peso-muerto",
		name: "Peso muerto",
		muscle: "espalda",
		secondary: ["piernas", "gluteos"],
		equipment: "barra",
		cues: [
			"Barra pegada",
			"Dorsal activo",
			"Caderas atrás"
		],
		defaultSets: 4,
		defaultReps: 5,
		restSec: 180,
		compound: true
	},
	{
		id: "face-pull",
		name: "Face pull",
		muscle: "espalda",
		secondary: ["hombros"],
		equipment: "polea",
		cues: [
			"Cuerda a la cara",
			"Rotación externa",
			"Escápulas juntas"
		],
		defaultSets: 3,
		defaultReps: 15,
		restSec: 45,
		compound: false
	},
	{
		id: "press-militar",
		name: "Press militar",
		muscle: "hombros",
		secondary: ["triceps"],
		equipment: "barra",
		cues: [
			"Core cerrado",
			"Cabeza atrás al subir",
			"No hiperextender"
		],
		defaultSets: 4,
		defaultReps: 6,
		restSec: 150,
		compound: true
	},
	{
		id: "press-hombro-mancuernas",
		name: "Press de hombro",
		muscle: "hombros",
		secondary: ["triceps"],
		equipment: "mancuernas",
		cues: [
			"Muñecas sobre el codo",
			"Recorrido completo",
			"Sin impulso"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 90,
		compound: true
	},
	{
		id: "laterales",
		name: "Elevaciones laterales",
		muscle: "hombros",
		equipment: "mancuernas",
		cues: [
			"Meñique levemente arriba",
			"Sin trapecio",
			"Control al bajar"
		],
		defaultSets: 4,
		defaultReps: 12,
		restSec: 45,
		compound: false
	},
	{
		id: "pajaros",
		name: "Pájaros",
		muscle: "hombros",
		secondary: ["espalda"],
		equipment: "mancuernas",
		cues: [
			"Pecho adelante",
			"Pulgares ligeramente in",
			"Apriete posterior"
		],
		defaultSets: 3,
		defaultReps: 12,
		restSec: 45,
		compound: false
	},
	{
		id: "sentadilla",
		name: "Sentadilla",
		muscle: "piernas",
		secondary: ["gluteos", "core"],
		equipment: "barra",
		cues: [
			"Rodillas en línea",
			"Pecho alto",
			"Profundidad controlada"
		],
		defaultSets: 4,
		defaultReps: 6,
		restSec: 180,
		compound: true
	},
	{
		id: "prensa",
		name: "Prensa",
		muscle: "piernas",
		secondary: ["gluteos"],
		equipment: "maquina",
		cues: [
			"Pies medios",
			"No bloquear",
			"Rango sin despegar lumbar"
		],
		defaultSets: 4,
		defaultReps: 10,
		restSec: 120,
		compound: true
	},
	{
		id: "zancadas",
		name: "Zancadas",
		muscle: "piernas",
		secondary: ["gluteos"],
		equipment: "mancuernas",
		cues: [
			"Paso largo",
			"Torso erguido",
			"Rodilla estable"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 75,
		compound: true
	},
	{
		id: "bulgara",
		name: "Sentadilla búlgara",
		muscle: "piernas",
		secondary: ["gluteos"],
		equipment: "mancuernas",
		cues: [
			"Pie atrasero ligero",
			"Tibia vertical",
			"Bajada lenta"
		],
		defaultSets: 3,
		defaultReps: 8,
		restSec: 90,
		compound: true
	},
	{
		id: "extension-cuad",
		name: "Extensión de cuádriceps",
		muscle: "piernas",
		equipment: "maquina",
		cues: [
			"Pausa arriba",
			"Sin balanceo",
			"Control total"
		],
		defaultSets: 3,
		defaultReps: 12,
		restSec: 60,
		compound: false
	},
	{
		id: "curl-femoral",
		name: "Curl femoral",
		muscle: "piernas",
		equipment: "maquina",
		cues: [
			"Cadera pegada",
			"Apriete 1s",
			"Estirar sin rebotar"
		],
		defaultSets: 3,
		defaultReps: 12,
		restSec: 60,
		compound: false
	},
	{
		id: "rumano",
		name: "Peso muerto rumano",
		muscle: "piernas",
		secondary: ["gluteos", "espalda"],
		equipment: "barra",
		cues: [
			"Caderas atrás",
			"Barra pegada",
			"Rodillas suaves"
		],
		defaultSets: 3,
		defaultReps: 8,
		restSec: 120,
		compound: true
	},
	{
		id: "hip-thrust",
		name: "Hip thrust",
		muscle: "gluteos",
		secondary: ["piernas"],
		equipment: "barra",
		cues: [
			"Mentón metido",
			"Apriete arriba",
			"Costillas abajo"
		],
		defaultSets: 4,
		defaultReps: 8,
		restSec: 90,
		compound: true
	},
	{
		id: "gemelos",
		name: "Elevación de gemelos",
		muscle: "piernas",
		equipment: "maquina",
		cues: [
			"Pausa arriba",
			"Estirar abajo",
			"Sin rebotar"
		],
		defaultSets: 4,
		defaultReps: 12,
		restSec: 45,
		compound: false
	},
	{
		id: "curl-biceps",
		name: "Curl de bíceps",
		muscle: "biceps",
		equipment: "barra",
		cues: [
			"Codos fijos",
			"Sin balanceo",
			"Bajada de 3s"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 60,
		compound: false
	},
	{
		id: "curl-martillo",
		name: "Curl martillo",
		muscle: "biceps",
		equipment: "mancuernas",
		cues: [
			"Agarre neutro",
			"Hombros quietos",
			"Rango completo"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 60,
		compound: false
	},
	{
		id: "extension-triceps",
		name: "Extensión de tríceps",
		muscle: "triceps",
		equipment: "polea",
		cues: [
			"Codos pegados",
			"Solo antebrazo",
			"Apriete abajo"
		],
		defaultSets: 3,
		defaultReps: 12,
		restSec: 45,
		compound: false
	},
	{
		id: "press-frances",
		name: "Press francés",
		muscle: "triceps",
		equipment: "barra",
		cues: [
			"Codos al techo",
			"Bajar a la frente",
			"Sin abrir"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 75,
		compound: false
	},
	{
		id: "plancha",
		name: "Plancha",
		muscle: "core",
		equipment: "peso-corporal",
		cues: [
			"Glúteo activo",
			"Costillas cerradas",
			"Cuello largo"
		],
		defaultSets: 3,
		defaultReps: 45,
		restSec: 45,
		compound: false
	},
	{
		id: "elevacion-piernas",
		name: "Elevación de piernas",
		muscle: "core",
		equipment: "peso-corporal",
		cues: [
			"Lumbar pegada",
			"Subir con control",
			"No balancear"
		],
		defaultSets: 3,
		defaultReps: 12,
		restSec: 45,
		compound: false
	},
	{
		id: "crunch",
		name: "Crunch",
		muscle: "core",
		equipment: "peso-corporal",
		cues: [
			"Exhalar al subir",
			"Mentón neutro",
			"Rango corto"
		],
		defaultSets: 3,
		defaultReps: 15,
		restSec: 30,
		compound: false
	},
	{
		id: "pallof",
		name: "Pallof press",
		muscle: "core",
		equipment: "polea",
		cues: [
			"Anti-rotación",
			"Caderas cuadradas",
			"Brazos largos"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 45,
		compound: false
	},
	{
		id: "russian-twist",
		name: "Russian twist",
		muscle: "core",
		equipment: "peso-corporal",
		cues: [
			"Pecho alto",
			"Girar desde el torso",
			"Talones ligeros"
		],
		defaultSets: 3,
		defaultReps: 16,
		restSec: 30,
		compound: false
	},
	{
		id: "farmer",
		name: "Farmer carry",
		muscle: "core",
		secondary: ["hombros"],
		equipment: "mancuernas",
		cues: [
			"Hombros abajo",
			"Pasos cortos",
			"Costillas cerradas"
		],
		defaultSets: 3,
		defaultReps: 40,
		restSec: 60,
		compound: true
	},
	{
		id: "kb-swing",
		name: "Swing de kettlebell",
		muscle: "gluteos",
		secondary: ["espalda", "core"],
		equipment: "kettlebell",
		cues: [
			"Bisagra, no sentadilla",
			"Snap de cadera",
			"Brazos relajados"
		],
		defaultSets: 4,
		defaultReps: 12,
		restSec: 60,
		compound: true
	},
	{
		id: "remo-erg",
		name: "Remo máquina cardio",
		muscle: "cardio",
		equipment: "maquina",
		cues: [
			"Piernas-torso-brazos",
			"Ritmo constante",
			"No encorvar"
		],
		defaultSets: 1,
		defaultReps: 10,
		restSec: 0,
		compound: true
	},
	{
		id: "burpees",
		name: "Burpees",
		muscle: "cardio",
		equipment: "peso-corporal",
		cues: [
			"Pecho al suelo",
			"Salto completo",
			"Ritmo sostenible"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 45,
		compound: true
	},
	{
		id: "sentadilla-goblet",
		name: "Sentadilla goblet",
		muscle: "piernas",
		secondary: ["gluteos", "core"],
		equipment: "kettlebell",
		cues: [
			"Codos adentro",
			"Talones firmes",
			"Torso alto"
		],
		defaultSets: 3,
		defaultReps: 12,
		restSec: 75,
		compound: true
	},
	{
		id: "flexiones",
		name: "Flexiones",
		muscle: "pecho",
		secondary: ["triceps", "core"],
		equipment: "peso-corporal",
		cues: [
			"Cuerpo en línea",
			"Codos 45°",
			"Pecho cerca del suelo"
		],
		defaultSets: 3,
		defaultReps: 12,
		restSec: 60,
		compound: true
	}
];
/** Strips accents, lowercases and collapses non-alphanumerics to single spaces. */
function normalizeToken(raw) {
	return raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
var MUSCLE_BY_TOKEN = {
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
	femoral: "isquiotibiales"
};
/** Best-effort mapping from the catalogue's free-text body part to a muscle. */
function asMuscle(raw) {
	return MUSCLE_BY_TOKEN[normalizeToken(raw)] ?? "core";
}
/** Same, but returns undefined for entries the catalogue leaves empty. */
function asOptionalMuscle(raw) {
	const token = normalizeToken(raw);
	if (!token) return void 0;
	return MUSCLE_BY_TOKEN[token];
}
var EQUIPMENT_BY_TOKEN = {
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
	banco: "banco"
};
function asEquipment(raw) {
	return EQUIPMENT_BY_TOKEN[normalizeToken(raw)] ?? "peso-corporal";
}
/** Removes duplicated equipment labels from catalogue names, e.g. "(Polea)". */
function cleanExerciseName(raw) {
	return raw.replace(/\s*\((?:barra|mancuernas?|maquina|maquinas|polea|peso|p\.?\s*corporal)\)\s*$/i, "").trim();
}
/**
* Slots the owner's catalogue fills, laid over the curated defaults so a
* movement keeps sensible sets/reps/rest instead of inventing them.
*/
var LOCAL_DEFAULTS = {
	pecho: {
		sets: 4,
		reps: 8,
		restSec: 120,
		compound: true
	},
	espalda: {
		sets: 4,
		reps: 10,
		restSec: 90,
		compound: true
	},
	hombros: {
		sets: 3,
		reps: 12,
		restSec: 60,
		compound: false
	},
	biceps: {
		sets: 3,
		reps: 10,
		restSec: 60,
		compound: false
	},
	triceps: {
		sets: 3,
		reps: 12,
		restSec: 45,
		compound: false
	},
	cuadriceps: {
		sets: 4,
		reps: 8,
		restSec: 120,
		compound: true
	},
	isquiotibiales: {
		sets: 3,
		reps: 12,
		restSec: 60,
		compound: false
	},
	gemelos: {
		sets: 4,
		reps: 12,
		restSec: 45,
		compound: false
	},
	gluteos: {
		sets: 3,
		reps: 10,
		restSec: 90,
		compound: true
	},
	aductores: {
		sets: 3,
		reps: 12,
		restSec: 45,
		compound: false
	},
	abductores: {
		sets: 3,
		reps: 12,
		restSec: 45,
		compound: false
	},
	core: {
		sets: 3,
		reps: 12,
		restSec: 45,
		compound: false
	},
	cardio: {
		sets: 3,
		reps: 10,
		restSec: 45,
		compound: true
	},
	piernas: {
		sets: 3,
		reps: 10,
		restSec: 90,
		compound: true
	}
};
/** Compound movements deserve a longer rest than the isolation default. */
function withCompoundRest(base, name) {
	const t = normalizeToken(name);
	if (!(t.includes("sentadilla") || t.includes("prensa") || t.includes("peso muerto") || t.includes("press de banca") || t.includes("remo") || t.includes("jalon") || t.includes("estocadas") || t.includes("elevacion de cadera") || t.includes("step up"))) return base;
	return {
		...base,
		compound: true,
		restSec: Math.max(base.restSec, 120)
	};
}
/** Turns one catalogue row into the app's `Exercise` shape. */
function fromLocal(ej) {
	const muscle = asMuscle(ej.parteDelCuerpo);
	const secondary = Array.from(new Set(ej.subMusculos.map(asOptionalMuscle).filter((m) => Boolean(m && m !== muscle))));
	const rest = withCompoundRest(LOCAL_DEFAULTS[muscle], ej.nombre);
	return {
		id: `ex-${ej.id}`,
		name: cleanExerciseName(ej.nombre),
		muscle,
		...secondary.length ? { secondary } : {},
		equipment: asEquipment(ej.equipamiento),
		cues: [],
		defaultSets: rest.sets,
		defaultReps: ej.esTiempo ? 45 : rest.reps,
		restSec: rest.restSec,
		compound: rest.compound,
		...ej.gif ? { gif: ej.gif } : {},
		...ej.esTiempo ? { esTiempo: true } : {}
	};
}
var LOCAL_EXERCISES = ejerciciosLocal.map(fromLocal);
function uniqueExercises(exercises) {
	const seen = /* @__PURE__ */ new Set();
	return exercises.filter((exercise) => {
		const key = `${normalizeToken(exercise.name)}|${exercise.muscle}|${exercise.equipment}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
var ALL_EXERCISES = uniqueExercises([...LOCAL_EXERCISES, ...EXERCISES]);
var byId = new Map(ALL_EXERCISES.map((e) => [e.id, e]));
function getExercise(id) {
	return byId.get(id) ?? ALL_EXERCISES[0];
}
/**
* Search across both catalogues. The owner's list is listed first so the
* movements actually present in their gym lead the results.
*/
function searchExercises(query, muscle) {
	const q = normalizeToken(query);
	return ALL_EXERCISES.filter((e) => {
		const muscleOk = !muscle || muscle === "todos" || e.muscle === muscle || isLegMuscle(muscle) && isLegMuscle(e.muscle);
		if (!q) return muscleOk;
		const hay = normalizeToken(`${e.name} ${MUSCLE_LABEL[e.muscle]} ${EQUIPMENT_LABEL[e.equipment]}`);
		return muscleOk && hay.includes(q);
	});
}
var COVER_SRC = {
	hero: "/media/gym-hero.jpg",
	barbell: "/media/barbell.jpg",
	kettlebell: "/media/kettlebell.jpg",
	dumbbells: "/media/dumbbells.jpg"
};
var ROUTINES = [
	{
		id: "push",
		name: "Empuje",
		focus: "Pecho, hombros, tríceps",
		durationMin: 55,
		level: "intermedio",
		cover: "barbell",
		exercises: [
			{
				exerciseId: "press-banca",
				sets: 4,
				reps: 8,
				restSec: 150
			},
			{
				exerciseId: "press-inclinado",
				sets: 3,
				reps: 8,
				restSec: 120
			},
			{
				exerciseId: "press-hombro-mancuernas",
				sets: 3,
				reps: 10,
				restSec: 90
			},
			{
				exerciseId: "laterales",
				sets: 3,
				reps: 12,
				restSec: 45
			},
			{
				exerciseId: "fondos",
				sets: 3,
				reps: 8,
				restSec: 90
			},
			{
				exerciseId: "extension-triceps",
				sets: 3,
				reps: 12,
				restSec: 45
			}
		]
	},
	{
		id: "pull",
		name: "Jalón",
		focus: "Espalda y bíceps",
		durationMin: 55,
		level: "intermedio",
		cover: "dumbbells",
		exercises: [
			{
				exerciseId: "peso-muerto",
				sets: 3,
				reps: 5,
				restSec: 180
			},
			{
				exerciseId: "dominadas",
				sets: 4,
				reps: 6,
				restSec: 150
			},
			{
				exerciseId: "remo-barra",
				sets: 4,
				reps: 8,
				restSec: 120
			},
			{
				exerciseId: "jalon",
				sets: 3,
				reps: 10,
				restSec: 90
			},
			{
				exerciseId: "face-pull",
				sets: 3,
				reps: 15,
				restSec: 45
			},
			{
				exerciseId: "curl-biceps",
				sets: 3,
				reps: 10,
				restSec: 60
			}
		]
	},
	{
		id: "legs",
		name: "Piernas",
		focus: "Cuádriceps, femorales, glúteo",
		durationMin: 60,
		level: "intermedio",
		cover: "hero",
		exercises: [
			{
				exerciseId: "sentadilla",
				sets: 4,
				reps: 6,
				restSec: 180
			},
			{
				exerciseId: "rumano",
				sets: 3,
				reps: 8,
				restSec: 120
			},
			{
				exerciseId: "prensa",
				sets: 3,
				reps: 10,
				restSec: 90
			},
			{
				exerciseId: "bulgara",
				sets: 3,
				reps: 8,
				restSec: 90
			},
			{
				exerciseId: "curl-femoral",
				sets: 3,
				reps: 12,
				restSec: 60
			},
			{
				exerciseId: "gemelos",
				sets: 4,
				reps: 12,
				restSec: 45
			}
		]
	},
	{
		id: "upper",
		name: "Torso",
		focus: "Empuje y jalón en un bloque",
		durationMin: 50,
		level: "intermedio",
		cover: "dumbbells",
		exercises: [
			{
				exerciseId: "press-banca",
				sets: 4,
				reps: 8,
				restSec: 120
			},
			{
				exerciseId: "remo-barra",
				sets: 4,
				reps: 8,
				restSec: 120
			},
			{
				exerciseId: "press-militar",
				sets: 3,
				reps: 6,
				restSec: 120
			},
			{
				exerciseId: "jalon",
				sets: 3,
				reps: 10,
				restSec: 90
			},
			{
				exerciseId: "laterales",
				sets: 3,
				reps: 12,
				restSec: 45
			},
			{
				exerciseId: "curl-martillo",
				sets: 2,
				reps: 10,
				restSec: 45
			}
		]
	},
	{
		id: "lower",
		name: "Inferior",
		focus: "Fuerza de tren inferior",
		durationMin: 50,
		level: "intermedio",
		cover: "kettlebell",
		exercises: [
			{
				exerciseId: "sentadilla",
				sets: 4,
				reps: 6,
				restSec: 180
			},
			{
				exerciseId: "rumano",
				sets: 3,
				reps: 8,
				restSec: 120
			},
			{
				exerciseId: "hip-thrust",
				sets: 3,
				reps: 8,
				restSec: 90
			},
			{
				exerciseId: "zancadas",
				sets: 3,
				reps: 10,
				restSec: 75
			},
			{
				exerciseId: "plancha",
				sets: 3,
				reps: 40,
				restSec: 45
			}
		]
	},
	{
		id: "full-a",
		name: "Cuerpo completo A",
		focus: "Patrones básicos",
		durationMin: 45,
		level: "principiante",
		cover: "hero",
		exercises: [
			{
				exerciseId: "sentadilla-goblet",
				sets: 3,
				reps: 10,
				restSec: 90
			},
			{
				exerciseId: "press-mancuernas",
				sets: 3,
				reps: 10,
				restSec: 90
			},
			{
				exerciseId: "remo-mancuerna",
				sets: 3,
				reps: 10,
				restSec: 75
			},
			{
				exerciseId: "laterales",
				sets: 3,
				reps: 12,
				restSec: 45
			},
			{
				exerciseId: "plancha",
				sets: 3,
				reps: 30,
				restSec: 45
			}
		]
	},
	{
		id: "full-b",
		name: "Cuerpo completo B",
		focus: "Bisagra, empuje, core",
		durationMin: 45,
		level: "principiante",
		cover: "kettlebell",
		exercises: [
			{
				exerciseId: "rumano",
				sets: 3,
				reps: 8,
				restSec: 120
			},
			{
				exerciseId: "flexiones",
				sets: 3,
				reps: 10,
				restSec: 75
			},
			{
				exerciseId: "jalon",
				sets: 3,
				reps: 10,
				restSec: 90
			},
			{
				exerciseId: "hip-thrust",
				sets: 3,
				reps: 10,
				restSec: 75
			},
			{
				exerciseId: "pallof",
				sets: 3,
				reps: 10,
				restSec: 45
			}
		]
	},
	{
		id: "full-c",
		name: "Cuerpo completo C",
		focus: "Densidad y control",
		durationMin: 40,
		level: "principiante",
		cover: "dumbbells",
		exercises: [
			{
				exerciseId: "prensa",
				sets: 3,
				reps: 12,
				restSec: 90
			},
			{
				exerciseId: "press-hombro-mancuernas",
				sets: 3,
				reps: 10,
				restSec: 75
			},
			{
				exerciseId: "remo-mancuerna",
				sets: 3,
				reps: 10,
				restSec: 75
			},
			{
				exerciseId: "kb-swing",
				sets: 3,
				reps: 12,
				restSec: 60
			},
			{
				exerciseId: "crunch",
				sets: 3,
				reps: 15,
				restSec: 30
			}
		]
	},
	{
		id: "five-by-five",
		name: "Fuerza 5×5",
		focus: "Los tres grandes",
		durationMin: 50,
		level: "intermedio",
		cover: "barbell",
		exercises: [
			{
				exerciseId: "sentadilla",
				sets: 5,
				reps: 5,
				restSec: 180
			},
			{
				exerciseId: "press-banca",
				sets: 5,
				reps: 5,
				restSec: 180
			},
			{
				exerciseId: "remo-barra",
				sets: 5,
				reps: 5,
				restSec: 150
			}
		]
	},
	{
		id: "core-express",
		name: "Core express",
		focus: "15 minutos de tronco",
		durationMin: 15,
		level: "principiante",
		cover: "kettlebell",
		exercises: [
			{
				exerciseId: "plancha",
				sets: 3,
				reps: 40,
				restSec: 30
			},
			{
				exerciseId: "elevacion-piernas",
				sets: 3,
				reps: 12,
				restSec: 30
			},
			{
				exerciseId: "pallof",
				sets: 3,
				reps: 10,
				restSec: 30
			},
			{
				exerciseId: "russian-twist",
				sets: 3,
				reps: 16,
				restSec: 30
			}
		]
	},
	{
		id: "gluteos",
		name: "Glúteo y posterior",
		focus: "Cadena posterior",
		durationMin: 40,
		level: "intermedio",
		cover: "hero",
		exercises: [
			{
				exerciseId: "hip-thrust",
				sets: 4,
				reps: 8,
				restSec: 90
			},
			{
				exerciseId: "rumano",
				sets: 3,
				reps: 8,
				restSec: 120
			},
			{
				exerciseId: "bulgara",
				sets: 3,
				reps: 8,
				restSec: 75
			},
			{
				exerciseId: "kb-swing",
				sets: 3,
				reps: 12,
				restSec: 60
			},
			{
				exerciseId: "curl-femoral",
				sets: 3,
				reps: 12,
				restSec: 45
			}
		]
	},
	{
		id: "hiit",
		name: "Condición",
		focus: "Densidad y pulso",
		durationMin: 25,
		level: "avanzado",
		cover: "kettlebell",
		exercises: [
			{
				exerciseId: "kb-swing",
				sets: 5,
				reps: 15,
				restSec: 45
			},
			{
				exerciseId: "burpees",
				sets: 4,
				reps: 8,
				restSec: 45
			},
			{
				exerciseId: "farmer",
				sets: 3,
				reps: 40,
				restSec: 60
			},
			{
				exerciseId: "flexiones",
				sets: 3,
				reps: 12,
				restSec: 45
			}
		]
	}
];
var PLAN = {
	"fuerza-3": [
		"five-by-five",
		"full-b",
		"five-by-five"
	],
	"fuerza-4": [
		"five-by-five",
		"pull",
		"five-by-five",
		"legs"
	],
	"fuerza-5": [
		"five-by-five",
		"push",
		"legs",
		"pull",
		"five-by-five"
	],
	"fuerza-6": [
		"push",
		"pull",
		"legs",
		"push",
		"pull",
		"legs"
	],
	"hipertrofia-3": [
		"full-a",
		"full-b",
		"full-c"
	],
	"hipertrofia-4": [
		"upper",
		"lower",
		"upper",
		"lower"
	],
	"hipertrofia-5": [
		"push",
		"pull",
		"legs",
		"upper",
		"lower"
	],
	"hipertrofia-6": [
		"push",
		"pull",
		"legs",
		"push",
		"pull",
		"legs"
	],
	"definicion-3": [
		"full-a",
		"hiit",
		"full-c"
	],
	"definicion-4": [
		"upper",
		"hiit",
		"lower",
		"core-express"
	],
	"definicion-5": [
		"push",
		"pull",
		"hiit",
		"legs",
		"core-express"
	],
	"definicion-6": [
		"push",
		"pull",
		"legs",
		"hiit",
		"upper",
		"core-express"
	],
	"resistencia-3": [
		"full-a",
		"hiit",
		"full-c"
	],
	"resistencia-4": [
		"full-a",
		"hiit",
		"full-b",
		"core-express"
	],
	"resistencia-5": [
		"full-a",
		"hiit",
		"full-b",
		"core-express",
		"full-c"
	],
	"resistencia-6": [
		"full-a",
		"hiit",
		"full-b",
		"hiit",
		"full-c",
		"core-express"
	]
};
function getRoutine(id, extras = []) {
	return extras.find((r) => r.id === id) ?? ROUTINES.find((r) => r.id === id);
}
function planFor(goal, days) {
	return PLAN[`${goal}-${days}`] ?? PLAN["hipertrofia-4"];
}
function filterRoutines(level) {
	if (level === "principiante") return ROUTINES.filter((r) => r.level !== "avanzado");
	return ROUTINES;
}
var GOAL_LABEL = {
	fuerza: "Fuerza",
	hipertrofia: "Hipertrofia",
	definicion: "Definición",
	resistencia: "Resistencia"
};
var LEVEL_LABEL = {
	principiante: "Principiante",
	intermedio: "Intermedio",
	avanzado: "Avanzado"
};
function roundTo(n, step) {
	return Math.round(n / step) * step;
}
function toDisplayWeight(kg, unit) {
	if (unit === "kg") return roundTo(kg, .5);
	return roundTo(kg * 2.20462262, 1);
}
function fromDisplayWeight(value, unit) {
	if (unit === "kg") return value;
	return value / 2.20462262;
}
function weightStep(unit) {
	return unit === "kg" ? 2.5 : 5;
}
function formatWeight(kg, unit, withUnit = true) {
	const v = toDisplayWeight(kg, unit);
	const text = Number.isInteger(v) ? String(v) : v.toFixed(1);
	return withUnit ? `${text} ${unit}` : text;
}
function formatVolume(kg, unit) {
	const v = unit === "kg" ? kg : kg * 2.20462262;
	if (v >= 1e3) return `${(v / 1e3).toFixed(1)} t`;
	return `${Math.round(v)} ${unit}`;
}
function formatDuration(ms) {
	const total = Math.max(0, Math.round(ms / 1e3));
	const h = Math.floor(total / 3600);
	const m = Math.floor(total % 3600 / 60);
	const s = total % 60;
	if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
	return `${m}:${String(s).padStart(2, "0")}`;
}
function formatClock(totalSec) {
	const n = Math.max(0, Math.ceil(totalSec));
	const m = Math.floor(n / 60);
	const s = n % 60;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function longDate(ts = Date.now()) {
	return format(ts, "EEEE d MMMM", { locale: es });
}
function weekStart(ts = Date.now()) {
	return startOfWeek(ts, { weekStartsOn: 1 }).getTime();
}
function e1rm(weightKg, reps) {
	if (reps <= 1) return weightKg;
	return weightKg * (1 + reps / 30);
}
var GENDER_LABEL = {
	hombre: "Hombre",
	mujer: "Mujer",
	otro: "Otro"
};
var WEEKDAY_SHORT = [
	"Lun",
	"Mar",
	"Mié",
	"Jue",
	"Vie",
	"Sáb",
	"Dom"
];
function weekdayShort(iso) {
	return WEEKDAY_SHORT[(iso - 1 + 7) % 7] ?? "";
}
var vibrationOn = true;
function setVibrationEnabled(on) {
	vibrationOn = on;
}
var ctx = null;
function getCtx() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const Ctor = window.AudioContext || window.webkitAudioContext;
		if (!Ctor) return null;
		ctx = new Ctor();
	}
	return ctx;
}
function chime(kind = "done") {
	const audio = getCtx();
	if (!audio) return;
	audio.resume();
	const now = audio.currentTime;
	(kind === "tick" ? [660] : [
		523,
		784,
		1046
	]).forEach((freq, i) => {
		const osc = audio.createOscillator();
		const gain = audio.createGain();
		osc.type = "sine";
		osc.frequency.value = freq;
		const t = now + i * .12;
		gain.gain.setValueAtTime(1e-4, t);
		gain.gain.exponentialRampToValueAtTime(.07, t + .02);
		gain.gain.exponentialRampToValueAtTime(1e-4, t + .22);
		osc.connect(gain);
		gain.connect(audio.destination);
		osc.start(t);
		osc.stop(t + .24);
	});
}
function pulse() {
	if (!vibrationOn) return;
	if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate([
		28,
		40,
		48
	]);
}
var KEY = "trainup-theme";
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	document.documentElement.dataset.theme = theme;
	const color = theme === "light" ? "#f3f4ef" : "#090a09";
	const meta = document.querySelector("meta[name=\"theme-color\"]");
	if (meta) meta.setAttribute("content", color);
	try {
		window.localStorage.setItem(KEY, theme);
	} catch {}
}
function isoWeekday(d = /* @__PURE__ */ new Date()) {
	const day = d.getDay();
	return day === 0 ? 7 : day;
}
function routinesForToday(routines, d = /* @__PURE__ */ new Date()) {
	const today = isoWeekday(d);
	return routines.filter((r) => (r.scheduleDays ?? []).includes(today));
}
async function ensureNotifyPermission() {
	if (typeof Notification === "undefined") return false;
	if (Notification.permission === "granted") return true;
	if (Notification.permission === "denied") return false;
	return await Notification.requestPermission() === "granted";
}
function fireWorkoutNotice(title, body) {
	if (typeof Notification === "undefined") return;
	if (Notification.permission !== "granted") return;
	try {
		new Notification(title, {
			body,
			silent: false
		});
	} catch {}
}
/** ms until the next occurrence of HH:MM local time. */
function msUntilHour(hhmm, now = /* @__PURE__ */ new Date()) {
	const [h, m] = hhmm.split(":").map((n) => Number(n));
	const next = new Date(now);
	next.setHours(h || 0, m || 0, 0, 0);
	if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
	return next.getTime() - now.getTime();
}
var defaultProfile = {
	name: "",
	goal: "hipertrofia",
	level: "intermedio",
	daysPerWeek: 4,
	unit: "kg",
	bodyWeightKg: 75,
	heightCm: 170,
	gender: "hombre",
	birthDate: "1995-01-01",
	onboarded: false
};
var defaultSettings = {
	theme: "dark",
	notifications: false,
	notifyHour: "08:00",
	keepAwake: true,
	vibration: true
};
var STORE_VERSION = 1;
function lastLoad(history, exerciseId) {
	for (const session of history) {
		const last = session.exercises.find((e) => e.exerciseId === exerciseId)?.sets.at(-1);
		if (last) return last;
	}
	return null;
}
function buildSession(routine, history) {
	return {
		routineId: routine.id,
		routineName: routine.name,
		startedAt: Date.now(),
		currentIndex: 0,
		restUntil: null,
		restTotalSec: 0,
		exercises: routine.exercises.map((slot) => {
			const ex = getExercise(slot.exerciseId);
			const prev = lastLoad(history, slot.exerciseId);
			const weightKg = slot.weightKg ?? prev?.weightKg ?? 0;
			const reps = slot.reps || ex.defaultReps;
			const sets = Array.from({ length: slot.sets }, () => ({
				id: uid("set"),
				reps,
				weightKg,
				completed: false
			}));
			return {
				exerciseId: slot.exerciseId,
				restSec: slot.restSec,
				notes: "",
				sets
			};
		})
	};
}
function volumeOf(session) {
	return session.exercises.reduce((sum, ex) => {
		return sum + ex.sets.reduce((s, set) => set.completed ? s + set.weightKg * set.reps : s, 0);
	}, 0);
}
function todaysRoutine(profile, history, extras) {
	const scheduled = extras.filter((r) => (r.scheduleDays ?? []).includes(isoWeekday()));
	if (scheduled[0] && !history.some((h) => isToday(h.endedAt) && h.routineId === scheduled[0].id)) return scheduled[0];
	const plan = planFor(profile.goal, profile.daysPerWeek);
	const start = weekStart();
	const doneThisWeek = history.filter((h) => h.endedAt >= start);
	if (history.some((h) => isToday(h.endedAt))) return getRoutine(plan[Math.min(doneThisWeek.length - 1, plan.length - 1)], extras) ?? getRoutine(plan[0], extras);
	return getRoutine(plan[Math.min(doneThisWeek.length, plan.length - 1)], extras);
}
function computeStreak(history) {
	if (history.length === 0) return 0;
	const days = new Set(history.map((h) => {
		const d = new Date(h.endedAt);
		return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
	}));
	let streak = 0;
	const cursor = /* @__PURE__ */ new Date();
	if (!days.has(`${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`)) cursor.setDate(cursor.getDate() - 1);
	while (days.has(`${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`)) {
		streak += 1;
		cursor.setDate(cursor.getDate() - 1);
	}
	return streak;
}
var saveTimer = null;
var persistFn = null;
function bindGymPersist(fn) {
	persistFn = fn;
}
/** Persist the current store immediately, bypassing the debounce. */
function persistNow() {
	const s = useTrain.getState();
	if (!s.profile.onboarded || !persistFn) return Promise.resolve();
	return Promise.resolve(persistFn(snapshot(s))).then(() => void 0, () => void 0);
}
function snapshot(s) {
	return {
		profile: s.profile,
		settings: s.settings,
		customRoutines: s.customRoutines,
		history: s.history,
		records: s.records,
		bodyLogs: s.bodyLogs
	};
}
function queueSave(get) {
	if (saveTimer) clearTimeout(saveTimer);
	saveTimer = setTimeout(() => {
		const s = get();
		if (!s.profile.onboarded || !persistFn) return;
		persistFn(snapshot(s)).catch(() => {});
	}, 450);
}
var useTrain = create()(persist((set, get) => ({
	hydrated: false,
	tab: "home",
	profile: defaultProfile,
	settings: defaultSettings,
	customRoutines: [],
	history: [],
	records: [],
	bodyLogs: [],
	session: null,
	lastSummary: null,
	timerMode: "descanso",
	markHydrated: () => set({ hydrated: true }),
	hydrateRemote: (snap) => {
		applyTheme(snap.settings.theme);
		setVibrationEnabled(snap.settings.vibration);
		set({
			...snap,
			hydrated: true
		});
	},
	beginFreshAccount: () => {
		applyTheme(defaultSettings.theme);
		setVibrationEnabled(defaultSettings.vibration);
		set({
			profile: defaultProfile,
			settings: defaultSettings,
			customRoutines: [],
			history: [],
			records: [],
			bodyLogs: [],
			session: null,
			lastSummary: null,
			tab: "home",
			hydrated: true
		});
	},
	setTab: (tab) => set({ tab }),
	completeOnboarding: (input) => {
		set({
			profile: {
				...input,
				onboarded: true
			},
			bodyLogs: [{
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				weightKg: input.bodyWeightKg
			}],
			tab: "home"
		});
		const s = get();
		applyTheme(s.settings.theme);
		setVibrationEnabled(s.settings.vibration);
		if (persistFn) persistFn(snapshot(s)).catch(() => {});
	},
	updateProfile: (patch) => {
		set((s) => ({ profile: {
			...s.profile,
			...patch
		} }));
		queueSave(get);
	},
	updateSettings: (patch) => {
		set((s) => {
			const settings = {
				...s.settings,
				...patch
			};
			if (patch.theme) applyTheme(patch.theme);
			if (patch.vibration != null) setVibrationEnabled(patch.vibration);
			return { settings };
		});
		queueSave(get);
	},
	startRoutine: (routine) => set((s) => ({
		session: buildSession(routine, s.history),
		lastSummary: null
	})),
	discardSession: () => set({ session: null }),
	setCurrentExercise: (index) => set((s) => s.session ? { session: {
		...s.session,
		currentIndex: index,
		restUntil: null
	} } : {}),
	updateSet: (exerciseIndex, setId, patch) => set((s) => {
		if (!s.session) return {};
		const exercises = s.session.exercises.map((ex, i) => {
			if (i !== exerciseIndex) return ex;
			return {
				...ex,
				sets: ex.sets.map((st) => st.id === setId ? {
					...st,
					...patch
				} : st)
			};
		});
		return { session: {
			...s.session,
			exercises
		} };
	}),
	toggleSet: (exerciseIndex, setId) => set((s) => {
		if (!s.session) return {};
		const target = s.session.exercises[exerciseIndex];
		if (!target) return {};
		const was = target.sets.find((st) => st.id === setId)?.completed ?? false;
		const exercises = s.session.exercises.map((ex, i) => {
			if (i !== exerciseIndex) return ex;
			return {
				...ex,
				sets: ex.sets.map((st) => st.id === setId ? {
					...st,
					completed: !st.completed
				} : st)
			};
		});
		let restUntil = s.session.restUntil;
		let restTotalSec = s.session.restTotalSec;
		let currentIndex = s.session.currentIndex;
		if (!was) {
			restUntil = Date.now() + target.restSec * 1e3;
			restTotalSec = target.restSec;
			if (exercises[exerciseIndex].sets.every((st) => st.completed) && exerciseIndex < exercises.length - 1) currentIndex = exerciseIndex + 1;
		} else restUntil = null;
		return { session: {
			...s.session,
			exercises,
			restUntil,
			restTotalSec,
			currentIndex
		} };
	}),
	addSet: (exerciseIndex) => set((s) => {
		if (!s.session) return {};
		const exercises = s.session.exercises.map((ex, i) => {
			if (i !== exerciseIndex) return ex;
			const last = ex.sets.at(-1);
			return {
				...ex,
				sets: [...ex.sets, {
					id: uid("set"),
					reps: last?.reps ?? 8,
					weightKg: last?.weightKg ?? 0,
					completed: false
				}]
			};
		});
		return { session: {
			...s.session,
			exercises
		} };
	}),
	removeSet: (exerciseIndex, setId) => set((s) => {
		if (!s.session) return {};
		const exercises = s.session.exercises.map((ex, i) => {
			if (i !== exerciseIndex) return ex;
			if (ex.sets.length <= 1) return ex;
			return {
				...ex,
				sets: ex.sets.filter((st) => st.id !== setId)
			};
		});
		return { session: {
			...s.session,
			exercises
		} };
	}),
	replaceExercise: (exerciseIndex, exerciseId) => set((s) => {
		if (!s.session) return {};
		const ex = getExercise(exerciseId);
		const prev = lastLoad(s.history, exerciseId);
		const exercises = s.session.exercises.map((item, i) => {
			if (i !== exerciseIndex) return item;
			return {
				exerciseId,
				restSec: ex.restSec,
				notes: "",
				sets: Array.from({ length: Math.max(item.sets.length, ex.defaultSets) }, () => ({
					id: uid("set"),
					reps: ex.defaultReps,
					weightKg: prev?.weightKg ?? 0,
					completed: false
				}))
			};
		});
		return { session: {
			...s.session,
			exercises,
			restUntil: null
		} };
	}),
	skipRest: () => set((s) => s.session ? { session: {
		...s.session,
		restUntil: null
	} } : {}),
	addRest: (sec) => set((s) => {
		if (!s.session) return {};
		const base = s.session.restUntil && s.session.restUntil > Date.now() ? s.session.restUntil : Date.now();
		return { session: {
			...s.session,
			restUntil: base + sec * 1e3,
			restTotalSec: s.session.restTotalSec + sec
		} };
	}),
	finishSession: () => {
		const s = get();
		if (!s.session) return null;
		const endedAt = Date.now();
		const exercises = s.session.exercises.map((ex) => ({
			exerciseId: ex.exerciseId,
			sets: ex.sets.filter((st) => st.completed && (st.weightKg > 0 || st.reps > 0)).map((st) => ({
				reps: st.reps,
				weightKg: st.weightKg
			}))
		})).filter((ex) => ex.sets.length > 0);
		const setsCompleted = exercises.reduce((n, ex) => n + ex.sets.length, 0);
		if (setsCompleted === 0) {
			set({ session: null });
			return null;
		}
		const volumeKg = volumeOf({ exercises: s.session.exercises });
		const records = [...s.records];
		const prs = [];
		for (const ex of exercises) for (const st of ex.sets) {
			const est = e1rm(st.weightKg, st.reps);
			const current = records.find((r) => r.exerciseId === ex.exerciseId);
			if (!current || est > current.e1rm + .01 || st.weightKg > current.weightKg) {
				const next = {
					exerciseId: ex.exerciseId,
					weightKg: st.weightKg,
					reps: st.reps,
					e1rm: est,
					date: new Date(endedAt).toISOString().slice(0, 10)
				};
				const idx = records.findIndex((r) => r.exerciseId === ex.exerciseId);
				if (idx >= 0) records[idx] = next;
				else records.push(next);
				if (!prs.includes(ex.exerciseId)) prs.push(ex.exerciseId);
			}
		}
		const logged = {
			id: uid("ses"),
			routineId: s.session.routineId,
			routineName: s.session.routineName,
			startedAt: s.session.startedAt,
			endedAt,
			volumeKg,
			setsCompleted,
			exercises,
			prs
		};
		set({
			session: null,
			lastSummary: logged,
			history: [logged, ...s.history].slice(0, 200),
			records,
			tab: "home"
		});
		queueSave(get);
		return logged;
	},
	saveCustomRoutine: (routine) => {
		set((s) => ({ customRoutines: [routine, ...s.customRoutines.filter((r) => r.id !== routine.id)] }));
		queueSave(get);
	},
	deleteCustomRoutine: (id) => {
		set((s) => ({ customRoutines: s.customRoutines.filter((r) => r.id !== id) }));
		queueSave(get);
	},
	addBodyLog: (weightKg) => {
		set((s) => {
			const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			return {
				bodyLogs: [...s.bodyLogs.filter((l) => l.date !== date), {
					date,
					weightKg
				}].sort((a, b) => a.date.localeCompare(b.date)),
				profile: {
					...s.profile,
					bodyWeightKg: weightKg
				}
			};
		});
		queueSave(get);
	},
	setTimerMode: (timerMode) => set({ timerMode }),
	resetAll: () => {
		set({
			profile: {
				...defaultProfile,
				onboarded: true,
				name: get().profile.name
			},
			customRoutines: [],
			history: [],
			records: [],
			bodyLogs: [],
			session: null,
			lastSummary: null,
			tab: "home"
		});
		queueSave(get);
	}
}), {
	name: "trainup-v2",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	version: STORE_VERSION,
	migrate: (persisted) => persisted,
	partialize: (s) => ({
		profile: s.profile,
		settings: s.settings,
		customRoutines: s.customRoutines,
		history: s.history,
		records: s.records,
		bodyLogs: s.bodyLogs,
		session: s.session,
		timerMode: s.timerMode
	})
}));
var TAB_ITEMS = [
	{
		id: "home",
		label: "Inicio",
		icon: House
	},
	{
		id: "train",
		label: "Entrenar",
		icon: Dumbbell
	},
	{
		id: "create",
		label: "Crear",
		icon: CirclePlus
	},
	{
		id: "progress",
		label: "Progreso",
		icon: Activity
	},
	{
		id: "profile",
		label: "Yo",
		icon: User
	}
];
function TabBar({ tab, onChange, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: cn("fixed inset-x-0 bottom-0 z-30 shrink-0 border-t border-line bg-surface/95 px-2 pt-1 pb-1 shadow-[0_-16px_32px_rgb(0_0_0_/_0.18)] backdrop-blur safe-bottom", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-5",
			children: TAB_ITEMS.map((item) => {
				const active = tab === item.id;
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onChange(item.id),
					className: cn("flex h-13 w-full flex-col items-center justify-center gap-0.5 rounded-md pressable", active ? "text-accent" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5",
						strokeWidth: active ? 2.4 : 1.8
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-medium tracking-wide",
						children: item.label
					})]
				}) }, item.id);
			})
		})
	});
}
function AppShell({ children, tab, onChange, sidebarExtra, showNav }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-chassis text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh max-w-6xl",
			children: [showNav ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-line bg-bg px-3 py-6 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl tracking-tight",
							children: "TrainUp"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-8 flex flex-col gap-1",
						children: TAB_ITEMS.map((item) => {
							const Icon = item.icon;
							const active = tab === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onChange(item.id),
								className: cn("flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium pressable", active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/60 hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									strokeWidth: active ? 2.4 : 1.8
								}), item.label]
							}, item.id);
						})
					}),
					sidebarExtra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-auto px-1",
						children: sidebarExtra
					}) : null
				]
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex min-h-dvh min-w-0 flex-1 flex-col bg-bg",
				children
			})]
		})
	});
}
var GOALS$1 = [
	"fuerza",
	"hipertrofia",
	"definicion",
	"resistencia"
];
var LEVELS$1 = [
	"principiante",
	"intermedio",
	"avanzado"
];
var DAYS$1 = [
	3,
	4,
	5,
	6
];
var GENDERS$1 = [
	"hombre",
	"mujer",
	"otro"
];
function Onboarding() {
	const complete = useTrain((s) => s.completeOnboarding);
	const user = useCurrentUser();
	const [step, setStep] = (0, import_react.useState)(1);
	const [name, setName] = (0, import_react.useState)(user?.displayName ?? "");
	const [height, setHeight] = (0, import_react.useState)("170");
	const [gender, setGender] = (0, import_react.useState)("hombre");
	const [birthDate, setBirthDate] = (0, import_react.useState)("1995-06-15");
	const [goal, setGoal] = (0, import_react.useState)("hipertrofia");
	const [level, setLevel] = (0, import_react.useState)("intermedio");
	const [days, setDays] = (0, import_react.useState)(4);
	const [unit, setUnit] = (0, import_react.useState)("kg");
	const [weight, setWeight] = (0, import_react.useState)("75");
	const total = 4;
	function next() {
		if (step === 1 && !name.trim()) return;
		if (step < total) setStep(step + 1);
		else complete({
			name: name.trim(),
			goal,
			level,
			daysPerWeek: days,
			unit,
			bodyWeightKg: unit === "kg" ? Number(weight) || 75 : (Number(weight) || 165) / 2.20462262,
			heightCm: Number(height) || 170,
			gender,
			birthDate
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative flex h-full min-h-0 flex-1 flex-col bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col px-6 pb-8 pt-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs uppercase tracking-[0.2em] text-muted",
					children: [
						"Paso ",
						step,
						" de ",
						total
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-1 overflow-hidden rounded-full bg-elevated",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-accent",
						style: { width: `${step / total * 100}%` }
					})
				}),
				step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 stagger-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl tracking-tight",
							children: "¿Cómo te llamamos?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Solo para saludarte al entrar."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Tu nombre",
							className: "mt-8 h-14 w-full rounded-xl bg-elevated px-4 text-lg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle focus:shadow-[var(--shadow-border-hover)]"
						})
					]
				}) : null,
				step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 stagger-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl tracking-tight",
							children: "Sobre vos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Altura, género y fecha de nacimiento."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-xs uppercase tracking-wider text-muted",
							children: "Género"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-3 gap-2",
							children: GENDERS$1.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								active: gender === g,
								onClick: () => setGender(g),
								children: GENDER_LABEL[g]
							}, g))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted",
								children: "Altura (cm)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "numeric",
								value: height,
								onChange: (e) => setHeight(e.target.value),
								className: "mt-2 h-12 w-full rounded-lg bg-elevated px-3 tabular-nums shadow-[var(--shadow-border)] outline-none"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted",
								children: "Nacimiento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: birthDate,
								onChange: (e) => setBirthDate(e.target.value),
								className: "mt-2 h-12 w-full rounded-lg bg-elevated px-3 text-sm shadow-[var(--shadow-border)] outline-none"
							})] })]
						})
					]
				}) : null,
				step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 stagger-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl tracking-tight",
							children: "Objetivo y nivel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Armamos el plan de la semana con esto."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-xs uppercase tracking-wider text-muted",
							children: "Objetivo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-2 gap-2",
							children: GOALS$1.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								active: goal === g,
								onClick: () => setGoal(g),
								children: GOAL_LABEL[g]
							}, g))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs uppercase tracking-wider text-muted",
							children: "Nivel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-3 gap-2",
							children: LEVELS$1.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								active: level === l,
								onClick: () => setLevel(l),
								children: LEVEL_LABEL[l]
							}, l))
						})
					]
				}) : null,
				step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 stagger-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl tracking-tight",
							children: "Tu semana"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Días de entrenamiento, unidad y peso actual."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-xs uppercase tracking-wider text-muted",
							children: "Días por semana"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-4 gap-2",
							children: DAYS$1.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								active: days === d,
								onClick: () => setDays(d),
								children: d
							}, d))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted",
								children: "Unidad"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
									active: unit === "kg",
									onClick: () => setUnit("kg"),
									children: "kg"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
									active: unit === "lb",
									onClick: () => setUnit("lb"),
									children: "lb"
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted",
								children: "Peso"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "decimal",
								value: weight,
								onChange: (e) => setWeight(e.target.value),
								className: "mt-2 h-12 w-full rounded-lg bg-elevated px-3 tabular-nums shadow-[var(--shadow-border)] outline-none"
							})] })]
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex gap-3 pt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "flex-1",
						onClick: () => setStep(Math.max(1, step - 1)),
						disabled: step === 1,
						children: "Atrás"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "flex-[1.4]",
						onClick: next,
						disabled: step === 1 && !name.trim(),
						children: step === total ? "Armar plan" : "Continuar"
					})]
				})
			]
		})
	});
}
function Choice({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-12 rounded-lg text-sm font-medium pressable shadow-[var(--shadow-border)]", active ? "bg-accent text-accent-fg" : "bg-elevated text-fg"),
		children
	});
}
/** Hours until a muscle is considered recovered. */
var RECOVERY_HOURS = {
	pecho: 48,
	espalda: 48,
	hombros: 40,
	piernas: 72,
	cuadriceps: 72,
	isquiotibiales: 72,
	gemelos: 48,
	gluteos: 48,
	aductores: 48,
	abductores: 48,
	biceps: 40,
	triceps: 40,
	core: 24,
	cardio: 18
};
var TRACKED_MUSCLES = [
	"pecho",
	"espalda",
	"hombros",
	"piernas",
	"gluteos",
	"biceps",
	"triceps",
	"core"
];
function lastTrainedMap(history) {
	const map = /* @__PURE__ */ new Map();
	for (const session of history) for (const logged of session.exercises) {
		const ex = getExercise(logged.exerciseId);
		const muscles = [ex.muscle, ...ex.secondary ?? []];
		for (const m of muscles) {
			const prev = map.get(m) ?? 0;
			if (session.endedAt > prev) map.set(m, session.endedAt);
		}
	}
	return map;
}
function recoveryStatus(history, now = Date.now()) {
	const last = lastTrainedMap(history);
	return TRACKED_MUSCLES.map((muscle) => {
		const hours = RECOVERY_HOURS[muscle];
		const lastAt = last.get(muscle) ?? null;
		if (!lastAt) return {
			muscle,
			lastAt: null,
			hours,
			ratio: 1,
			ready: true
		};
		const elapsedH = (now - lastAt) / 36e5;
		const ratio = Math.min(1, Math.max(0, elapsedH / hours));
		return {
			muscle,
			lastAt,
			hours,
			ratio,
			ready: ratio >= 1
		};
	});
}
function hoursLeft(status) {
	if (status.ready || !status.lastAt) return 0;
	return Math.max(0, status.hours * (1 - status.ratio));
}
function Ring({ value, size = 72, stroke = 6, label, sub }) {
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	const dash = c * (1 - Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className: "-rotate-90",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "currentColor",
				className: "text-elevated",
				strokeWidth: stroke
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "currentColor",
				className: "text-accent",
				strokeWidth: stroke,
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: dash
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-lg leading-none tabular-nums",
				children: label
			}), sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] uppercase tracking-wider text-muted",
				children: sub
			}) : null]
		})]
	});
}
function HomeView() {
	const profile = useTrain((s) => s.profile);
	const history = useTrain((s) => s.history);
	const extras = useTrain((s) => s.customRoutines);
	const records = useTrain((s) => s.records);
	const startRoutine = useTrain((s) => s.startRoutine);
	const setTab = useTrain((s) => s.setTab);
	const lastSummary = useTrain((s) => s.lastSummary);
	const today = todaysRoutine(profile, history, extras);
	const scheduled = routinesForToday(extras);
	const streak = computeStreak(history);
	const weekStart = startOfLocalWeek();
	const weekSessions = history.filter((h) => h.endedAt >= weekStart);
	const trainedToday = history.some((h) => isToday(h.endedAt));
	const weekVol = weekSessions.reduce((s, h) => s + h.volumeKg, 0);
	const last = history[0];
	const latestPr = records[0];
	const recovery = recoveryStatus(history);
	const recovering = recovery.filter((m) => !m.ready);
	const readyCount = recovery.filter((m) => m.ready).length;
	const unit = profile.unit;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in space-y-5 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.18em] text-muted",
					children: longDate()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
					value: weekSessions.length / profile.daysPerWeek,
					label: `${weekSessions.length}/${profile.daysPerWeek}`,
					sub: "semana"
				})]
			}),
			lastSummary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-xl bg-elevated px-4 py-3 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-wider text-accent",
							children: "Sesión cerrada"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: lastSummary.routineName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs tabular-nums text-muted",
							children: [
								formatDuration(lastSummary.endedAt - lastSummary.startedAt),
								" ·",
								" ",
								formatVolume(lastSummary.volumeKg, unit),
								" · ",
								lastSummary.setsCompleted,
								" series",
								lastSummary.prs.length ? ` · ${lastSummary.prs.length} PR` : ""
							]
						})
					]
				})]
			}) : null,
			today ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => startRoutine(today),
				className: "group block w-full overflow-hidden rounded-2xl text-left pressable",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-art relative h-48 overflow-hidden rounded-2xl sm:h-56",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: COVER_SRC[today.cover],
							alt: "",
							className: "media hero-media h-full w-full object-cover",
							decoding: "async",
							fetchPriority: "high"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-bg via-bg/60 to-bg/5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 p-4 sm:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-[0.2em] text-accent",
									children: trainedToday ? "Listo por hoy" : scheduled.some((r) => r.id === today.id) ? "Programada" : "Te toca"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 truncate font-display text-[2rem] leading-none sm:text-4xl",
									children: today.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 truncate text-sm text-fg/80",
									children: [
										today.durationMin,
										" min · ",
										today.exercises.length,
										" ejercicios"
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-3 flex h-12 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-accent-fg",
					children: trainedToday ? "Repetir sesión" : "Empezar"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Racha",
						value: `${streak}d`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Volumen",
						value: formatVolume(weekVol, unit)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "PRs",
						value: String(records.length)
					})
				]
			}),
			scheduled.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-elevated px-4 py-3 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-wider text-accent",
					children: "Hoy en tu plan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 divide-y divide-line",
					children: scheduled.map((r) => {
						const done = history.some((h) => isToday(h.endedAt) && h.routineId === r.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted",
									children: [(r.scheduleDays ?? []).map(weekdayShort).join(" · "), done ? " · hecha" : ""]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: done ? "secondary" : "primary",
								onClick: () => startRoutine(r),
								children: done ? "Repetir" : "Empezar"
							})]
						}, r.id);
					})
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[11px] uppercase tracking-[0.18em] text-muted",
					children: "Recuperación"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tabular-nums text-muted",
					children: [
						readyCount,
						"/",
						recovery.length,
						" listos"
					]
				})]
			}), recovering.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-surface px-4 py-3 text-sm text-muted shadow-[var(--shadow-border)]",
				children: history.length > 0 ? "Todos los grupos están recuperados. Dale." : "Cuando entrenes, acá vas a ver qué grupo está listo."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
				children: recovering.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoveryRow, { status: m }, m.muscle))
			})] }),
			last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[11px] uppercase tracking-[0.18em] text-muted",
					children: "Última sesión"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex items-center gap-0.5 text-xs text-muted",
					onClick: () => setTab("progress"),
					children: "Historial"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setTab("progress"),
				className: "flex w-full items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3.5 text-left shadow-[var(--shadow-border)] pressable",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium",
						children: last.routineName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-xs text-muted",
						children: [
							formatVolume(last.volumeKg, unit),
							" · ",
							last.setsCompleted,
							" series"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shrink-0 text-sm tabular-nums text-muted",
					children: formatDuration(last.endedAt - last.startedAt)
				})]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "El primer entrenamiento es el que cuenta."
			}),
			latestPr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Mejor marca reciente · ",
					formatWeight(latestPr.weightKg, unit),
					" × ",
					latestPr.reps
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				block: true,
				onClick: () => setTab("train"),
				children: "Ver todas las rutinas"
			})
		]
	});
}
/** One recovery row: name, bar and status on a single thumb-friendly line. */
function RecoveryRow({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center gap-3 px-4 py-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-20 shrink-0 text-xs uppercase tracking-wider text-fg/90",
				children: MUSCLE_LABEL[status.muscle]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block h-full rounded-full bg-accent",
					style: { width: `${Math.round(status.ratio * 100)}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-12 shrink-0 text-right text-xs tabular-nums text-muted",
				children: status.ready ? "Listo" : `${Math.ceil(hoursLeft(status))} h`
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 rounded-xl bg-surface px-3 py-2.5 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] uppercase tracking-wider text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 truncate font-display text-xl leading-none tabular-nums sm:text-2xl",
			children: value
		})]
	});
}
function startOfLocalWeek() {
	const d = /* @__PURE__ */ new Date();
	const diff = (d.getDay() + 6) % 7;
	d.setHours(0, 0, 0, 0);
	d.setDate(d.getDate() - diff);
	return d.getTime();
}
function Stepper({ value, onChange, step = 1, min = 0, suffix, wide }) {
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const shown = Number.isInteger(value) ? String(value) : value.toFixed(1);
	(0, import_react.useEffect)(() => {
		if (!editing) setDraft(shown);
	}, [editing, shown]);
	(0, import_react.useEffect)(() => {
		if (editing) {
			inputRef.current?.focus();
			inputRef.current?.select();
		}
	}, [editing]);
	function commitDraft() {
		const normalized = draft.trim().replace(",", ".");
		const parsed = Number(normalized);
		if (Number.isFinite(parsed)) onChange(Math.max(min, Math.round(parsed * 10) / 10));
		setEditing(false);
	}
	function cancelDraft() {
		setDraft(shown);
		setEditing(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex h-12 items-center rounded-lg bg-elevated shadow-[var(--shadow-border)]", wide ? "min-w-0 flex-1" : "min-w-24"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-12 items-center justify-center text-muted pressable",
				"aria-label": "Restar",
				onClick: () => onChange(Math.max(min, Math.round((value - step) * 10) / 10)),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col items-center",
				children: [editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					value: draft,
					inputMode: "decimal",
					"aria-label": suffix ? `Cargar ${suffix}` : "Cargar valor",
					onChange: (e) => setDraft(e.target.value),
					onBlur: commitDraft,
					onKeyDown: (e) => {
						if (e.key === "Enter") e.currentTarget.blur();
						else if (e.key === "Escape") cancelDraft();
					},
					className: "h-7 w-full min-w-0 bg-transparent text-center font-display text-xl leading-none tabular-nums outline-none"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-w-10 rounded px-1 font-display text-xl leading-none tabular-nums pressable",
					onClick: () => setEditing(true),
					"aria-label": suffix ? `Editar ${shown} ${suffix}` : `Editar ${shown}`,
					children: shown
				}), suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] uppercase tracking-wider text-muted",
					children: suffix
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-12 items-center justify-center text-muted pressable",
				"aria-label": "Sumar",
				onClick: () => onChange(Math.round((value + step) * 10) / 10),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
			})
		]
	});
}
var MODES = [
	{
		id: "descanso",
		label: "Rest"
	},
	{
		id: "tabata",
		label: "Tabata"
	},
	{
		id: "emom",
		label: "EMOM"
	},
	{
		id: "amrap",
		label: "AMRAP"
	},
	{
		id: "cronometro",
		label: "Cronó"
	}
];
function TimerView() {
	const mode = useTrain((s) => s.timerMode);
	const setMode = useTrain((s) => s.setTimerMode);
	const [seconds, setSeconds] = (0, import_react.useState)(90);
	const [work, setWork] = (0, import_react.useState)(20);
	const [rest, setRest] = (0, import_react.useState)(10);
	const [rounds, setRounds] = (0, import_react.useState)(8);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [phase, setPhase] = (0, import_react.useState)("work");
	const [round, setRound] = (0, import_react.useState)(1);
	const started = (0, import_react.useRef)(null);
	const acc = (0, import_react.useRef)(0);
	const ended = (0, import_react.useRef)(false);
	const target = (0, import_react.useMemo)(() => {
		if (mode === "descanso") return seconds;
		if (mode === "amrap") return seconds;
		if (mode === "emom") return rounds * 60;
		if (mode === "tabata") return rounds * (work + rest);
		return 0;
	}, [
		mode,
		seconds,
		rounds,
		work,
		rest
	]);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const id = window.setInterval(() => {
			const now = Date.now();
			if (started.current == null) started.current = now;
			const t = acc.current + (now - started.current) / 1e3;
			setElapsed(t);
		}, 100);
		return () => window.clearInterval(id);
	}, [running]);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		if (mode === "cronometro") return;
		if (ended.current) return;
		if (mode === "descanso" || mode === "amrap") {
			if (elapsed >= target) finishBlock();
			return;
		}
		if (mode === "emom") {
			const r = Math.floor(elapsed / 60) + 1;
			if (r !== round && r <= rounds) {
				setRound(r);
				chime("tick");
				pulse();
			}
			if (elapsed >= target) finishBlock();
			return;
		}
		if (mode === "tabata") {
			const cycle = work + rest;
			const pos = elapsed % cycle;
			const r = Math.min(rounds, Math.floor(elapsed / cycle) + 1);
			const nextPhase = pos < work ? "work" : "rest";
			if (nextPhase !== phase) {
				setPhase(nextPhase);
				chime(nextPhase === "work" ? "tick" : "done");
				pulse();
			}
			if (r !== round) setRound(r);
			if (elapsed >= target) finishBlock();
		}
	}, [
		elapsed,
		running,
		mode,
		target,
		work,
		rest,
		rounds,
		phase,
		round
	]);
	function finishBlock() {
		if (ended.current) return;
		ended.current = true;
		setRunning(false);
		acc.current = target;
		setElapsed(target);
		started.current = null;
		chime("done");
		pulse();
	}
	function toggle() {
		if (running) {
			acc.current = elapsed;
			started.current = null;
			setRunning(false);
		} else {
			if (elapsed >= target && mode !== "cronometro") reset();
			started.current = Date.now();
			setRunning(true);
		}
	}
	function reset() {
		setRunning(false);
		setElapsed(0);
		acc.current = 0;
		started.current = null;
		ended.current = false;
		setPhase("work");
		setRound(1);
	}
	function switchMode(next) {
		reset();
		setMode(next);
		if (next === "tabata") {
			setWork(20);
			setRest(10);
			setRounds(8);
		}
		if (next === "emom") setRounds(10);
		if (next === "amrap") setSeconds(600);
		if (next === "descanso") setSeconds(90);
	}
	const remaining = mode === "cronometro" ? elapsed : Math.max(0, target - elapsed);
	const progress = mode === "cronometro" ? 0 : target ? Math.min(1, elapsed / target) : 0;
	const label = mode === "tabata" ? phase === "work" ? "WORK" : "REST" : mode === "emom" ? `R${round}` : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "Timer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex gap-1 overflow-x-auto",
				children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => switchMode(m.id),
					className: cn("h-10 shrink-0 rounded-full px-3 text-xs font-medium pressable", mode === m.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
					children: m.label
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
					size: 220,
					stroke: 10,
					value: progress,
					label: formatClock(remaining),
					sub: label
				}), mode === "tabata" || mode === "emom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"Ronda ",
						round,
						" / ",
						rounds
					]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-3",
				children: [
					mode === "descanso" || mode === "amrap" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: mode === "amrap" ? "Minutos" : "Segundos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
							value: mode === "amrap" ? Math.round(seconds / 60) : seconds,
							step: mode === "amrap" ? 1 : 15,
							min: mode === "amrap" ? 1 : 15,
							onChange: (n) => setSeconds(mode === "amrap" ? n * 60 : n)
						})]
					}) : null,
					mode === "tabata" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Work",
							value: work,
							step: 5,
							onChange: setWork
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Rest",
							value: rest,
							step: 5,
							onChange: setRest
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Rondas",
							value: rounds,
							step: 1,
							onChange: setRounds
						})
					] }) : null,
					mode === "emom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Minutos",
						value: rounds,
						step: 1,
						min: 1,
						onChange: setRounds
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex gap-2 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					size: "lg",
					className: "flex-1",
					onClick: reset,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reset"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "flex-[1.4]",
					onClick: toggle,
					children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), running ? "Pausa" : "Start"]
				})]
			})
		]
	});
}
function Row({ label, value, step, min = 0, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
			value,
			step,
			min,
			onChange
		})]
	});
}
var MUSCLES = [
	"todos",
	"pecho",
	"espalda",
	"hombros",
	"biceps",
	"triceps",
	"cuadriceps",
	"isquiotibiales",
	"gemelos",
	"gluteos",
	"aductores",
	"abductores",
	"core",
	"cardio"
];
function TrainView() {
	const profile = useTrain((s) => s.profile);
	const extras = useTrain((s) => s.customRoutines);
	const startRoutine = useTrain((s) => s.startRoutine);
	useTrain((s) => s.deleteCustomRoutine);
	const [mode, setMode] = (0, import_react.useState)("rutinas");
	filterRoutines(profile.level);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: "Entrenar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-1 rounded-xl bg-surface p-1 shadow-[var(--shadow-border)]",
					children: [["rutinas", "Rutinas"], ["timer", "Timer"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode(id),
						className: cn("h-10 rounded-lg text-sm font-medium pressable", mode === id ? "bg-elevated text-fg" : "text-muted"),
						children: label
					}, id))
				})]
			}),
			mode === "rutinas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 pb-8 stagger-in",
				children: extras.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Todavía no tenés rutinas propias. Creá una y asignale un día: el inicio te avisa."
				}) : extras.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoutineCard, {
					routine: r,
					onStart: () => startRoutine(r),
					extra: (r.scheduleDays ?? []).length ? (r.scheduleDays ?? []).map((d) => WEEKDAY_SHORT[d - 1]).join(" · ") : "Sin día asignado"
				}, r.id))
			}) : null,
			mode === "timer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerView, {}) : null
		]
	});
}
function RoutineCard({ routine, onStart, onDelete, onEdit, extra }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onStart,
			className: "block w-full text-left pressable",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: COVER_SRC[routine.cover],
					alt: "",
					className: "media h-full w-full object-cover",
					decoding: "async"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-surface to-transparent" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pb-4 pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl leading-none",
						children: routine.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: extra ?? `${routine.focus} · ${routine.durationMin} min · ${LEVEL_LABEL[routine.level]}`
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-0.5 rounded-full bg-elevated px-2.5 py-1 text-[11px] tabular-nums text-muted",
						children: [routine.exercises.length, " ej."]
					})]
				})
			})]
		}), onDelete || onEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-end gap-1 px-3 pb-3",
			children: [onEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onEdit,
				className: "flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-fg pressable ",
				children: "Editar"
			}) : null, onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onDelete,
				className: "h-11 rounded-lg px-3 text-sm text-danger pressable",
				children: "Eliminar"
			}) : null]
		}) : null]
	});
}
function Library({ onPick, hideStartHint }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [muscle, setMuscle] = (0, import_react.useState)("todos");
	const list = (0, import_react.useMemo)(() => searchExercises(q, muscle), [q, muscle]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar ejercicio",
					className: "h-12 w-full rounded-xl bg-elevated pl-10 pr-3 text-sm shadow-[var(--shadow-border)] outline-none placeholder:text-subtle"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex gap-1.5 overflow-x-auto pb-1",
				children: MUSCLES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMuscle(m),
					className: cn("h-9 shrink-0 rounded-full px-3 text-xs font-medium pressable", muscle === m ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
					children: m === "todos" ? "Todos" : MUSCLE_LABEL[m]
				}, m))
			}),
			!hideStartHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: "Toca para entrenar ese movimiento solo."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: list.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(ex.id),
					className: "flex w-full items-center justify-between rounded-xl bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)] pressable",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: ex.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted",
						children: [
							MUSCLE_LABEL[ex.muscle],
							" · ",
							EQUIPMENT_LABEL[ex.equipment]
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs tabular-nums text-muted",
						children: [
							ex.defaultSets,
							"×",
							ex.defaultReps
						]
					})]
				}) }, ex.id))
			})
		]
	});
}
/** Disco weights available at the rack, kg. */
var PLATE_KG = [
	20,
	10,
	5,
	2.5,
	1.75
];
var BAR_OPTIONS = [
	10,
	15,
	20,
	25
];
function round3(n) {
	return Math.round(n * 1e3) / 1e3;
}
function planPlates(targetKg, barKg) {
	const loadKg = round3(targetKg - barKg);
	if (!Number.isFinite(targetKg) || !Number.isFinite(barKg) || targetKg <= 0) return {
		targetKg,
		barKg,
		loadKg: 0,
		perSide: [],
		perSideKg: 0,
		remainderKg: 0,
		actualKg: barKg,
		possible: false
	};
	if (loadKg <= 0) return {
		targetKg,
		barKg,
		loadKg,
		perSide: [],
		perSideKg: 0,
		remainderKg: loadKg,
		actualKg: barKg,
		possible: loadKg === 0
	};
	let remaining = round3(loadKg / 2);
	const perSide = [];
	for (const plate of PLATE_KG) {
		const count = Math.floor((remaining + 1e-6) / plate);
		if (count > 0) {
			perSide.push({
				weight: plate,
				count
			});
			remaining = round3(remaining - count * plate);
		}
	}
	const usedPerSide = round3(loadKg / 2 - remaining);
	const actualKg = round3(barKg + usedPerSide * 2);
	return {
		targetKg,
		barKg,
		loadKg,
		perSide,
		perSideKg: usedPerSide,
		remainderKg: remaining,
		actualKg,
		possible: remaining < .05
	};
}
/**
* Bottom-sheet dialog — the same shape the session screen already uses for its
* rest timer and confirm prompts, lifted into a reusable component.
*
* It renders through a portal so a sheet opened from inside the scrolling
* `<main>` covers the whole viewport instead of being clipped by it, and it
* closes on backdrop tap / Escape. Body scroll is locked while open, which is
* what makes it feel native on a phone.
*/
function Modal({ open, onClose, title, subtitle, children, footer, className }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = previousOverflow;
		};
	}, [open, onClose]);
	if (!open || typeof document === "undefined") return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-bg/75 backdrop-blur-[2px] sm:items-center",
		onMouseDown: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			className: cn("flex max-h-[88dvh] w-full flex-col rounded-t-2xl bg-surface shadow-[var(--shadow-border-hover)]", "safe-bottom sm:max-w-md sm:rounded-2xl", className),
			children: [
				title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start justify-between gap-3 border-b border-line px-5 pb-3 pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "truncate font-display text-3xl leading-none tracking-tight",
							children: title
						}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted",
							children: subtitle
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Cerrar",
						className: "-mr-1 flex size-10 shrink-0 items-center justify-center rounded-lg text-muted pressable",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center pt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-10 rounded-full bg-line-strong" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1 overflow-y-auto px-5 py-4",
					children
				}),
				footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-line px-5 py-4",
					children: footer
				}) : null
			]
		})
	}), document.body);
}
function CreateView() {
	const extras = useTrain((s) => s.customRoutines);
	const startRoutine = useTrain((s) => s.startRoutine);
	const deleteCustom = useTrain((s) => s.deleteCustomRoutine);
	const [mode, setMode] = (0, import_react.useState)("rutinas");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	function openCreator(id) {
		setEditingId(id);
		setMode("crear");
	}
	const editing = editingId ? extras.find((r) => r.id === editingId) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: "Crear"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-3 gap-1 rounded-xl bg-surface p-1 shadow-[var(--shadow-border)]",
					children: [
						["rutinas", "Rutinas"],
						["crear", "Crear"],
						["barra", "Barra"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode(id),
						className: cn("h-10 rounded-lg text-sm font-medium pressable", mode === id ? "bg-elevated text-fg" : "text-muted"),
						children: label
					}, id))
				})]
			}),
			mode === "rutinas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 pb-8 stagger-in",
				children: [extras.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Todavía no tenés rutinas propias. Creá una y asignale un día: el inicio te avisa."
				}) : extras.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoutineCard, {
					routine: r,
					onStart: () => startRoutine(r),
					onEdit: () => openCreator(r.id),
					onDelete: () => deleteCustom(r.id),
					extra: (r.scheduleDays ?? []).length ? (r.scheduleDays ?? []).map((d) => WEEKDAY_SHORT[d - 1]).join(" · ") : "Sin día asignado"
				}, r.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					block: true,
					onClick: () => openCreator(null),
					children: "Nueva rutina"
				})]
			}) : null,
			mode === "crear" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Creator, {
				routine: editing,
				onDone: () => {
					setEditingId(null);
					setMode("rutinas");
				}
			}, editing?.id ?? "new") : null,
			mode === "barra" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarCalculator, {}) : null
		]
	});
}
function Creator({ routine, onDone }) {
	const save = useTrain((s) => s.saveCustomRoutine);
	const unit = useTrain((s) => s.profile.unit);
	const isEdit = Boolean(routine);
	const [name, setName] = (0, import_react.useState)(routine?.name ?? "Mi rutina");
	const [picked, setPicked] = (0, import_react.useState)(routine?.exercises ?? []);
	const [days, setDays] = (0, import_react.useState)(routine?.scheduleDays ?? [isoToday()]);
	const [libOpen, setLibOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	function add(id) {
		const ex = getExercise(id);
		setPicked((p) => [...p, {
			exerciseId: id,
			sets: ex.defaultSets,
			reps: ex.defaultReps,
			restSec: ex.restSec
		}]);
		setLibOpen(false);
		setEditing("new");
	}
	function updateSlot(index, patch) {
		setPicked((prev) => prev.map((slot, i) => i === index ? {
			...slot,
			...patch
		} : slot));
	}
	function toggleDay(d) {
		setDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].sort());
	}
	const editIndex = editing === "new" ? picked.length - 1 : editing;
	const editSlot = editIndex !== null && editIndex >= 0 ? picked[editIndex] : void 0;
	function persist() {
		if (!name.trim() || picked.length === 0) return;
		save({
			id: routine?.id ?? uid("rut"),
			name: name.trim(),
			focus: routine?.focus ?? "Personal",
			durationMin: Math.max(20, picked.length * 8),
			level: routine?.level ?? "intermedio",
			cover: routine?.cover ?? "dumbbells",
			custom: true,
			scheduleDays: days,
			exercises: picked
		});
		onDone();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: name,
				onChange: (e) => setName(e.target.value),
				className: "h-12 w-full rounded-xl bg-elevated px-4 shadow-[var(--shadow-border)] outline-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs uppercase tracking-[0.18em] text-muted",
				children: "Días que avisa el inicio"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1",
				children: WEEKDAY_SHORT.map((label, i) => {
					const d = i + 1;
					const on = days.includes(d);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => toggleDay(d),
						className: cn("h-11 rounded-lg text-xs font-medium pressable", on ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
						children: label
					}, d);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: picked.map((slot, i) => {
					const ex = getExercise(slot.exerciseId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 rounded-xl bg-surface pl-1 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setEditing(i),
							className: "flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-3 text-left pressable",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate font-medium",
									children: ex.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate text-xs tabular-nums text-muted",
									children: [
										MUSCLE_LABEL[ex.muscle],
										" · ",
										EQUIPMENT_LABEL[ex.equipment],
										" ·",
										" ",
										slot.sets,
										" series × ",
										slot.reps,
										" reps",
										slot.weightKg ? ` · ${formatWeight(slot.weightKg, unit)}` : "",
										" · ",
										slot.restSec,
										"s"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0 text-muted" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mr-1 flex size-10 shrink-0 items-center justify-center text-muted pressable",
							onClick: () => setPicked((p) => p.filter((_, idx) => idx !== i)),
							"aria-label": `Quitar ${ex.name}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					}, `${slot.exerciseId}-${i}`);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				block: true,
				onClick: () => setLibOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Añadir ejercicio"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				block: true,
				disabled: !picked.length,
				onClick: persist,
				children: isEdit ? "Guardar cambios" : "Guardar rutina"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: libOpen,
				onClose: () => setLibOpen(false),
				title: "Elegí el ejercicio",
				subtitle: "Después ajustás series, reps y peso.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, {
					hideStartHint: true,
					onPick: add
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: editSlot !== void 0,
				onClose: () => setEditing(null),
				title: editSlot ? getExercise(editSlot.exerciseId).name : "",
				subtitle: editSlot ? `${MUSCLE_LABEL[getExercise(editSlot.exerciseId).muscle]} · ${EQUIPMENT_LABEL[getExercise(editSlot.exerciseId).equipment]}` : void 0,
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					block: true,
					onClick: () => setEditing(null),
					children: "Listo"
				}),
				children: editSlot && editIndex !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
								label: "Series",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
									wide: true,
									min: 1,
									value: editSlot.sets,
									onChange: (sets) => updateSlot(editIndex, { sets }),
									suffix: "series"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
								label: "Reps",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
									wide: true,
									min: 1,
									value: editSlot.reps,
									onChange: (reps) => updateSlot(editIndex, { reps }),
									suffix: "reps"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted",
								children: "Peso en la primera serie"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
									wide: true,
									min: 0,
									step: unit === "kg" ? 2.5 : 5,
									value: slotWeightInUnit(editSlot, unit),
									onChange: (v) => updateSlot(editIndex, { weightKg: unit === "kg" ? v : v / 2.20462262 }),
									suffix: unit
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => updateSlot(editIndex, { weightKg: useTrain.getState().profile.bodyWeightKg }),
									className: "h-12 shrink-0 rounded-lg bg-elevated px-3 text-xs font-medium text-muted pressable shadow-[var(--shadow-border)]",
									children: "Mi peso"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted",
								children: "Se precarga sola la próxima vez que entrenes este ejercicio; cada serie la ajustás en la sesión."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted",
								children: "Descanso"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
									wide: true,
									min: 0,
									step: 15,
									value: editSlot.restSec,
									onChange: (restSec) => updateSlot(editIndex, { restSec }),
									suffix: "seg"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => updateSlot(editIndex, { restSec: 0 }),
									className: cn("h-12 shrink-0 rounded-lg px-3 text-xs font-medium pressable shadow-[var(--shadow-border)]", editSlot.restSec === 0 ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
									children: "Sin descanso"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [
									30,
									45,
									60,
									90,
									120,
									180
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => updateSlot(editIndex, { restSec: s }),
									className: cn("h-9 rounded-full px-3 text-xs font-medium tabular-nums pressable", editSlot.restSec === s ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
									children: [s, "s"]
								}, `rest-${s}`))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted",
								children: [formatRest(editSlot.restSec), ". Ajustá de 15 en 15 segundos o usá un atajo."]
							})
						] })
					]
				}) : null
			})
		]
	});
}
function Field$1({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs uppercase tracking-wider text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2",
		children
	})] });
}
/** Slot weight in the athlete's display unit, rounded for the stepper. */
function slotWeightInUnit(slot, unit) {
	const kg = slot.weightKg ?? 0;
	if (unit === "kg") return Math.round(kg * 2) / 2;
	return Math.round(kg * 2.20462262 * 10) / 10;
}
function isoToday() {
	const d = (/* @__PURE__ */ new Date()).getDay();
	return d === 0 ? 7 : d;
}
/** Human rest label, e.g. 90 → "1 min 30 s", 0 → "Sin descanso entre series". */
function formatRest(sec) {
	if (sec <= 0) return "Sin descanso entre series";
	const m = Math.floor(sec / 60);
	const s = sec % 60;
	if (m === 0) return `${s} segundos de descanso`;
	if (s === 0) return `${m} min de descanso`;
	return `${m} min ${s} s de descanso`;
}
function BarCalculator() {
	const [target, setTarget] = (0, import_react.useState)("100");
	const [bar, setBar] = (0, import_react.useState)(20);
	const plan = (0, import_react.useMemo)(() => planPlates(Number(target) || 0, bar), [target, bar]);
	const maxH = 72;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 pb-10 stagger-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Decí cuánto querés levantar y cuánto pesa la barra. Armamos los discos por lado (",
					PLATE_KG.join(" / "),
					" kg)."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-wider text-muted",
					children: "Peso objetivo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					inputMode: "decimal",
					value: target,
					onChange: (e) => setTarget(e.target.value),
					className: "mt-2 h-14 w-full rounded-xl bg-elevated px-4 font-display text-3xl tabular-nums shadow-[var(--shadow-border)] outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-wider text-muted",
				children: "Barra"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid grid-cols-4 gap-2",
				children: BAR_OPTIONS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setBar(b),
					className: cn("h-11 rounded-lg text-sm font-medium pressable shadow-[var(--shadow-border)]", bar === b ? "bg-accent text-accent-fg" : "bg-elevated text-fg"),
					children: [b, " kg"]
				}, b))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-surface px-4 py-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs uppercase tracking-wider text-muted",
						children: "Carga por lado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-center font-display text-4xl tabular-nums",
						children: [plan.perSideKg, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 text-lg text-muted",
							children: "kg"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-end justify-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sleeve, {
								plates: [...plan.perSide].reverse(),
								maxH,
								mirror: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-3 h-3 w-28 rounded-full bg-fg/80 sm:w-40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sleeve, {
								plates: plan.perSide,
								maxH
							})
						]
					}),
					plan.perSide.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-sm text-muted",
						children: "Solo la barra."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-1.5",
						children: plan.perSide.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [p.weight, " kg"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									p.count,
									" por lado · ",
									p.count * 2,
									" discos"
								]
							})]
						}, p.weight))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-center text-xs text-muted",
						children: [
							"Total real ",
							plan.actualKg,
							" kg",
							!plan.possible && plan.loadKg > 0 ? ` · resto ${plan.remainderKg} kg por lado (no entra exacto)` : ""
						]
					})
				]
			})
		]
	});
}
function Sleeve({ plates, maxH, mirror }) {
	const discs = plates.flatMap((p) => Array.from({ length: p.count }, () => p.weight));
	const ordered = mirror ? [...discs].reverse() : discs;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-end gap-0.5",
		children: ordered.map((w, i) => {
			const h = 28 + w / 20 * (maxH - 28);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				title: `${w} kg`,
				className: "w-2.5 rounded-sm bg-accent",
				style: {
					height: h,
					opacity: .45 + w / 20 * .55
				}
			}, `${w}-${i}`);
		})
	});
}
/** Heuristic for mid/low-end phones: fewer animations and lighter charts. */
function isLowPowerDevice() {
	if (typeof navigator === "undefined") return false;
	const nav = navigator;
	const cores = navigator.hardwareConcurrency ?? 8;
	const mem = nav.deviceMemory ?? 8;
	return Boolean(nav.connection?.saveData) || cores <= 4 || mem <= 4;
}
function applyLowPowerClass() {
	if (typeof document === "undefined") return;
	if (isLowPowerDevice()) document.documentElement.classList.add("low-power");
	else document.documentElement.classList.remove("low-power");
}
var sentinel = null;
async function requestWakeLock() {
	if (typeof navigator === "undefined" || !("wakeLock" in navigator)) return;
	try {
		sentinel = await navigator.wakeLock.request("screen");
		sentinel.addEventListener("release", () => {
			sentinel = null;
		});
	} catch {
		sentinel = null;
	}
}
async function releaseWakeLock() {
	try {
		await sentinel?.release();
	} catch {}
	sentinel = null;
}
function SessionView() {
	const session = useTrain((s) => s.session);
	const unit = useTrain((s) => s.profile.unit);
	const skipRest = useTrain((s) => s.skipRest);
	const addRest = useTrain((s) => s.addRest);
	const setCurrent = useTrain((s) => s.setCurrentExercise);
	const toggleSet = useTrain((s) => s.toggleSet);
	const updateSet = useTrain((s) => s.updateSet);
	const addSet = useTrain((s) => s.addSet);
	const removeSet = useTrain((s) => s.removeSet);
	const replaceExercise = useTrain((s) => s.replaceExercise);
	const finish = useTrain((s) => s.finishSession);
	const discard = useTrain((s) => s.discardSession);
	const keepAwake = useTrain((s) => s.settings.keepAwake);
	const [now, setNow] = (0, import_react.useState)(Date.now());
	const [picker, setPicker] = (0, import_react.useState)(false);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [rang, setRang] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const tick = isLowPowerDevice() ? 400 : 200;
		const id = window.setInterval(() => setNow(Date.now()), tick);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!keepAwake) return;
		requestWakeLock();
		const onVis = () => {
			if (document.visibilityState === "visible") requestWakeLock();
		};
		document.addEventListener("visibilitychange", onVis);
		return () => {
			document.removeEventListener("visibilitychange", onVis);
			releaseWakeLock();
		};
	}, [keepAwake]);
	(0, import_react.useEffect)(() => {
		if (!session?.restUntil) {
			setRang(false);
			return;
		}
		if (session.restUntil <= Date.now() && !rang) {
			setRang(true);
			chime("done");
			pulse();
			skipRest();
		}
	}, [
		now,
		session?.restUntil,
		rang,
		skipRest
	]);
	if (!session) return null;
	const current = session.exercises[session.currentIndex];
	const exercise = getExercise(current.exerciseId);
	const remaining = session.restUntil ? Math.max(0, (session.restUntil - now) / 1e3) : 0;
	const resting = remaining > 0;
	const doneSets = session.exercises.reduce((n, ex) => n + ex.sets.filter((s) => s.completed).length, 0);
	const totalSets = session.exercises.reduce((n, ex) => n + ex.sets.length, 0);
	const elapsed = now - session.startedAt;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full min-h-0 flex-1 flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 px-4 pt-12 pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center rounded-lg text-muted pressable",
						onClick: () => setConfirm(true),
						"aria-label": "Cerrar sesión",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs uppercase tracking-[0.18em] text-muted",
							children: session.routineName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm tabular-nums text-fg",
							children: [
								formatDuration(elapsed),
								" · ",
								doneSets,
								"/",
								totalSets
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 w-20 overflow-hidden rounded-full bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-accent transition-[width] duration-200",
							style: { width: `${doneSets / Math.max(1, totalSets) * 100}%` }
						})
					})
				]
			}),
			picker ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Sustituir"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setPicker(false),
						children: "Cancelar"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, {
					hideStartHint: true,
					onPick: (id) => {
						replaceExercise(session.currentIndex, id);
						setPicker(false);
					}
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-4 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-accent",
						children: [
							MUSCLE_LABEL[exercise.muscle],
							" · ",
							EQUIPMENT_LABEL[exercise.equipment]
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-5xl leading-none tracking-tight",
						children: exercise.name
					}),
					exercise.cues.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: exercise.cues.join(" · ")
					}) : null,
					exercise.gif ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GifPlate, {
						src: exercise.gif,
						name: exercise.name
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-2",
						children: current.sets.map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: cn("rounded-xl px-3 py-2 shadow-[var(--shadow-border)]", st.completed ? "bg-elevated/70" : "bg-surface"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-6 text-center font-display text-lg tabular-nums text-muted",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
										value: toDisplayWeight(st.weightKg, unit),
										step: weightStep(unit),
										suffix: unit,
										wide: true,
										onChange: (n) => updateSet(session.currentIndex, st.id, { weightKg: fromDisplayWeight(n, unit) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
										value: st.reps,
										step: 1,
										min: 0,
										suffix: exercise.esTiempo ? "seg" : "reps",
										onChange: (n) => updateSet(session.currentIndex, st.id, { reps: Math.max(0, Math.round(n)) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => toggleSet(session.currentIndex, st.id),
										className: cn("flex size-12 shrink-0 items-center justify-center rounded-lg pressable", st.completed ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
										"aria-label": st.completed ? "Desmarcar serie" : "Completar serie",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
									})
								]
							})
						}, st.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								className: "flex-1",
								onClick: () => addSet(session.currentIndex),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Serie"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								className: "flex-1",
								onClick: () => setPicker(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Replace, { className: "size-4" }), "Cambiar"]
							}),
							current.sets.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => removeSet(session.currentIndex, current.sets.at(-1).id),
								children: "Quitar"
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "safe-bottom shrink-0 border-t border-line px-4 pt-3 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-12 items-center justify-center rounded-lg bg-elevated pressable disabled:opacity-30",
							disabled: session.currentIndex === 0,
							onClick: () => setCurrent(session.currentIndex - 1),
							"aria-label": "Anterior",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm tabular-nums text-muted",
							children: [
								session.currentIndex + 1,
								" / ",
								session.exercises.length
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-12 items-center justify-center rounded-lg bg-elevated pressable disabled:opacity-30",
							disabled: session.currentIndex >= session.exercises.length - 1,
							onClick: () => setCurrent(session.currentIndex + 1),
							"aria-label": "Siguiente",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					block: true,
					size: "lg",
					onClick: () => finish(),
					children: "Terminar sesión"
				})]
			}),
			resting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-20 flex flex-col justify-end bg-bg/70",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-t-2xl bg-surface px-6 pb-10 pt-6 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs uppercase tracking-[0.2em] text-muted",
							children: "Descanso"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
								size: 168,
								stroke: 8,
								value: session.restTotalSec ? 1 - remaining / session.restTotalSec : 0,
								label: formatClock(remaining),
								sub: "rest"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-center text-sm text-muted",
							children: ["Siguiente: ", formatWeight(current.sets.find((s) => !s.completed)?.weightKg ?? 0, unit)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: () => addRest(-15),
									children: "−15s"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: () => skipRest(),
									children: "Saltar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: () => addRest(15),
									children: "+15s"
								})
							]
						})
					]
				})
			}) : null,
			confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-30 flex items-end bg-bg/70",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full rounded-t-2xl bg-surface px-5 pb-8 pt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: "¿Salir sin guardar?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Las series de esta sesión no se registrarán."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								className: "flex-1",
								onClick: () => setConfirm(false),
								children: "Seguir"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "danger",
								className: "flex-1",
								onClick: discard,
								children: "Descartar"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-2",
							block: true,
							onClick: () => finish(),
							children: "Guardar y salir"
						})
					]
				})
			}) : null
		]
	});
}
/**
* Demonstration clip for the current movement. The catalogue references media
* that may not be shipped yet, so a failed load swaps in a calm placeholder
* instead of leaving a broken-image icon in the middle of a workout.
*/
function GifPlate({ src, name }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 flex h-40 items-center justify-center rounded-2xl bg-surface shadow-[var(--shadow-border)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-[16rem] text-center text-xs text-muted",
			children: "Sin video para este ejercicio. Seguí las indicaciones y tu técnica."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: `Demostración de ${name}`,
			className: "media h-40 w-full object-contain",
			loading: "lazy",
			decoding: "async",
			onError: () => setFailed(true)
		})
	});
}
function ProgressView() {
	const history = useTrain((s) => s.history);
	const records = useTrain((s) => s.records);
	const unit = useTrain((s) => s.profile.unit);
	const bodyLogs = useTrain((s) => s.bodyLogs);
	const weekData = (0, import_react.useMemo)(() => {
		return Array.from({ length: 8 }, (_, i) => {
			const d = subDays(/* @__PURE__ */ new Date(), 7 - i);
			const key = format(d, "yyyy-MM-dd");
			const vol = history.filter((h) => format(h.endedAt, "yyyy-MM-dd") === key).reduce((s, h) => s + h.volumeKg, 0);
			return {
				day: format(d, "EE", { locale: es }).slice(0, 2),
				vol: unit === "kg" ? Math.round(vol) : Math.round(vol * 2.2)
			};
		});
	}, [history, unit]);
	const heat = (0, import_react.useMemo)(() => {
		const set = new Set(history.map((h) => format(h.endedAt, "yyyy-MM-dd")));
		return Array.from({ length: 84 }, (_, i) => {
			const d = subDays(/* @__PURE__ */ new Date(), 83 - i);
			const key = format(d, "yyyy-MM-dd");
			return {
				key,
				on: set.has(key)
			};
		});
	}, [history]);
	const totalVol = history.reduce((s, h) => s + h.volumeKg, 0);
	const lastWeight = bodyLogs.at(-1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7 pb-8 stagger-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "Progreso"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					history.length,
					" sesiones · ",
					formatVolume(totalVol, unit),
					" acumuladas"
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.18em] text-muted",
					children: "Volumen · 8 días"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: weekData,
							margin: {
								top: 8,
								right: 4,
								left: -24,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "vol",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "var(--tu-accent)",
										stopOpacity: .45
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "var(--tu-accent)",
										stopOpacity: 0
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "day",
									tick: {
										fill: "var(--tu-muted)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fill: "var(--tu-muted)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										background: "var(--tu-elevated)",
										border: "1px solid var(--tu-line)",
										borderRadius: 12,
										color: "var(--tu-fg)"
									},
									formatter: (v) => [`${v} ${unit}`, "Volumen"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "vol",
									stroke: "var(--tu-accent)",
									fill: "url(#vol)",
									strokeWidth: 2
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.18em] text-muted",
				children: "Calendario"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-7 gap-1.5",
				children: heat.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					title: d.key,
					className: `h-3.5 rounded-sm ${d.on ? "bg-accent" : "bg-elevated"}`
				}, d.key))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.18em] text-muted",
				children: "Marcas personales"
			}), records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Todavía no hay PRs. Ciérralos en la sesión."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: records.slice().sort((a, b) => b.e1rm - a.e1rm).slice(0, 8).map((r) => {
					const ex = getExercise(r.exerciseId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: ex.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: r.date
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-xl tabular-nums",
							children: [formatWeight(r.weightKg, unit, false), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1 text-xs text-muted",
								children: [
									unit,
									" × ",
									r.reps
								]
							})]
						})]
					}, r.exerciseId);
				})
			})] }),
			lastWeight ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: ["Peso corporal · ", formatWeight(lastWeight.weightKg, unit)]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.18em] text-muted",
				children: "Historial"
			}), history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Cuando termines una sesión, aparece aquí."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: history.slice(0, 12).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: h.routineName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tabular-nums text-muted",
							children: format(h.endedAt, "d MMM", { locale: es })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							formatDuration(h.endedAt - h.startedAt),
							" · ",
							formatVolume(h.volumeKg, unit),
							" ·",
							" ",
							h.setsCompleted,
							" series",
							h.prs.length ? ` · ${h.prs.length} PR` : ""
						]
					})]
				}, h.id))
			})] })
		]
	});
}
function Switch({ checked, onCheckedChange, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		checked,
		onCheckedChange,
		className: cn("relative h-7 w-12 shrink-0 rounded-full bg-elevated shadow-[var(--shadow-border)]", "data-[state=checked]:bg-accent", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "block size-6 translate-x-0.5 rounded-full bg-fg transition-transform duration-150 data-[state=checked]:translate-x-5 data-[state=checked]:bg-accent-fg" })
	});
}
var loadGymState = createServerFn().middleware([authMiddleware]).handler(createSsrRpc("b0f2d35d820cb7ea70f0dfa19a57e7c23ed8cf1897b1cbb0a41a247e7d5bf90e"));
var saveGymState = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("5da7e9d552febe8e34f1fef472aa8be2f54352ad43768247480ab6e41a81a870"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("621f4d045a35dd22c09a02b5c6a19d77e8cfadbdce92d601c6d5249dda4a1d4d"));
var GOALS = [
	"fuerza",
	"hipertrofia",
	"definicion",
	"resistencia"
];
var LEVELS = [
	"principiante",
	"intermedio",
	"avanzado"
];
var DAYS = [
	3,
	4,
	5,
	6
];
var GENDERS = [
	"hombre",
	"mujer",
	"otro"
];
function ProfileView() {
	const profile = useTrain((s) => s.profile);
	const settings = useTrain((s) => s.settings);
	const history = useTrain((s) => s.history);
	const update = useTrain((s) => s.updateProfile);
	const updateSettings = useTrain((s) => s.updateSettings);
	const addBodyLog = useTrain((s) => s.addBodyLog);
	const resetAll = useTrain((s) => s.resetAll);
	const user = useCurrentUser();
	const { isPending } = useCurrentUserState();
	const [weight, setWeight] = (0, import_react.useState)(String(toDisplayWeight(profile.bodyWeightKg, profile.unit)));
	const [height, setHeight] = (0, import_react.useState)(String(profile.heightCm));
	const [confirmWipe, setConfirmWipe] = (0, import_react.useState)(false);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	typeof window !== "undefined" && hasGateSessionMarker();
	function saveWeight() {
		const n = Number(weight);
		if (!Number.isFinite(n) || n <= 0) return;
		addBodyLog(fromDisplayWeight(n, profile.unit));
	}
	function setUnit(unit) {
		update({ unit });
		setWeight(String(toDisplayWeight(profile.bodyWeightKg, unit)));
	}
	async function toggleNotifications(on) {
		if (on) {
			const ok = await ensureNotifyPermission();
			updateSettings({ notifications: ok });
			return;
		}
		updateSettings({ notifications: false });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-14 items-center justify-center overflow-hidden rounded-xl bg-elevated shadow-[var(--shadow-border)]",
					children: user?.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: user.profileImageUrl,
						alt: "",
						className: "size-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-none tracking-tight",
						children: profile.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							GOAL_LABEL[profile.goal],
							" · ",
							LEVEL_LABEL[profile.level],
							" · ",
							history.length,
							" sesiones"
						]
					}),
					user?.primaryEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: user.primaryEmail
					}) : null
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nombre",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: profile.name,
					onChange: (e) => update({ name: e.target.value }),
					className: "h-12 w-full rounded-xl bg-elevated px-4 shadow-[var(--shadow-border)] outline-none"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Objetivo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: GOALS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: profile.goal === g,
						onClick: () => update({ goal: g }),
						children: GOAL_LABEL[g]
					}, g))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nivel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: LEVELS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: profile.level === l,
						onClick: () => update({ level: l }),
						children: LEVEL_LABEL[l]
					}, l))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Días por semana",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-2",
					children: DAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: profile.daysPerWeek === d,
						onClick: () => update({ daysPerWeek: d }),
						children: d
					}, d))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Género",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: GENDERS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: profile.gender === g,
						onClick: () => update({ gender: g }),
						children: GENDER_LABEL[g]
					}, g))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Altura (cm)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "numeric",
						value: height,
						onChange: (e) => {
							setHeight(e.target.value);
							const n = Number(e.target.value);
							if (Number.isFinite(n) && n > 100) update({ heightCm: n });
						},
						className: "h-12 w-full rounded-xl bg-elevated px-4 tabular-nums shadow-[var(--shadow-border)] outline-none"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nacimiento",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: profile.birthDate,
						onChange: (e) => update({ birthDate: e.target.value }),
						className: "h-12 w-full rounded-xl bg-elevated px-3 text-sm shadow-[var(--shadow-border)] outline-none"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Unidad",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: profile.unit === "kg",
						onClick: () => setUnit("kg"),
						children: "Kilogramos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: profile.unit === "lb",
						onClick: () => setUnit("lb"),
						children: "Libras"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
				label: `Peso corporal (${profile.unit})`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "decimal",
						value: weight,
						onChange: (e) => setWeight(e.target.value),
						className: "h-12 flex-1 rounded-xl bg-elevated px-4 tabular-nums shadow-[var(--shadow-border)] outline-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: saveWeight,
						children: "Guardar"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted",
					children: ["Actual: ", formatWeight(profile.bodyWeightKg, profile.unit)]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Apariencia",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: ["dark", "light"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: settings.theme === t,
						onClick: () => updateSettings({ theme: t }),
						children: t === "dark" ? "Oscuro" : "Claro"
					}, t))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-1 rounded-2xl bg-surface p-1 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Notificaciones",
						hint: "Aviso del entrenamiento del día",
						checked: settings.notifications,
						onChange: (v) => void toggleNotifications(v)
					}),
					settings.notifications ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: "Hora"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "time",
							value: settings.notifyHour,
							onChange: (e) => updateSettings({ notifyHour: e.target.value }),
							className: "h-11 rounded-lg bg-elevated px-3 tabular-nums shadow-[var(--shadow-border)] outline-none"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Pantalla encendida",
						hint: "Mantenerla activa durante la rutina",
						checked: settings.keepAwake,
						onChange: (v) => updateSettings({ keepAwake: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Vibración",
						hint: "Pulso al terminar el descanso",
						checked: settings.vibration,
						onChange: (v) => updateSettings({ vibration: v })
					})
				]
			}),
			null,
			confirmWipe ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: "Esto borra historial, PRs y el perfil de este dispositivo."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "flex-1",
						onClick: () => setConfirmWipe(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						className: "flex-1",
						onClick: resetAll,
						children: "Borrar"
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				block: true,
				onClick: () => setConfirmWipe(true),
				children: "Borrar datos locales"
			})
		]
	});
}
function ToggleRow({ label, hint, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: hint
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onChange
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 text-xs uppercase tracking-[0.18em] text-muted",
		children: label
	}), children] });
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 rounded-lg text-sm font-medium pressable shadow-[var(--shadow-border)]", active ? "bg-accent text-accent-fg" : "bg-elevated text-fg"),
		children
	});
}
/** Hard cap so a wedged storage read can never leave the splash up forever. */
var REHYDRATE_TIMEOUT_MS = 3e3;
/**
* Resolve once zustand persist has finished reading storage (or has given up).
*
* `persist.rehydrate()` returns before the state is actually applied — it
* resolves as soon as the storage read is kicked off — so waiting on it alone
* still lets the first client write clobber what was saved. `onFinishHydration`
* fires on the real completion.
*/
function waitForRehydration() {
	if (useTrain.persist.hasHydrated()) return Promise.resolve();
	return new Promise((resolve) => {
		let done = false;
		const finish = () => {
			if (done) return;
			done = true;
			window.clearTimeout(timer);
			unsubscribe();
			resolve();
		};
		const timer = window.setTimeout(finish, REHYDRATE_TIMEOUT_MS);
		const unsubscribe = useTrain.persist.onFinishHydration(finish);
		if (useTrain.persist.hasHydrated()) finish();
	});
}
function Home() {
	const hydrated = useTrain((s) => s.hydrated);
	const onboarded = useTrain((s) => s.profile.onboarded);
	const session = useTrain((s) => s.session);
	const tab = useTrain((s) => s.tab);
	const setTab = useTrain((s) => s.setTab);
	const skipRest = useTrain((s) => s.skipRest);
	const { user, isPending } = useCurrentUserState();
	const userId = user?.id ?? null;
	const loadedFor = (0, import_react.useRef)(null);
	const [rehydrated, setRehydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		applyLowPowerClass();
		bindGymPersist((snap) => saveGymState({ data: snap }));
	}, []);
	(0, import_react.useEffect)(() => {
		let alive = true;
		(async () => {
			if (loadedFor.current === null) try {
				await Promise.resolve(useTrain.persist.rehydrate());
				await waitForRehydration();
			} catch {}
			if (!alive) return;
			setRehydrated(true);
			const local = useTrain.getState();
			applyTheme(local.settings.theme);
			setVibrationEnabled(local.settings.vibration);
			const rest = local.session?.restUntil;
			if (rest && rest < Date.now()) skipRest();
			if (!userId || loadedFor.current !== null) {
				useTrain.getState().markHydrated();
				return;
			}
			loadedFor.current = userId;
			try {
				const remote = await loadGymState();
				if (!alive) return;
				if (remote?.profile.onboarded) useTrain.getState().hydrateRemote(remote);
				else if (useTrain.getState().profile.onboarded) {
					useTrain.getState().markHydrated();
					persistNow();
				} else useTrain.getState().beginFreshAccount();
			} catch {
				if (alive) useTrain.getState().markHydrated();
			}
		})();
		return () => {
			alive = false;
		};
	}, [skipRest, userId]);
	(0, import_react.useEffect)(() => {
		const settings = useTrain.getState().settings;
		if (!settings.notifications || typeof window === "undefined") return;
		const wait = msUntilHour(settings.notifyHour);
		const id = window.setTimeout(() => {
			const s = useTrain.getState();
			if (!s.settings.notifications) return;
			fireWorkoutNotice("TrainUp", `Hoy toca ${routinesForToday(s.customRoutines)[0]?.name ?? "tu sesión de hoy"}`);
		}, wait);
		return () => window.clearTimeout(id);
	}, [userId, onboarded]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {})
	});
	const showNav = onboarded && !session;
	const activeTab = onboarded ? tab : "home";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		tab: activeTab,
		onChange: setTab,
		showNav,
		children: !rehydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-dvh flex-1 items-center justify-center bg-bg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {})
		}) : !onboarded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {}) : session ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-dvh flex-1 flex-col",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionView, {})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto min-h-0 w-full max-w-xl flex-1 overflow-y-auto px-5 pb-24 pt-8 safe-top lg:max-w-2xl lg:pb-8 lg:pt-10",
				children: [
					tab === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeView, {}) : null,
					tab === "train" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainView, {}) : null,
					tab === "create" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateView, {}) : null,
					tab === "progress" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressView, {}) : null,
					tab === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileView, {}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {
				tab: activeTab,
				onChange: setTab,
				className: "lg:hidden"
			})]
		})
	});
}
//#endregion
export { Home as component };
