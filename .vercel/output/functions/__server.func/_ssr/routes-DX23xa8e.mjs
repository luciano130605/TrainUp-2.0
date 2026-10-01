import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import "./client-BjbFQbVA.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react_dom } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-BDw_iiIj.mjs";
import { a as isTestMode, c as useCurrentUserState, n as cn, o as uid, r as disableTestModeAndNotify, s as useCurrentUser, t as Mark } from "./mark-tYtoT43K.mjs";
import { n as Splash, r as createSsrRpc, t as RedirectToSignIn } from "./splash-B6Z2bm4t.mjs";
import { i as hasGateSessionMarker } from "./server-Di7WpRlU.mjs";
import { t as Button } from "./button-DT9aQ3-d.mjs";
import { C as Check, E as ArrowDown, S as ChevronDown, T as ArrowUp, _ as Minus, b as ChevronRight, c as Smartphone, d as Replace, f as Repeat, g as Moon, h as Pause, i as Vibrate, l as Search, m as Play, n as X, o as Trash2, p as Plus, r as Volume2, s as Timer, t as Zap, u as RotateCcw, v as History, w as Bell, x as ChevronLeft, y as Dumbbell } from "../_libs/lucide-react.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { a as startOfWeek, i as startOfMonth, n as isToday, o as addMonths, r as format, t as es } from "../_libs/date-fns.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DX23xa8e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
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
/**
* Equipment shown under the exercise name, on its own line. Kept deliberately
* short so it reads as a tag ("Espalda · Máquina"), not a sentence.
*/
var EQUIPMENT_LABEL = {
	barra: "Barra",
	mancuernas: "Mancuernas",
	maquina: "Máquina",
	"peso-corporal": "Peso corporal",
	kettlebell: "Kettlebell",
	polea: "Polea",
	banco: "Banco",
	smith: "Máquina Smith"
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
		id: "press-inclinado-manc",
		name: "Press inclinado con mancuernas",
		muscle: "pecho",
		secondary: ["hombros", "triceps"],
		equipment: "mancuernas",
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
		equipment: "polea",
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
		id: "aperturas-maquina",
		name: "Aperturas en máquina",
		muscle: "pecho",
		secondary: ["hombros"],
		equipment: "maquina",
		cues: [
			"Sentado con la espalda apoyada en el respaldo",
			"Manos a la altura del pecho, codos ligeramente flexionados",
			"Juntá los brazos al frente apretando el pecho",
			"Pausa de 1 segundo al cerrar",
			"Volvé abriendo lento, sin soltar el peso"
		],
		defaultSets: 3,
		defaultReps: 12,
		restSec: 60,
		compound: false,
		gif: "/media/aperturas-maquina.svg"
	},
	{
		id: "press-pecho-maquina",
		name: "Press de pecho en máquina",
		muscle: "pecho",
		secondary: ["triceps", "hombros"],
		equipment: "maquina",
		cues: [
			"Regulá el asiento para que los puños queden a la altura del pecho",
			"Espalda apoyada y escápulas juntas",
			"Empujá al frente sin trabar los codos",
			"Volvé controlando hasta sentir el estiramiento"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 90,
		compound: true,
		gif: "/media/press-pecho-maquina.svg"
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
		name: "Jalón al pecho abierto",
		muscle: "espalda",
		secondary: ["biceps"],
		equipment: "maquina",
		cues: ["Lleva la barra hacia la parte superior del pecho manteniendo una ligera inclinación del torso hacia atrás sin balancearte."],
		defaultSets: 3,
		defaultReps: 8,
		restSec: 90,
		compound: true
	},
	{
		id: "jalon-cerrado",
		name: "Jalón al pecho cerrado",
		muscle: "espalda",
		secondary: ["biceps"],
		equipment: "maquina",
		cues: [
			"Pecho alto",
			"Codos pegados al cuerpo",
			"No balancear"
		],
		defaultSets: 3,
		defaultReps: 8,
		restSec: 90,
		compound: true
	},
	{
		id: "remo-punta",
		name: "Remo en punta",
		muscle: "espalda",
		secondary: ["biceps"],
		equipment: "maquina",
		cues: ["Mantén el pecho firme contra el apoyo para no meter zona lumbar y saca la fuerza de las escápulas."],
		defaultSets: 3,
		defaultReps: 8,
		restSec: 90,
		compound: true
	},
	{
		id: "remo-sentado-maquina",
		name: "Remo sentado en máquina",
		muscle: "espalda",
		secondary: ["biceps", "hombros"],
		equipment: "maquina",
		cues: ["Los codos abiertos en un ángulo de 45° a 60° respecto al cuerpo. Junta las escápulas al final de cada repetición."],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 90,
		compound: true,
		gif: "/media/remo-sentado-maquina.png"
	},
	{
		id: "remo-unilateral",
		name: "Remo unilateral",
		muscle: "espalda",
		secondary: ["biceps"],
		equipment: "polea",
		cues: ["Lleva el codo hacia la cadera manteniendo el brazo pegado al torso y evita rotar el tronco al tirar."],
		defaultSets: 3,
		defaultReps: 8,
		restSec: 90,
		compound: true
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
		muscle: "hombros",
		secondary: ["espalda"],
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
		id: "press-militar-mancuernas",
		name: "Press militar sentado",
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
		id: "laterales.polea",
		name: "Elevaciones laterales en polea",
		muscle: "hombros",
		equipment: "polea",
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
		id: "aperturas-posteriores-maquina",
		name: "Aperturas inversas en máquina",
		muscle: "hombros",
		secondary: ["espalda"],
		equipment: "maquina",
		cues: [
			"Pecho apoyado en el respaldo",
			"Brazos casi extendidos frente a vos",
			"Abrí hacia atrás llevando los codos",
			"Apretá la parte de atrás del hombro",
			"Volvé controlando"
		],
		defaultSets: 3,
		defaultReps: 12,
		restSec: 45,
		compound: false,
		gif: "/media/aperturas-posteriores-maquina.svg"
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
		id: "curl-femoral-sentado",
		name: "Curl femoral sentado",
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
		equipment: "smith",
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
		compound: false
	},
	{
		id: "extension-triceps",
		name: "Extensión de tríceps con soga",
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
		name: "Remo ergómetro",
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
	},
	{
		id: "gemelos-sentado",
		name: "Elevación de gemelos sentado",
		muscle: "gemelos",
		equipment: "maquina",
		cues: [
			"Rodillas bajo la almohadilla",
			"Pausa arriba",
			"Estirá abajo sin rebotar"
		],
		defaultSets: 4,
		defaultReps: 15,
		restSec: 45,
		compound: false
	},
	{
		id: "press-hombro-mancuernas",
		name: "Press de hombros con mancuernas",
		muscle: "hombros",
		secondary: ["triceps"],
		equipment: "mancuernas",
		cues: [
			"Muñecas sobre el codo",
			"Costillas abajo",
			"Sin impulso"
		],
		defaultSets: 3,
		defaultReps: 10,
		restSec: 90,
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
/** Maps free-text body parts (search aliases) onto the app's muscle ids. */
function muscleFromToken(raw) {
	return MUSCLE_BY_TOKEN[normalizeToken(raw)];
}
/**
* Collapses a movement to a comparable key so the same exercise can't be
* listed twice: the equipment is part of the key (the app renders it on its own
* line, so "Press de banca" and "Press de banca (Barra)" are one row) and the
* name is normalised so accents/punctuation do not split a duplicate.
*/
function exerciseKey(name, equipment) {
	return `${normalizeToken(name)}|${equipment}`;
}
/**
* Merges entries that describe the same movement on the same equipment. The
* first one wins — the list is ordered so the richer, curated entry lands
* first — and the survivor absorbs any demonstration clip the duplicate had.
*/
function dedupeExercises(exercises) {
	const seenId = /* @__PURE__ */ new Set();
	const seenKey = /* @__PURE__ */ new Set();
	const out = [];
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
var ALL_EXERCISES = dedupeExercises(EXERCISES);
var byId = new Map(ALL_EXERCISES.map((e) => [e.id, e]));
function getExercise(id) {
	return byId.get(id) ?? ALL_EXERCISES[0];
}
/**
* Search the catalogue by name, with a muscle filter. Also matches the search
* alias for a body part ("dorsal", "femoral") so older free-text habits still
* land on the right movements.
*/
function searchExercises(query, muscle = "todos") {
	const q = normalizeToken(query);
	const aliasMuscle = q ? muscleFromToken(q) : void 0;
	const matches = (ex) => {
		if (muscle !== "todos" && ex.muscle !== muscle) return false;
		if (!q) return true;
		if (aliasMuscle) return ex.muscle === aliasMuscle || ex.secondary?.includes(aliasMuscle);
		return normalizeToken(ex.name).includes(q);
	};
	const hits = ALL_EXERCISES.filter(matches);
	if (!aliasMuscle) return hits;
	return hits.sort((a, b) => {
		const rank = (ex) => ex.muscle === aliasMuscle ? 0 : 1;
		return rank(a) - rank(b);
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
				exerciseId: "remo-sentado-maquina",
				sets: 3,
				reps: 10,
				restSec: 90
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
				exerciseId: "remo-sentado-maquina",
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
		id: "maquinas",
		name: "Circuito de máquinas",
		focus: "Máquinas guiadas, sin barra libre",
		durationMin: 45,
		level: "principiante",
		cover: "dumbbells",
		exercises: [
			{
				exerciseId: "aperturas-maquina",
				sets: 3,
				reps: 12,
				restSec: 60
			},
			{
				exerciseId: "aperturas-posteriores-maquina",
				sets: 3,
				reps: 12,
				restSec: 45
			},
			{
				exerciseId: "jalon-cerrado",
				sets: 3,
				reps: 10,
				restSec: 90
			},
			{
				exerciseId: "press-pecho-maquina",
				sets: 3,
				reps: 10,
				restSec: 90
			},
			{
				exerciseId: "remo-sentado-maquina",
				sets: 3,
				reps: 10,
				restSec: 90
			},
			{
				exerciseId: "extension-cuad",
				sets: 3,
				reps: 12,
				restSec: 60
			},
			{
				exerciseId: "curl-femoral-sentado",
				sets: 3,
				reps: 12,
				restSec: 60
			},
			{
				exerciseId: "gemelos-sentado",
				sets: 4,
				reps: 15,
				restSec: 45
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
		"maquinas",
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
function greeting(now = /* @__PURE__ */ new Date()) {
	const h = now.getHours();
	if (h < 6) return "Buena madrugada";
	if (h < 12) return "Buenos días";
	if (h < 19) return "Buenas tardes";
	return "Buenas noches";
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
var WEEKDAY_FULL = [
	"Lunes",
	"Martes",
	"Miércoles",
	"Jueves",
	"Viernes",
	"Sábado",
	"Domingo"
];
function weekdayShort(iso) {
	return WEEKDAY_SHORT[(iso - 1 + 7) % 7] ?? "";
}
function firstName(name) {
	return name.trim().split(/\s+/)[0] || "atleta";
}
var config = {
	sound: true,
	vibration: true,
	haptics: false,
	volume: 70,
	tone: "clasico"
};
/** Call once from the store whenever settings change (and on hydrate). */
function applyAudioSettings(settings) {
	config.sound = settings.sound;
	config.vibration = settings.vibration;
	config.haptics = settings.haptics;
	config.volume = Math.min(100, Math.max(0, settings.volume));
	config.tone = settings.tone;
}
function hapticsEnabled() {
	return config.haptics;
}
var ctx = null;
function getCtx() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const Ctor = window.AudioContext || window.webkitAudioContext;
		if (!Ctor) return null;
		try {
			ctx = new Ctor();
		} catch {
			return null;
		}
	}
	return ctx;
}
/**
* iOS ships the clicker in a "suspended" state until a real user gesture
* resumes it, so every first tap anywhere in the app unlocks audio. We attach a
* one-shot listener so the very first chime of a rest is never swallowed.
*/
function unlockAudio() {
	const audio = getCtx();
	if (!audio) return;
	audio.resume().catch(() => {});
	if (typeof document === "undefined") return;
	const once = () => {
		getCtx()?.resume().catch(() => {});
		document.removeEventListener("pointerdown", once);
		document.removeEventListener("touchstart", once);
	};
	document.addEventListener("pointerdown", once, { once: true });
	document.addEventListener("touchstart", once, { once: true });
}
/** Tone recipes per sound preset, as a sequence of notes. */
var TONES$1 = {
	clasico: {
		tick: [{
			freq: 660,
			dur: .12
		}],
		done: [
			{
				freq: 523,
				dur: .22
			},
			{
				freq: 784,
				dur: .22,
				delay: .12
			},
			{
				freq: 1046,
				dur: .22,
				delay: .24
			}
		]
	},
	campana: {
		tick: [{
			freq: 880,
			dur: .5,
			type: "triangle"
		}],
		done: [
			{
				freq: 880,
				dur: .9,
				type: "triangle"
			},
			{
				freq: 1318,
				dur: .7,
				type: "sine",
				delay: .05
			},
			{
				freq: 1760,
				dur: .5,
				type: "sine",
				delay: .1
			}
		]
	},
	suave: {
		tick: [{
			freq: 494,
			dur: .05,
			type: "sine"
		}],
		done: [{
			freq: 587,
			dur: .18,
			type: "sine"
		}, {
			freq: 784,
			dur: .3,
			type: "sine",
			delay: .1
		}]
	},
	digital: {
		tick: [{
			freq: 1200,
			dur: .05,
			type: "square"
		}],
		done: [
			{
				freq: 1200,
				dur: .08,
				type: "square"
			},
			{
				freq: 1600,
				dur: .08,
				type: "square",
				delay: .09
			},
			{
				freq: 2e3,
				dur: .14,
				type: "square",
				delay: .18
			}
		]
	}
};
function play(notes, gain) {
	const audio = getCtx();
	if (!audio) return;
	audio.resume().catch(() => {});
	const now = audio.currentTime;
	for (const note of notes) {
		const osc = audio.createOscillator();
		const amp = audio.createGain();
		osc.type = note.type ?? "sine";
		osc.frequency.value = note.freq;
		const t = now + (note.delay ?? 0);
		amp.gain.setValueAtTime(1e-4, t);
		amp.gain.exponentialRampToValueAtTime(Math.max(2e-4, gain), t + .02);
		amp.gain.exponentialRampToValueAtTime(1e-4, t + note.dur);
		osc.connect(amp);
		amp.connect(audio.destination);
		osc.start(t);
		osc.stop(t + note.dur + .02);
	}
}
/** Master volume scales the ceiling so "10%" really is barely there. */
function scaledGain(base) {
	return base * (config.volume / 100);
}
/** Rest finished, timer block ended, countdown beat. Silent when sound is off. */
function chime(kind = "done") {
	if (!config.sound) return;
	const recipe = TONES$1[config.tone] ?? TONES$1.clasico;
	if (kind === "countdown") {
		play([{
			freq: 720,
			dur: .07,
			type: "square"
		}], scaledGain(.04));
		return;
	}
	if (kind === "tick") {
		play(recipe.tick, scaledGain(.06));
		return;
	}
	play(recipe.done, scaledGain(.08));
}
/** Plays a tone on demand for the picker in Ajustes, ignoring the on/off toggle. */
function previewSound(tone = config.tone) {
	play((TONES$1[tone] ?? TONES$1.clasico).done, scaledGain(.09));
}
function vibrate(pattern) {
	if (typeof navigator === "undefined") return false;
	const nav = navigator;
	if (typeof nav.vibrate !== "function") return false;
	try {
		return nav.vibrate(pattern);
	} catch {
		return false;
	}
}
/**
* Buzz for a finished rest.
*
* iOS Safari has never implemented `navigator.vibrate`, so a plain call is a
* silent no-op on an iPhone. There the only lever left is the audio clicker: a
* very low, very short burst reads as a tactile thump through the phone's
* speaker, doubled so it feels like a pulse rather than a beep. On Android the
* real vibration motor wins and we never get here.
*/
function pulse(pattern = [
	28,
	40,
	48
]) {
	if (!config.vibration) return;
	if (vibrate(pattern)) return;
	iosHapticThump();
}
/** Single short buzz for a tap. No-op on iOS, which has no vibrate API. */
function tapFeedback() {
	if (!config.haptics) return;
	vibrate(12);
}
function iosHapticThump() {
	if (!config.sound) return;
	const audio = getCtx();
	if (!audio) return;
	audio.resume().catch(() => {});
	const now = audio.currentTime;
	for (const offset of [0, .09]) {
		const osc = audio.createOscillator();
		const amp = audio.createGain();
		osc.type = "sine";
		osc.frequency.setValueAtTime(110, now + offset);
		osc.frequency.exponentialRampToValueAtTime(45, now + offset + .06);
		amp.gain.setValueAtTime(1e-4, now + offset);
		amp.gain.exponentialRampToValueAtTime(Math.max(2e-4, scaledGain(.18)), now + offset + .008);
		amp.gain.exponentialRampToValueAtTime(1e-4, now + offset + .07);
		osc.connect(amp);
		amp.connect(audio.destination);
		osc.start(now + offset);
		osc.stop(now + offset + .09);
	}
}
/** True when the device exposes a real vibration motor (Android, not iOS). */
function hasRealVibration() {
	if (typeof navigator === "undefined") return false;
	return typeof navigator.vibrate === "function";
}
var KEY = "trainup-theme";
var AUTO_KEY = "trainup-auto-theme";
/** Mirrors the auto-theme setting for the pre-hydration boot script. */
function rememberAutoTheme(on) {
	try {
		window.localStorage.setItem(AUTO_KEY, on ? "1" : "0");
	} catch {}
}
/** What the phone itself is set to — "dark" unless it asks for light. */
function matchSystemTheme() {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "dark";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	document.documentElement.dataset.theme = theme;
	const color = theme === "light" ? "#f3f4ef" : "#090a09";
	const metas = document.querySelectorAll("meta[name=\"theme-color\"]");
	for (const meta of metas) meta.setAttribute("content", color);
	const statusBar = document.querySelector("meta[name=\"apple-mobile-web-app-status-bar-style\"]");
	if (statusBar) statusBar.setAttribute("content", theme === "light" ? "default" : "black-translucent");
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
	vibration: true,
	sound: true,
	volume: 70,
	tone: "clasico",
	countdownSound: true,
	haptics: false,
	autoTheme: false,
	prefillLastWeight: true,
	autoAdvance: true,
	defaultRestSec: 90,
	minPlateKg: 1.25,
	weeklyGoal: 4
};
/** Rest lengths offered in Ajustes, in seconds. */
var REST_PRESETS = [
	{
		id: "30",
		label: "30s",
		sec: 30
	},
	{
		id: "60",
		label: "1 min",
		sec: 60
	},
	{
		id: "90",
		label: "1:30",
		sec: 90
	},
	{
		id: "120",
		label: "2 min",
		sec: 120
	},
	{
		id: "180",
		label: "3 min",
		sec: 180
	}
];
var STORE_VERSION = 1;
function lastLoad(history, exerciseId) {
	for (const session of history) {
		const last = session.exercises.find((e) => e.exerciseId === exerciseId)?.sets.at(-1);
		if (last) return last;
	}
	return null;
}
function buildSession(routine, history, prefillLastWeight) {
	return {
		routineId: routine.id,
		routineName: routine.name,
		startedAt: Date.now(),
		currentIndex: 0,
		restUntil: null,
		restTotalSec: 0,
		exercises: routine.exercises.map((slot) => {
			const ex = getExercise(slot.exerciseId);
			const prev = prefillLastWeight ? lastLoad(history, slot.exerciseId) : null;
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
		rememberAutoTheme(snap.settings.autoTheme);
		applyTheme(snap.settings.theme);
		applyAudioSettings(snap.settings);
		set({
			...snap,
			hydrated: true
		});
	},
	beginFreshAccount: () => {
		applyTheme(defaultSettings.theme);
		applyAudioSettings(defaultSettings);
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
		applyAudioSettings(s.settings);
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
		unlockAudio();
		set((s) => {
			const settings = {
				...s.settings,
				...patch
			};
			if (patch.theme) applyTheme(patch.theme);
			if (patch.autoTheme != null) rememberAutoTheme(patch.autoTheme);
			applyAudioSettings(settings);
			return { settings };
		});
		queueSave(get);
	},
	startRoutine: (routine) => set((s) => ({
		session: buildSession(routine, s.history, s.settings.prefillLastWeight),
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
			const updated = exercises[exerciseIndex];
			if (s.settings.autoAdvance && updated.sets.every((st) => st.completed) && exerciseIndex < exercises.length - 1) currentIndex = exerciseIndex + 1;
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
					weightKg: s.settings.prefillLastWeight ? prev?.weightKg ?? 0 : 0,
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
	setMonthWeight: (monthISO, weightKg) => {
		set((s) => {
			const date = `${monthISO}-01`;
			return {
				bodyLogs: [...s.bodyLogs.filter((l) => !l.date.startsWith(monthISO)), {
					date,
					weightKg
				}].sort((a, b) => a.date.localeCompare(b.date)),
				profile: monthISO === (/* @__PURE__ */ new Date()).toISOString().slice(0, 7) ? {
					...s.profile,
					bodyWeightKg: weightKg
				} : s.profile
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
/**
* True while the on-screen keyboard is covering the viewport.
*
* There is no "keyboard" event: browsers only shrink the *visual* viewport, so
* a gap between `window.innerHeight` and `visualViewport.height` beyond a
* tolerant threshold is the keyboard. The threshold matters — mobile Safari
* reports a few pixels of difference just from a collapsing address bar, and
* reacting to that would flicker the tab bar on every scroll.
*/
function useKeyboardOpen(thresholdPx = 140) {
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const viewport = window.visualViewport;
		if (!viewport) return;
		const update = () => {
			const covered = window.innerHeight - viewport.height;
			const zoomed = Math.abs((viewport.scale ?? 1) - 1) > .05;
			setOpen(!zoomed && covered > thresholdPx);
		};
		update();
		viewport.addEventListener("resize", update);
		viewport.addEventListener("scroll", update);
		return () => {
			viewport.removeEventListener("resize", update);
			viewport.removeEventListener("scroll", update);
		};
	}, [thresholdPx]);
	return open;
}
function HomeIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 17.5V13.5" })]
	});
}
function HomeFillIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z",
			fill: "currentColor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M17 17.5V13.5",
			stroke: "white"
		})]
	});
}
function RunIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 4.5C17 5.32843 16.3284 6 15.5 6C14.6716 6 14 5.32843 14 4.5C14 3.67157 14.6716 3 15.5 3C16.3284 3 17 3.67157 17 4.5Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M15 21.0008L14.3359 18.3848C14.1161 17.5191 13.6615 16.7284 13.0207 16.0974L11.5 14.5998M20 8.19913C17.9627 10.4921 16.1547 10.1433 15 9.27743C14.8878 9.19326 14.7664 9.06672 14.6482 8.92548C14.2356 8.43256 14.0293 8.18609 13.8282 8.09214C13.6271 7.99818 13.3747 7.99813 12.8698 7.99805C12.5444 7.99799 12.2186 7.99877 12 8.00136C8.53767 8.0423 7 9.18366 6 11.1534M12 8.00136L10.7309 9.95956C10.0332 11.0362 9.68429 11.5745 9.67069 12.1397C9.66463 12.3914 9.70617 12.642 9.79313 12.8784C9.98834 13.409 10.4922 13.8059 11.5 14.5998M15 9.27743L11.5 14.5998",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M4 17.7303L4.67822 17.8916C6.40663 18.3028 8.20324 17.5164 9 16",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			})
		]
	});
}
function RunFillIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M17 4.5C17 5.32843 16.3284 6 15.5 6C14.6716 6 14 5.32843 14 4.5C14 3.67157 14.6716 3 15.5 3C16.3284 3 17 3.67157 17 4.5Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M15 21.0008L14.3359 18.3848C14.1161 17.5191 13.6615 16.7284 13.0207 16.0974L11.5 14.5998M20 8.19913C17.9627 10.4921 16.1547 10.1433 15 9.27743C14.8878 9.19326 14.7664 9.06672 14.6482 8.92548C14.2356 8.43256 14.0293 8.18609 13.8282 8.09214C13.6271 7.99818 13.3747 7.99813 12.8698 7.99805C12.5444 7.99799 12.2186 7.99877 12 8.00136C8.53767 8.0423 7 9.18366 6 11.1534M12 8.00136L10.7309 9.95956C10.0332 11.0362 9.68429 11.5745 9.67069 12.1397C9.66463 12.3914 9.70617 12.642 9.79313 12.8784C9.98834 13.409 10.4922 13.8059 11.5 14.5998M15 9.27743L11.5 14.5998",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M4 17.7303L4.67822 17.8916C6.40663 18.3028 8.20324 17.5164 9 16",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				fill: "currentColor"
			})
		]
	});
}
function AddIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 8.00005V16.0001M16 12.0001L8 12.0001" })
	});
}
function AddFillIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 8.00005V16.0001M16 12.0001L8 12.0001",
			color: "#6ee7b7"
		})
	});
}
function ProgressIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "10",
			stroke: "currentColor",
			"stroke-width": "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 4.5C13.4834 4.5 14.9334 4.93987 16.1668 5.76398C17.4001 6.58809 18.3614 7.75943 18.9291 9.12987C19.4968 10.5003 19.6453 12.0083 19.3559 13.4632C19.0665 14.918 18.3522 16.2544 17.3033 17.3033C16.2544 18.3522 14.918 19.0665 13.4632 19.3559C12.0083 19.6453 10.5003 19.4968 9.12987 18.9291C7.75943 18.3614 6.58809 17.4001 5.76398 16.1668C4.93987 14.9334 4.5 13.4834 4.5 12H12V4.5Z",
			stroke: "currentColor"
		})]
	});
}
function ProgressFillIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "10",
			stroke: "currentColor",
			"stroke-width": "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 4.5C13.4834 4.5 14.9334 4.93987 16.1668 5.76398C17.4001 6.58809 18.3614 7.75943 18.9291 9.12987C19.4968 10.5003 19.6453 12.0083 19.3559 13.4632C19.0665 14.918 18.3522 16.2544 17.3033 17.3033C16.2544 18.3522 14.918 19.0665 13.4632 19.3559C12.0083 19.6453 10.5003 19.4968 9.12987 18.9291C7.75943 18.3614 6.58809 17.4001 5.76398 16.1668C4.93987 14.9334 4.5 13.4834 4.5 12H12V4.5Z",
			fill: "#6ee7b7"
		})]
	});
}
function UserIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "6.99988",
			r: "4"
		})]
	});
}
function UserFillIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",
			fill: "currentColor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "6.99988",
			r: "4",
			fill: "currentColor"
		})]
	});
}
var TAB_ITEMS = [
	{
		id: "home",
		label: "Inicio",
		icon: HomeIcon,
		iconFill: HomeFillIcon
	},
	{
		id: "train",
		label: "Entrenar",
		icon: RunIcon,
		iconFill: RunFillIcon
	},
	{
		id: "create",
		label: "Crear",
		icon: AddIcon,
		iconFill: AddFillIcon
	},
	{
		id: "progress",
		label: "Progreso",
		icon: ProgressIcon,
		iconFill: ProgressFillIcon
	},
	{
		id: "profile",
		label: "Yo",
		icon: UserIcon,
		iconFill: UserFillIcon
	}
];
function TabBar({ tab, onChange, className }) {
	const typing = useKeyboardOpen();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Navegación principal",
		className: cn("tab-bar-fixed z-50 shrink-0 border-t border-line bg-surface/95 px-2 pt-1 shadow-[0_-16px_32px_rgb(0_0_0_/_0.18)] backdrop-blur transition-transform duration-200", typing && "pointer-events-none translate-y-full", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-5",
			children: TAB_ITEMS.map((item) => {
				const active = tab === item.id;
				const Icon = active ? item.iconFill ?? item.icon : item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onChange(item.id),
					"aria-current": active ? "page" : void 0,
					className: cn("group flex h-16 w-full flex-col items-center justify-center gap-0.5 rounded-xl pressable transition-colors", active ? "text-accent" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: cn("grid h-8 w-12 place-items-center rounded-full transition-all duration-300", active ? "scale-100 bg-accent/15" : "scale-90 bg-transparent"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-[22px]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-[10px] tracking-wide transition-transform duration-300", active ? "font-semibold -translate-y-px" : "font-medium"),
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
							const Icon = tab === item.id ? item.iconFill ?? item.icon : item.icon;
							const active = tab === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onChange(item.id),
								className: cn("flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium pressable", active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/60 hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
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
	const weeklyGoal = useTrain((s) => s.settings.weeklyGoal);
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
		className: "stagger-in space-y-4 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-[0.18em] text-muted",
							children: greeting()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-0.5 truncate font-display text-2xl leading-none",
							children: firstName(profile.name)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 truncate text-xs text-muted",
							children: longDate()
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
					value: weekSessions.length / Math.max(1, weeklyGoal),
					label: `${weekSessions.length}/${weeklyGoal}`,
					sub: "semana"
				})]
			}),
			lastSummary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-xl bg-elevated px-3.5 py-2.5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-8 shrink-0 place-items-center rounded-full bg-accent/15 text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-wider text-accent",
							children: "Sesión cerrada"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium leading-tight",
							children: lastSummary.routineName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-[11px] tabular-nums text-muted",
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
					className: "relative h-36 overflow-hidden rounded-2xl bg-elevated sm:h-48",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: COVER_SRC[today.cover],
							alt: "",
							className: "absolute inset-0 size-full object-cover",
							loading: "eager"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-bg via-bg/70 to-bg/10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 p-3.5 sm:p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-[0.2em] text-accent",
									children: trainedToday ? "Listo por hoy" : scheduled.some((r) => r.id === today.id) ? "Programada" : "Te toca"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-0.5 truncate font-display text-2xl leading-none sm:text-3xl",
									children: today.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 truncate text-xs text-fg/80",
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-2 flex h-11 items-center justify-center gap-1.5 rounded-xl bg-accent text-sm font-semibold text-accent-fg",
					children: [trainedToday ? "Repetir sesión" : "Empezar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
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
				className: "rounded-xl bg-elevated px-3.5 py-2.5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-wider text-accent",
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
									className: "truncate text-sm font-medium leading-tight",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-[11px] text-muted",
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
				className: "mb-2 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[11px] uppercase tracking-[0.16em] text-muted",
					children: "Recuperación"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] tabular-nums text-muted",
					children: [
						readyCount,
						"/",
						recovery.length,
						" listos"
					]
				})]
			}), recovering.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-surface px-3.5 py-3 text-xs text-muted shadow-[var(--shadow-border)]",
				children: history.length > 0 ? "Todos los grupos están recuperados. Dale." : "Cuando entrenes, acá vas a ver qué grupo está listo."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
				children: recovering.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoveryRow, { status: m }, m.muscle))
			})] }),
			last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[11px] uppercase tracking-[0.16em] text-muted",
					children: "Última sesión"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex items-center gap-0.5 text-[11px] text-muted",
					onClick: () => setTab("progress"),
					children: ["Historial", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setTab("progress"),
				className: "flex w-full items-center justify-between gap-3 rounded-xl bg-surface px-3.5 py-3 text-left shadow-[var(--shadow-border)] pressable",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium leading-tight",
						children: last.routineName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-[11px] text-muted",
						children: [
							formatVolume(last.volumeKg, unit),
							" · ",
							last.setsCompleted,
							" series"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shrink-0 text-xs tabular-nums text-muted",
					children: formatDuration(last.endedAt - last.startedAt)
				})]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "El primer entrenamiento es el que cuenta."
			}),
			latestPr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-xl bg-surface px-3.5 py-2.5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-wider text-muted",
						children: "Mejor marca"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium leading-tight",
						children: getExercise(latestPr.exerciseId).name
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "shrink-0 font-display text-lg leading-none tabular-nums",
					children: [formatWeight(latestPr.weightKg, unit, false), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-0.5 text-[11px] text-muted",
						children: [
							unit,
							" × ",
							latestPr.reps
						]
					})]
				})]
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
		className: "flex items-center gap-2.5 px-3.5 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-16 shrink-0 text-[11px] uppercase tracking-wide text-fg/90",
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
				className: "w-10 shrink-0 text-right text-[11px] tabular-nums text-muted",
				children: status.ready ? "Listo" : `${Math.ceil(hoursLeft(status))} h`
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 rounded-xl bg-surface px-3 py-2 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] uppercase tracking-wider text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 truncate font-display text-lg leading-none tabular-nums sm:text-2xl",
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
		if (!editing) return;
		const input = inputRef.current;
		if (!input) return;
		const raf = window.requestAnimationFrame(() => {
			input.focus();
			input.select();
		});
		return () => window.cancelAnimationFrame(raf);
	}, [editing]);
	function commitDraft() {
		const normalized = draft.trim().replace(",", ".").replace(/[^0-9.]/g, "");
		const parsed = Number(normalized);
		if (normalized && Number.isFinite(parsed)) onChange(Math.max(min, Math.round(parsed * 10) / 10));
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
				className: "flex h-full min-w-0 flex-1 flex-col items-center justify-center",
				children: [editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					value: draft,
					type: "text",
					inputMode: "decimal",
					enterKeyHint: "done",
					autoComplete: "off",
					"aria-label": suffix ? `Escribir ${suffix}` : "Escribir valor",
					onChange: (e) => setDraft(e.target.value),
					onBlur: commitDraft,
					onKeyDown: (e) => {
						if (e.key === "Enter") e.currentTarget.blur();
						else if (e.key === "Escape") cancelDraft();
					},
					className: "h-7 w-full min-w-0 bg-transparent text-center font-display text-xl leading-none tabular-nums outline-none"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex h-full w-full min-w-0 flex-col items-center justify-center rounded px-1 pressable",
					onClick: () => setEditing(true),
					"aria-label": suffix ? `Editar ${shown} ${suffix}` : `Editar ${shown}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl leading-none tabular-nums",
						children: shown
					}), suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-wider text-muted",
						children: suffix
					}) : null]
				}), editing && suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
	const countdownSound = useTrain((s) => s.settings.countdownSound);
	const lastBeep = (0, import_react.useRef)(0);
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
		if (countdownSound && mode !== "emom" && mode !== "tabata") {
			const left = Math.ceil(target - elapsed);
			if (left > 0 && left <= 3 && lastBeep.current !== left) {
				lastBeep.current = left;
				chime("countdown");
			}
		}
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
		round,
		countdownSound
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
		lastBeep.current = 0;
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
	const extras = useTrain((s) => s.customRoutines);
	const startRoutine = useTrain((s) => s.startRoutine);
	const [mode, setMode] = (0, import_react.useState)("rutinas");
	const today = isoWeekday();
	const byDay = (0, import_react.useMemo)(() => [...extras].sort((a, b) => {
		return ((a.scheduleDays ?? []).length ? Math.min(...a.scheduleDays ?? []) : 99) - ((b.scheduleDays ?? []).length ? Math.min(...b.scheduleDays ?? []) : 99) || a.name.localeCompare(b.name, "es");
	}), [extras]);
	const week = (0, import_react.useMemo)(() => [
		1,
		2,
		3,
		4,
		5,
		6,
		7
	].map((day) => ({
		day,
		routines: byDay.filter((r) => (r.scheduleDays ?? []).includes(day))
	})), [byDay]);
	const unscheduled = byDay.filter((r) => !(r.scheduleDays ?? []).length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: "Entrenar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-3 gap-1 rounded-xl bg-surface p-1 shadow-[var(--shadow-border)]",
					children: [
						["rutinas", "Rutinas"],
						["semana", "Semana"],
						["timer", "Timer"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
				}) : byDay.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoutineCard, {
					routine: r,
					onStart: () => startRoutine(r),
					startLabel: "Empezar",
					extra: (r.scheduleDays ?? []).length ? (r.scheduleDays ?? []).map((d) => WEEKDAY_SHORT[d - 1]).join(" · ") : "Sin día asignado"
				}, r.id))
			}) : null,
			mode === "semana" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4 pb-8 stagger-in",
				children: extras.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Todavía no tenés rutinas propias. Creá una y asignale un día para verla acá."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [week.map(({ day, routines }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight",
						children: WEEKDAY_FULL[day - 1]
					}), day === today ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-accent/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent",
						children: "Hoy"
					}) : null]
				}), routines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Descanso."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2",
					children: routines.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => startRoutine(r),
						className: "flex w-full items-center justify-between rounded-xl bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)] pressable",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate font-medium",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block truncate text-xs text-muted",
								children: [
									r.exercises.length,
									" ejercicios · ",
									r.durationMin,
									" min"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0 text-muted" })]
					}) }, r.id))
				})] }, day)), unscheduled.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl tracking-tight",
					children: "Sin día"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2",
					children: unscheduled.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => startRoutine(r),
						className: "flex w-full items-center justify-between rounded-xl bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)] pressable",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate font-medium",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-xs text-muted",
								children: "Asignale un día al editarla"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0 text-muted" })]
					}) }, r.id))
				})] }) : null] })
			}) : null,
			mode === "timer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerView, {}) : null
		]
	});
}
function RoutineCard({ routine, onStart, onOpen, onDelete, onEdit, extra, startLabel = "Entrenar" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onOpen ?? onStart,
			className: "block w-full text-left pressable",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
			})
		}), onStart || onDelete || onEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-end gap-1 px-3 pb-3",
			children: [
				onStart ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onStart,
					className: "flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-accent pressable",
					children: startLabel
				}) : null,
				onEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onEdit,
					className: "flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-fg pressable ",
					children: "Editar"
				}) : null,
				onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onDelete,
					className: "h-11 rounded-lg px-3 text-sm text-danger pressable",
					children: "Eliminar"
				}) : null
			]
		}) : null]
	});
}
/**
* Read-only summary of a routine — what the athlete will actually do, movement
* by movement — plus the way in. Tapping a routine should never dump somebody
* straight into a live session, so this sheet sits between the card and the
* start button, and the choice to train is explicit.
*/
function RoutineSummary({ routine, onClose, onStart }) {
	const unit = useTrain((s) => s.profile.unit);
	const totalSets = routine.exercises.reduce((n, slot) => n + slot.sets, 0);
	const days = routine.scheduleDays ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: true,
		onClose,
		title: routine.name,
		subtitle: routine.focus,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			block: true,
			onClick: onStart,
			children: "Empezar rutina"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid grid-cols-3 gap-2 text-center",
					children: [
						[`${routine.exercises.length}`, "ejercicios"],
						[`${totalSets}`, "series"],
						[`${routine.durationMin}`, "min aprox."]
					].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-elevated px-2 py-3 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "sr-only",
								children: label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-display text-2xl leading-none tabular-nums",
								children: value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-[11px] uppercase tracking-wider text-muted",
								children: label
							})
						]
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						LEVEL_LABEL[routine.level],
						" · ",
						days.length ? `avisa los ${days.map((d) => WEEKDAY_SHORT[d - 1]).join(", ")}` : "sin día asignado"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1.5",
					children: routine.exercises.map((slot, i) => {
						const ex = getExercise(slot.exerciseId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline gap-3 rounded-xl bg-surface px-3 py-2.5 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-4 shrink-0 text-xs tabular-nums text-subtle",
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate font-medium",
										children: ex.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate text-xs text-muted",
										children: [
											MUSCLE_LABEL[ex.muscle],
											" · ",
											EQUIPMENT_LABEL[ex.equipment]
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 text-right text-xs tabular-nums text-muted",
									children: [
										slot.sets,
										" × ",
										slot.reps,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block text-subtle",
											children: [
												slot.weightKg ? `${formatWeight(slot.weightKg, unit)} · ` : "",
												slot.restSec,
												"s"
											]
										})
									]
								})
							]
						}, `${slot.exerciseId}-${i}`);
					})
				})
			]
		})
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate font-medium",
							children: ex.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block truncate text-xs text-muted",
							children: [
								MUSCLE_LABEL[ex.muscle],
								" · ",
								EQUIPMENT_LABEL[ex.equipment]
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 pl-3 text-xs tabular-nums text-muted",
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
/** The plates actually on the rack: drop anything smaller than the athlete's
*  smallest pair, so the plan never asks for a 0.5 kg sliver they don't own. */
function platesFor(minPlateKg) {
	const floor = Number.isFinite(minPlateKg) && minPlateKg > 0 ? minPlateKg : 1.25;
	return PLATE_KG.filter((p) => p >= floor - 1e-9);
}
function planPlates(targetKg, barKg, minPlateKg = 1.25) {
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
	for (const plate of platesFor(minPlateKg)) {
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
function CreateView() {
	const extras = useTrain((s) => s.customRoutines);
	const startRoutine = useTrain((s) => s.startRoutine);
	const deleteCustom = useTrain((s) => s.deleteCustomRoutine);
	const [mode, setMode] = (0, import_react.useState)("rutinas");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [previewId, setPreviewId] = (0, import_react.useState)(null);
	function openCreator(id) {
		setEditingId(id);
		setMode("crear");
	}
	const editing = editingId ? extras.find((r) => r.id === editingId) : void 0;
	const preview = previewId ? extras.find((r) => r.id === previewId) : void 0;
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
				children: [
					extras.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Todavía no tenés rutinas propias. Creá una y asignale un día: el inicio te avisa."
					}) : extras.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoutineCard, {
						routine: r,
						onStart: () => startRoutine(r),
						onOpen: () => setPreviewId(r.id),
						startLabel: "Empezar ahora",
						onEdit: () => openCreator(r.id),
						onDelete: () => deleteCustom(r.id),
						extra: (r.scheduleDays ?? []).length ? (r.scheduleDays ?? []).map((d) => WEEKDAY_SHORT[d - 1]).join(" · ") : "Sin día asignado"
					}, r.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						block: true,
						onClick: () => openCreator(null),
						children: "Nueva rutina"
					}),
					preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoutineSummary, {
						routine: preview,
						onClose: () => setPreviewId(null),
						onStart: () => {
							setPreviewId(null);
							startRoutine(preview);
						}
					}) : null
				]
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
	const defaultRestSec = useTrain((s) => s.settings.defaultRestSec);
	const isEdit = Boolean(routine);
	const [name, setName] = (0, import_react.useState)(routine?.name ?? "Mi rutina");
	const [picked, setPicked] = (0, import_react.useState)(routine?.exercises ?? []);
	const [days, setDays] = (0, import_react.useState)(routine?.scheduleDays ?? [isoToday()]);
	const [libOpen, setLibOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [swapIndex, setSwapIndex] = (0, import_react.useState)(null);
	function add(id) {
		const ex = getExercise(id);
		setPicked((p) => [...p, {
			exerciseId: id,
			sets: ex.defaultSets,
			reps: ex.defaultReps,
			restSec: defaultRestSec || ex.restSec
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
	/** Swap the movement but keep the sets/reps/rest/weight the athlete dialled in. */
	function swapExercise(index, exerciseId) {
		setPicked((prev) => prev.map((slot, i) => i === index ? {
			...slot,
			exerciseId
		} : slot));
		setSwapIndex(null);
	}
	/** Move a slot one position up (-1) or down (1) in the routine order. */
	function moveSlot(index, delta) {
		setPicked((prev) => {
			const target = index + delta;
			if (target < 0 || target >= prev.length) return prev;
			const next = [...prev];
			[next[index], next[target]] = [next[target], next[index]];
			return next;
		});
		setEditing((prev) => {
			if (prev === null || prev === "new") return prev;
			return prev === index ? index + delta : prev;
		});
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
						className: "rounded-xl bg-surface p-1 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
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
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 border-t border-line px-1 pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setSwapIndex(i),
									"aria-label": `Reemplazar ${ex.name}`,
									className: "flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg text-xs font-medium text-muted pressable",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "size-4 shrink-0" }), "Reemplazar"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => moveSlot(i, -1),
									disabled: i === 0,
									"aria-label": `Subir ${ex.name}`,
									className: "flex size-10 shrink-0 items-center justify-center rounded-lg text-muted pressable disabled:opacity-30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => moveSlot(i, 1),
									disabled: i === picked.length - 1,
									"aria-label": `Bajar ${ex.name}`,
									className: "flex size-10 shrink-0 items-center justify-center rounded-lg text-muted pressable disabled:opacity-30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
								})
							]
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
				open: swapIndex !== null,
				onClose: () => setSwapIndex(null),
				title: "Reemplazar",
				subtitle: swapIndex !== null ? `${getExercise(picked[swapIndex].exerciseId).name} sale de la rutina; elegí el que entra y mantenés series, reps y peso.` : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, {
					hideStartHint: true,
					onPick: (id) => swapIndex !== null && swapExercise(swapIndex, id)
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
	const minPlateKg = useTrain((s) => s.settings.minPlateKg);
	const rack = (0, import_react.useMemo)(() => platesFor(minPlateKg), [minPlateKg]);
	const [bar, setBar] = (0, import_react.useState)(20);
	const plan = (0, import_react.useMemo)(() => planPlates(Number(target) || 0, bar, minPlateKg), [
		target,
		bar,
		minPlateKg
	]);
	const maxH = 72;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 pb-10 stagger-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Decí cuánto querés levantar y cuánto pesa la barra. Armamos los discos por lado (",
					rack.join(" / "),
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
	const countdownSound = useTrain((s) => s.settings.countdownSound);
	const [now, setNow] = (0, import_react.useState)(Date.now());
	/** Seconds left on the rest timer when it was paused by hand, else null. */
	const [pausedRest, setPausedRest] = (0, import_react.useState)(null);
	/** Last whole second already announced by the 3-2-1 countdown. */
	const [beeped, setBeeped] = (0, import_react.useState)(null);
	const [picker, setPicker] = (0, import_react.useState)(false);
	const [showDetail, setShowDetail] = (0, import_react.useState)(false);
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
	const currentIndex = session?.currentIndex ?? 0;
	(0, import_react.useEffect)(() => {
		setShowDetail(false);
	}, [currentIndex]);
	(0, import_react.useEffect)(() => {
		if (!session?.restUntil) {
			setPausedRest(null);
			setBeeped(null);
		}
	}, [session?.restUntil]);
	(0, import_react.useEffect)(() => {
		if (!session?.restUntil || pausedRest != null) return;
		const left = Math.ceil((session.restUntil - now) / 1e3);
		if (left > 0) {
			if (countdownSound && left <= 3 && beeped !== left) {
				setBeeped(left);
				chime("countdown");
			}
			return;
		}
		if (rang) return;
		setRang(true);
		chime("done");
		pulse();
		skipRest();
	}, [
		now,
		session?.restUntil,
		rang,
		skipRest,
		countdownSound,
		beeped,
		pausedRest
	]);
	(0, import_react.useEffect)(() => {
		if (!hapticsEnabled()) return;
		const onDown = (e) => {
			if (e.target?.closest("button, [role='button'], input[type='range']")) tapFeedback();
		};
		document.addEventListener("pointerdown", onDown);
		return () => document.removeEventListener("pointerdown", onDown);
	}, []);
	if (!session) return null;
	const current = session.exercises[session.currentIndex];
	const exercise = getExercise(current.exerciseId);
	const countdown = session.restUntil ? Math.max(0, (session.restUntil - now) / 1e3) : 0;
	const remaining = pausedRest != null ? pausedRest : countdown;
	const resting = remaining > 0;
	const doneSets = session.exercises.reduce((n, ex) => n + ex.sets.filter((s) => s.completed).length, 0);
	const totalSets = session.exercises.reduce((n, ex) => n + ex.sets.length, 0);
	const elapsed = now - session.startedAt;
	const nextIndex = session.exercises.findIndex((ex, i) => i > session.currentIndex && ex.sets.some((st) => !st.completed));
	const nextExercise = nextIndex >= 0 ? getExercise(session.exercises[nextIndex].exerciseId) : void 0;
	const currentDone = current.sets.filter((st) => st.completed).length;
	const openSet = current.sets.find((st) => !st.completed);
	const nextUp = openSet ? `${formatWeight(openSet.weightKg, unit)} × ${openSet.reps}` : nextExercise?.name;
	function pauseRest() {
		setPausedRest(countdown);
	}
	function tap() {
		tapFeedback();
	}
	function resumeRest() {
		if (pausedRest == null) return;
		addRest(pausedRest - countdown);
		setPausedRest(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full min-h-0 flex-1 flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-center gap-2 border-b border-line px-4 pb-3 pt-8 safe-top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "-ml-2 flex size-11 shrink-0 items-center justify-center rounded-lg text-muted pressable",
						onClick: () => setConfirm(true),
						"aria-label": "Cerrar sesión",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-[11px] uppercase tracking-[0.18em] text-muted",
								children: session.routineName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-lg leading-tight tabular-nums",
								children: [formatDuration(elapsed), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 font-sans text-xs text-muted",
									children: [
										doneSets,
										"/",
										totalSets,
										" series"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 h-1 overflow-hidden rounded-full bg-elevated",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-accent transition-[width] duration-200",
									style: { width: `${doneSets / Math.max(1, totalSets) * 100}%` }
								})
							})
						]
					}),
					resting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => pausedRest != null ? resumeRest() : pauseRest(),
						"aria-label": pausedRest != null ? "Reanudar descanso" : "Pausar descanso",
						className: cn("flex h-11 shrink-0 items-center gap-1.5 rounded-full px-3 font-display text-lg leading-none tabular-nums pressable", pausedRest != null ? "bg-elevated text-muted" : "bg-accent/15 text-accent"),
						children: [pausedRest != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }), formatClock(remaining)]
					}) : null
				]
			}),
			picker ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-4 safe-bottom",
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
				className: "min-h-0 flex-1 overflow-y-auto px-4 pb-36 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] uppercase tracking-[0.18em] text-accent",
						children: [
							MUSCLE_LABEL[exercise.muscle],
							" · ",
							EQUIPMENT_LABEL[exercise.equipment]
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl leading-none tracking-tight sm:text-5xl",
						children: exercise.name
					}),
					exercise.cues.length || exercise.gif ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShowDetail((v) => !v),
						"aria-expanded": showDetail,
						className: "-ml-2 mt-1 flex h-11 items-center gap-1 rounded-lg px-2 text-sm text-muted pressable",
						children: [exercise.gif ? "Técnica y referencia" : "Indicaciones", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 transition-transform", showDetail && "rotate-180") })]
					}), showDetail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pb-1",
						children: [exercise.gif ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPlate, {
							src: exercise.gif,
							name: exercise.name
						}) : null, exercise.cues.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1.5",
							children: exercise.cues.map((cue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2 text-sm text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-accent/70" }), cue]
							}, cue))
						}) : null]
					}) : null] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-[11px] uppercase tracking-[0.18em] text-muted",
							children: [
								"Series · ",
								currentDone,
								"/",
								current.sets.length
							]
						}), exercise.esTiempo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-3.5" }), "en segundos"]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-2",
						children: current.sets.map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetRow, {
							set: st,
							index: i,
							unit,
							suffix: exercise.esTiempo ? "seg" : "reps",
							active: openSet?.id === st.id,
							onChange: (patch) => updateSet(session.currentIndex, st.id, patch),
							onToggle: () => {
								tap();
								toggleSet(session.currentIndex, st.id);
							}
						}, st.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								className: "basis-28 flex-1",
								onClick: () => {
									setShowDetail(false);
									addSet(session.currentIndex);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Serie"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								className: "basis-28 flex-1",
								onClick: () => {
									setShowDetail(false);
									setPicker(true);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Replace, { className: "size-4" }), "Cambiar"]
							}),
							current.sets.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "basis-28 flex-1",
								onClick: () => removeSet(session.currentIndex, current.sets.at(-1).id),
								children: "Quitar"
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "session-bar-fixed z-20 border-t border-line bg-surface/95 px-4 pt-3 backdrop-blur safe-bottom",
				children: [
					nextExercise && !resting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-2 truncate text-center text-xs text-muted",
						children: ["Sigue: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: nextExercise.name
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "flex size-14 shrink-0 items-center justify-center rounded-xl bg-elevated pressable disabled:opacity-30",
								disabled: session.currentIndex === 0,
								onClick: () => setCurrent(session.currentIndex - 1),
								"aria-label": "Ejercicio anterior",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
							}),
							openSet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "min-w-0 flex-1 px-3",
								onClick: () => {
									tap();
									toggleSet(session.currentIndex, openSet.id);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate",
									children: [
										"Serie ",
										current.sets.indexOf(openSet) + 1,
										" · ",
										formatWeight(openSet.weightKg, unit),
										" ×",
										" ",
										openSet.reps,
										exercise.esTiempo ? "s" : ""
									]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								className: "min-w-0 flex-1 px-3",
								disabled: nextIndex < 0,
								onClick: () => setCurrent(nextIndex),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: nextExercise ? `Siguiente: ${nextExercise.name}` : "Último ejercicio"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "flex size-14 shrink-0 items-center justify-center rounded-xl bg-elevated pressable disabled:opacity-30",
								disabled: session.currentIndex >= session.exercises.length - 1,
								onClick: () => setCurrent(session.currentIndex + 1),
								"aria-label": "Ejercicio siguiente",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs tabular-nums text-muted",
							children: [
								session.currentIndex + 1,
								" / ",
								session.exercises.length,
								" ejercicios"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex h-10 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-muted pressable",
							onClick: () => finish(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), "Terminar sesión"]
						})]
					})
				]
			}),
			resting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-30 flex flex-col justify-end bg-bg/70",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-t-2xl bg-surface px-6 pb-10 pt-6 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs uppercase tracking-[0.2em] text-muted",
							children: pausedRest != null ? "Descanso en pausa" : "Descanso"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
								size: 168,
								stroke: 8,
								value: pausedRest != null ? 1 - pausedRest / Math.max(1, session.restTotalSec) : session.restTotalSec ? 1 - remaining / session.restTotalSec : 0,
								label: formatClock(remaining),
								sub: pausedRest != null ? "pausa" : "rest"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 truncate text-center text-sm text-muted",
							children: ["Sigue: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: nextUp ?? "cierre de sesión"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: () => addRest(-15),
									children: "−15s"
								}),
								pausedRest != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: resumeRest,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), "Seguir"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: pauseRest,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }), "Pausa"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: () => addRest(15),
									children: "+15s"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							block: true,
							className: "mt-1",
							onClick: () => skipRest(),
							children: "Saltar descanso"
						})
					]
				})
			}) : null,
			confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-40 flex items-end bg-bg/70",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full rounded-t-2xl bg-surface px-5 pb-8 pt-5 shadow-[var(--shadow-border)] safe-bottom",
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
* One set. The next unfinished set is the row you are on, so it is the one the
* accent ring points at; finished rows recede.
*/
function SetRow({ set, index, unit, suffix, active, onChange, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: cn("rounded-xl bg-surface px-2 py-2 shadow-[var(--shadow-border)]", set.completed && "bg-elevated/60", active && "ring-1 ring-accent/45"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("w-6 text-center font-display text-lg tabular-nums", active ? "text-accent" : "text-muted"),
					children: index + 1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
					value: toDisplayWeight(set.weightKg, unit),
					step: weightStep(unit),
					suffix: unit,
					wide: true,
					onChange: (n) => onChange({ weightKg: fromDisplayWeight(n, unit) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
					value: set.reps,
					step: 1,
					min: 0,
					suffix,
					onChange: (n) => onChange({ reps: Math.max(0, Math.round(n)) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onToggle,
					className: cn("flex size-12 shrink-0 items-center justify-center rounded-lg pressable", set.completed ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
					"aria-label": set.completed ? `Desmarcar serie ${index + 1}` : `Completar serie ${index + 1}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
				})
			]
		})
	});
}
/**
* Reference clip for the current movement. The catalogue ships product photos on
* a white background, so the plate frames them and fades their edges into the
* card instead of dropping a white slab mid-workout; a failed load swaps in a
* calm note rather than a broken icon.
*/
function MediaPlate({ src, name }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-32 items-center justify-center rounded-lg bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-[16rem] text-center text-xs text-muted",
			children: "Sin referencia para este ejercicio. Seguí las indicaciones y tu técnica."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
		className: "media-plate",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: `Referencia de ${name}`,
			className: "media h-44 w-full object-contain sm:h-52",
			loading: "lazy",
			decoding: "async",
			onError: () => setFailed(true)
		})
	});
}
var DAY_LABELS = [
	"LU",
	"MA",
	"MI",
	"JU",
	"VI"
];
function monthKey(d) {
	return format(d, "yyyy-MM");
}
function capitalize(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}
function ProgressView() {
	const history = useTrain((s) => s.history);
	const records = useTrain((s) => s.records);
	const unit = useTrain((s) => s.profile.unit);
	const bodyLogs = useTrain((s) => s.bodyLogs);
	const setMonthWeight = useTrain((s) => s.setMonthWeight);
	const [draftMonth, setDraftMonth] = (0, import_react.useState)({});
	const [offset, setOffset] = (0, import_react.useState)(0);
	const today = (0, import_react.useMemo)(() => /* @__PURE__ */ new Date(), []);
	const anchor = (0, import_react.useMemo)(() => addMonths(startOfMonth(today), offset), [today, offset]);
	const monthLabel = (0, import_react.useMemo)(() => capitalize(format(anchor, "LLLL yyyy", { locale: es })), [anchor]);
	const canGoNext = offset < 0;
	const weekData = (0, import_react.useMemo)(() => {
		const monday = new Date(today);
		monday.setDate(today.getDate() - (Number(format(today, "i")) - 1));
		return Array.from({ length: 5 }, (_, i) => {
			const d = new Date(monday);
			d.setDate(monday.getDate() + i);
			const key = format(d, "yyyy-MM-dd");
			const vol = history.filter((h) => format(h.endedAt, "yyyy-MM-dd") === key).reduce((s, h) => s + h.volumeKg, 0);
			return {
				day: format(d, "EEEEEE", { locale: es }).toUpperCase(),
				vol: unit === "kg" ? Math.round(vol) : Math.round(vol * 2.2),
				date: key
			};
		});
	}, [
		history,
		unit,
		today
	]);
	const weekTotal = history.filter((h) => weekData.some((d) => d.date === format(h.endedAt, "yyyy-MM-dd"))).reduce((s, h) => s + h.volumeKg, 0);
	const calendar = (0, import_react.useMemo)(() => {
		const first = startOfMonth(anchor);
		const startIso = Number(format(first, "i")) - 1;
		const trainedDates = /* @__PURE__ */ new Set();
		for (const h of history) {
			const d = new Date(h.endedAt);
			if (monthKey(d) === monthKey(anchor)) trainedDates.add(format(d, "yyyy-MM-dd"));
		}
		const cells = [];
		for (let i = 0; i < startIso; i++) cells.push({
			key: `pad-${i}`,
			label: "",
			trained: false,
			future: false,
			isToday: false
		});
		const lastDay = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0).getDate();
		for (let day = 1; day <= lastDay; day++) {
			const d = new Date(anchor.getFullYear(), anchor.getMonth(), day);
			const wd = d.getDay();
			if (wd === 0 || wd === 6) continue;
			const key = format(d, "yyyy-MM-dd");
			cells.push({
				key,
				label: String(day),
				trained: trainedDates.has(key),
				future: d.getTime() > today.getTime(),
				isToday: key === format(today, "yyyy-MM-dd")
			});
		}
		return cells;
	}, [
		anchor,
		history,
		today
	]);
	const trainedCount = calendar.filter((c) => c.trained).length;
	const yearLabel = String(anchor.getFullYear());
	const bodyData = (0, import_react.useMemo)(() => {
		const year = anchor.getFullYear();
		const lastMonth = year === today.getFullYear() ? today.getMonth() : 11;
		const mk = (mi) => `${year}-${String(mi + 1).padStart(2, "0")}`;
		return Array.from({ length: lastMonth + 1 }, (_, mi) => {
			const entry = { mes: capitalize(format(new Date(year, mi, 1), "LLL", { locale: es }).replace(".", "")) };
			const log = bodyLogs.find((l) => l.date.startsWith(mk(mi)));
			if (log) entry.peso = toDisplayWeight(log.weightKg, unit);
			return entry;
		});
	}, [
		bodyLogs,
		anchor,
		today,
		unit
	]);
	const monthRows = (0, import_react.useMemo)(() => {
		const year = anchor.getFullYear();
		const lastMonth = year === today.getFullYear() ? today.getMonth() : 11;
		return Array.from({ length: lastMonth + 1 }, (_, mi) => {
			const iso = `${year}-${String(mi + 1).padStart(2, "0")}`;
			const log = bodyLogs.find((l) => l.date.startsWith(iso));
			return {
				iso,
				label: capitalize(format(new Date(year, mi, 1), "LLLL", { locale: es })),
				weightKg: log?.weightKg ?? null
			};
		});
	}, [
		bodyLogs,
		anchor,
		today
	]);
	const yearLogs = bodyLogs.filter((l) => (/* @__PURE__ */ new Date(`${l.date}T12:00:00`)).getFullYear() === anchor.getFullYear()).sort((a, b) => a.date.localeCompare(b.date));
	const yearStartWeight = yearLogs[0];
	const yearEndWeight = yearLogs.at(-1);
	const yearWeight = yearEndWeight ?? bodyLogs.at(-1);
	function saveMonthWeight(monthISO) {
		const n = Number((draftMonth[monthISO] ?? "").replace(",", "."));
		if (!Number.isFinite(n) || n <= 0) return;
		setMonthWeight(monthISO, fromDisplayWeight(n, unit));
		setDraftMonth((d) => ({
			...d,
			[monthISO]: ""
		}));
	}
	const totalVol = history.reduce((s, h) => s + h.volumeKg, 0);
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-muted",
						children: "Volumen · esta semana"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tabular-nums text-muted",
						children: formatVolume(weekTotal, unit)
					})]
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-muted",
						children: "Calendario"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOffset((o) => o - 1),
								"aria-label": "Mes anterior",
								className: "grid size-8 place-items-center rounded-lg bg-elevated text-muted shadow-[var(--shadow-border)] pressable",
								children: "‹"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-34 text-center text-sm font-medium tabular-nums",
								children: monthLabel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOffset((o) => o < 0 ? o + 1 : 0),
								disabled: !canGoNext,
								"aria-label": "Mes siguiente",
								className: "grid size-8 place-items-center rounded-lg bg-elevated text-muted shadow-[var(--shadow-border)] pressable disabled:opacity-30",
								children: "›"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-5 gap-2",
					children: [DAY_LABELS.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-center text-[11px] font-medium text-muted",
						children: label
					}, `h-${label}`)), calendar.map((c) => c.label === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "h-10 rounded-lg"
					}, c.key) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						title: `${c.key}${c.trained ? " · entrenado" : ""}`,
						className: `flex h-10 items-center justify-center rounded-lg text-sm tabular-nums ${c.trained ? "bg-accent font-semibold text-accent-fg" : c.isToday ? "text-fg shadow-[inset_0_0_0_1px_var(--tu-line-strong)]" : c.future ? "text-subtle" : "bg-elevated text-subtle shadow-[var(--shadow-border)]"}`,
						children: c.label
					}, c.key))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-[11px] text-muted",
					children: [
						trainedCount,
						" ",
						trainedCount === 1 ? "día entrenado" : "días entrenados",
						" · lunes a viernes"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs uppercase tracking-[0.18em] text-muted",
							children: ["Peso corporal · año ", yearLabel]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-baseline gap-2 text-sm font-medium tabular-nums",
							children: [yearWeight ? formatWeight(yearWeight.weightKg, unit) : "—", yearStartWeight && yearEndWeight && yearStartWeight !== yearEndWeight ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: yearEndWeight.weightKg <= yearStartWeight.weightKg ? "text-accent" : "text-warn",
								children: [
									yearEndWeight.weightKg <= yearStartWeight.weightKg ? "▼" : "▲",
									" ",
									Math.abs(toDisplayWeight(yearEndWeight.weightKg, unit) - toDisplayWeight(yearStartWeight.weightKg, unit)).toFixed(1)
								]
							}) : null]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: bodyData,
								margin: {
									top: 8,
									right: 4,
									left: -24,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "bw",
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
										dataKey: "mes",
										tick: {
											fill: "var(--tu-muted)",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										domain: ["dataMin - 1", "dataMax + 1"],
										tick: {
											fill: "var(--tu-muted)",
											fontSize: 11
										},
										axisLine: false,
										tickLine: false,
										width: 44
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "var(--tu-elevated)",
											border: "1px solid var(--tu-line)",
											borderRadius: 12,
											color: "var(--tu-fg)"
										},
										formatter: (v) => [`${v} ${unit}`, "Peso"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "peso",
										connectNulls: true,
										stroke: "var(--tu-accent)",
										fill: "url(#bw)",
										strokeWidth: 2
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[11px] text-muted",
						children: "Un peso por mes · editá el que quieras abajo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 divide-y divide-[var(--tu-line)] border-t border-[var(--tu-line)]",
						children: monthRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-24 shrink-0 text-sm capitalize text-muted",
									children: row.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									inputMode: "decimal",
									value: draftMonth[row.iso] ?? "",
									onChange: (e) => setDraftMonth((d) => ({
										...d,
										[row.iso]: e.target.value
									})),
									onKeyDown: (e) => {
										if (e.key === "Enter") saveMonthWeight(row.iso);
									},
									placeholder: row.weightKg != null ? String(toDisplayWeight(row.weightKg, unit)) : "—",
									className: "min-w-0 flex-1 rounded-lg bg-elevated px-3 py-2 text-sm tabular-nums shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-6 shrink-0 text-xs text-muted",
									children: unit
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									size: "sm",
									onClick: () => saveMonthWeight(row.iso),
									disabled: !(draftMonth[row.iso] ?? "").trim(),
									children: "OK"
								})
							]
						}, row.iso))
					})
				]
			}),
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
		className: cn("relative h-8 w-[3.75rem] shrink-0 rounded-full bg-elevated shadow-[var(--shadow-border)]", "transition-colors duration-200", "data-[state=checked]:bg-accent", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "block size-6 translate-x-1 rounded-full bg-fg shadow-[0_1px_2px_rgb(0_0_0_/_0.35)] transition-transform duration-200 ease-[var(--ease-out-smooth)] data-[state=checked]:translate-x-[2.1rem] data-[state=checked]:bg-accent-fg" })
	});
}
var loadGymState = createServerFn().middleware([authMiddleware]).handler(createSsrRpc("b0f2d35d820cb7ea70f0dfa19a57e7c23ed8cf1897b1cbb0a41a247e7d5bf90e"));
var saveGymState = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("5da7e9d552febe8e34f1fef472aa8be2f54352ad43768247480ab6e41a81a870"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("621f4d045a35dd22c09a02b5c6a19d77e8cfadbdce92d601c6d5249dda4a1d4d"));
var TONES = [
	{
		id: "clasico",
		label: "Clásico"
	},
	{
		id: "campana",
		label: "Campana"
	},
	{
		id: "suave",
		label: "Suave"
	},
	{
		id: "digital",
		label: "Digital"
	}
];
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
	const user = useCurrentUser();
	const { isPending, testMode } = useCurrentUserState();
	const [weight, setWeight] = (0, import_react.useState)(String(toDisplayWeight(profile.bodyWeightKg, profile.unit)));
	const [height, setHeight] = (0, import_react.useState)(String(profile.heightCm));
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
	const [vibrationSupported, setVibrationSupported] = (0, import_react.useState)(true);
	const [wakeLockSupported, setWakeLockSupported] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setVibrationSupported(hasRealVibration());
		setWakeLockSupported(typeof navigator !== "undefined" && "wakeLock" in navigator);
	}, []);
	async function toggleNotifications(on) {
		if (on) {
			const ok = await ensureNotifyPermission();
			updateSettings({ notifications: ok });
			return;
		}
		updateSettings({ notifications: false });
	}
	/** "Pantalla encendida": show it working right now, not just store the flag. */
	async function toggleKeepAwake(on) {
		updateSettings({ keepAwake: on });
		if (!on) {
			await releaseWakeLock();
			return;
		}
		await requestWakeLock();
	}
	/** Sale del modo prueba y vuelve al login, sin tocar la cuenta real. */
	function exitTestMode() {
		disableTestModeAndNotify();
		if (typeof window !== "undefined") window.location.href = "/login";
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-display text-3xl leading-none tracking-tight",
							children: profile.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 truncate text-xs text-muted",
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
							className: "truncate text-[11px] text-subtle",
							children: user.primaryEmail
						}) : null
					]
				})]
			}),
			testMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-elevated px-3.5 py-3 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-wider text-accent",
						children: "Modo prueba"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Estás como invitado. El progreso se guarda solo acá, no en la nube."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "sm",
						className: "mt-2",
						onClick: exitTestMode,
						children: "Salir del modo prueba"
					})
				]
			}) : null,
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
				label: "Apariencia",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: ["dark", "light"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: !settings.autoTheme && settings.theme === t,
						onClick: () => updateSettings({
							theme: t,
							autoTheme: false
						}),
						children: t === "dark" ? "Oscuro" : "Claro"
					}, t))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 rounded-2xl bg-surface p-1 shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }),
						label: "Tema automático",
						hint: "Sigue el ajuste claro/oscuro del teléfono",
						checked: settings.autoTheme,
						onChange: (v) => updateSettings({ autoTheme: v })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsGroup, {
				title: "Entrenamiento",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" }),
						label: "Pantalla encendida",
						hint: "Evita que se apague mientras entrenás",
						checked: settings.keepAwake,
						onChange: (v) => void toggleKeepAwake(v),
						badge: !wakeLockSupported ? "Este navegador no lo permite" : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "size-4" }),
						label: "Avance automático",
						hint: "Pasa solo al siguiente ejercicio al cerrar el último set",
						checked: settings.autoAdvance,
						onChange: (v) => updateSettings({ autoAdvance: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4" }),
						label: "Cargar último peso",
						hint: "Prellena cada serie con lo que levantaste la última vez",
						checked: settings.prefillLastWeight,
						onChange: (v) => updateSettings({ prefillLastWeight: v })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsGroup, {
				title: "Avisos y descanso",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }),
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
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-4" }),
						label: "Sonido",
						hint: "Tono cuando termina el descanso o el timer",
						checked: settings.sound,
						onChange: (v) => {
							updateSettings({ sound: v });
							if (v) previewSound(settings.tone);
						}
					}),
					settings.sound ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: "Volumen"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 10,
									max: 100,
									step: 10,
									value: settings.volume,
									"aria-label": "Volumen",
									onChange: (e) => updateSettings({ volume: Number(e.target.value) }),
									className: "h-9 min-w-0 flex-1 accent-[var(--tu-accent)]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-9 text-right text-xs tabular-nums text-muted",
									children: [settings.volume, "%"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: TONES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									updateSettings({ tone: t.id });
									previewSound(t.id);
								},
								className: cn("h-11 rounded-full px-3 text-xs font-medium pressable", settings.tone === t.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
								children: t.label
							}, t.id))
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vibrate, { className: "size-4" }),
						label: "Vibración",
						hint: vibrationSupported ? "Pulso al terminar el descanso" : "En iPhone suena como un golpe grave del parlante",
						checked: settings.vibration,
						onChange: (v) => {
							updateSettings({ vibration: v });
							if (v) pulse();
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" }),
						label: "Vibración al tocar",
						hint: "Respuesta corta en cada serie o botón",
						checked: settings.haptics,
						onChange: (v) => updateSettings({ haptics: v }),
						badge: !vibrationSupported ? "Solo Android" : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }),
						label: "Cuenta regresiva 3-2-1",
						hint: "Aviso en los últimos 3 segundos del descanso",
						checked: settings.countdownSound,
						onChange: (v) => updateSettings({ countdownSound: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
						label: "Descanso por defecto",
						children: REST_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => updateSettings({ defaultRestSec: p.sec }),
							className: cn("h-11 flex-1 rounded-lg text-xs font-medium pressable shadow-[var(--shadow-border)]", settings.defaultRestSec === p.sec ? "bg-accent text-accent-fg" : "bg-elevated text-fg"),
							children: p.label
						}, p.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsGroup, {
				title: "Gimnasio",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
					label: `Objetivo semanal (${settings.weeklyGoal} por semana)`,
					children: [
						3,
						4,
						5,
						6
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => updateSettings({ weeklyGoal: n }),
						className: cn("h-11 flex-1 rounded-lg text-sm font-medium pressable shadow-[var(--shadow-border)]", settings.weeklyGoal === n ? "bg-accent text-accent-fg" : "bg-elevated text-fg"),
						children: n
					}, n))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
					label: "Discos más chicos",
					hint: "Para el cálculo de discos por lado",
					children: [
						.5,
						1,
						1.25,
						2.5
					].map((kg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => updateSettings({ minPlateKg: kg }),
						className: cn("h-11 flex-1 rounded-lg text-xs font-medium pressable shadow-[var(--shadow-border)]", settings.minPlateKg === kg ? "bg-accent text-accent-fg" : "bg-elevated text-fg"),
						children: [kg, " kg"]
					}, kg))
				})]
			}),
			null
		]
	});
}
function ToggleRow({ label, hint, checked, onChange, icon, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-3",
			children: [icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("grid size-9 shrink-0 place-items-center rounded-lg", checked ? "bg-accent/15 text-accent" : "bg-elevated text-muted"),
				children: icon
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: hint
					}),
					badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-[11px] text-subtle",
						children: badge
					}) : null
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onChange
		})]
	});
}
function SettingsGroup({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 text-xs uppercase tracking-[0.18em] text-muted",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-1 rounded-2xl bg-surface p-1 shadow-[var(--shadow-border)]",
		children
	})] });
}
function ChoiceRow({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: label
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: hint
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex gap-1.5",
				children
			})
		]
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
		unlockAudio();
		if (isTestMode()) return;
		bindGymPersist((snap) => saveGymState({ data: snap }));
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const sync = () => {
			if (useTrain.getState().settings.autoTheme) applyTheme(matchSystemTheme());
		};
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, [rehydrated, onboarded]);
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
			applyTheme(local.settings.autoTheme ? matchSystemTheme() : local.settings.theme);
			applyAudioSettings(local.settings);
			unlockAudio();
			const rest = local.session?.restUntil;
			if (rest && rest < Date.now()) skipRest();
			if (!userId || loadedFor.current !== null) {
				useTrain.getState().markHydrated();
				return;
			}
			if (isTestMode()) {
				loadedFor.current = userId;
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
				className: "mx-auto min-h-0 w-full max-w-xl flex-1 overflow-y-auto px-5 pt-8 pb-6 safe-top tab-bar-pad lg:max-w-2xl lg:pb-8 lg:pt-10",
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
