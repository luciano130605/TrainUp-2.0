import { Mark } from "./mark";

export function Splash() {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center bg-bg">
      <Mark />
      <p className="mt-5 font-display text-4xl tracking-tight">TrainUp</p>
    </div>
  );
}
