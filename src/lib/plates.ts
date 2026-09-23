/** Disco weights available at the rack, kg. */
export const PLATE_KG = [20, 10, 5, 2.5, 1.75] as const;

export const BAR_OPTIONS = [10, 15, 20, 25] as const;

export type PlateStack = {
  weight: number;
  count: number;
};

export type PlatePlan = {
  targetKg: number;
  barKg: number;
  loadKg: number;
  perSide: PlateStack[];
  perSideKg: number;
  remainderKg: number;
  actualKg: number;
  possible: boolean;
};

function round3(n: number) {
  return Math.round(n * 1000) / 1000;
}

export function planPlates(targetKg: number, barKg: number): PlatePlan {
  const loadKg = round3(targetKg - barKg);
  if (!Number.isFinite(targetKg) || !Number.isFinite(barKg) || targetKg <= 0) {
    return {
      targetKg,
      barKg,
      loadKg: 0,
      perSide: [],
      perSideKg: 0,
      remainderKg: 0,
      actualKg: barKg,
      possible: false,
    };
  }
  if (loadKg <= 0) {
    return {
      targetKg,
      barKg,
      loadKg,
      perSide: [],
      perSideKg: 0,
      remainderKg: loadKg,
      actualKg: barKg,
      possible: loadKg === 0,
    };
  }

  let remaining = round3(loadKg / 2);
  const perSide: PlateStack[] = [];
  for (const plate of PLATE_KG) {
    const count = Math.floor((remaining + 1e-6) / plate);
    if (count > 0) {
      perSide.push({ weight: plate, count });
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
    possible: remaining < 0.05,
  };
}

export function totalPlates(plan: PlatePlan) {
  return plan.perSide.reduce((n, p) => n + p.count * 2, 0);
}
