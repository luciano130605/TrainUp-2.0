import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./mark-zNoHINay.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BXLaTDzf.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium select-none pressable disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg",
			secondary: "bg-elevated text-fg shadow-[var(--shadow-border)]",
			ghost: "bg-transparent text-fg",
			danger: "bg-danger text-fg"
		},
		size: {
			sm: "h-10 px-3.5 text-sm rounded-md",
			md: "h-12 px-4 text-sm rounded-lg",
			lg: "h-14 px-5 text-base rounded-xl",
			icon: "size-11 rounded-lg"
		},
		block: {
			true: "w-full",
			false: ""
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
		block: false
	}
});
function Button({ className, variant, size, block, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size,
			block
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
