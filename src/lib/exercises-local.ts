/**
 * Catálogo de ejercicios de gimnasio cargado por el dueño de la app: nombres
 * reales de la sala, agrupados por parte del cuerpo, cada uno con su clip de
 * demostración. `parteDelCuerpo` y `equipamiento` llegan como texto libre, así
 * que `exercises.ts` los normaliza a `Muscle` / `Equipment` antes de exponerlos.
 *
 * `gif` apunta a un archivo dentro de `public/`. Si el archivo no existe, la
 * interfaz cae al arte geométrico en vez de mostrar una imagen rota.
 */
export type EjercicioLocal = {
  id: string;
  nombre: string;
  /** Parte principal del cuerpo, en texto libre. */
  parteDelCuerpo: string;
  /** Músculos que asisten el movimiento, en texto libre. */
  subMusculos: string[];
  equipamiento: string;
  /** Clip de demostración bajo `public/`; opcional. */
  gif?: string;
  /** Medido en segundos en vez de repeticiones (plancha). */
  esTiempo?: boolean;
};

const ejerciciosLocal: EjercicioLocal[] = [


  { id: "0067", nombre: "Extensión katana", subMusculos: [], parteDelCuerpo: "Triceps", equipamiento: "Polea" },




  { id: "0068", nombre: "Jalón al pecho unilateral", parteDelCuerpo: "Espalda", subMusculos: ["Dorsales", "Bíceps", "Antebrazos"], equipamiento: "Polea" },

];

export default ejerciciosLocal;


