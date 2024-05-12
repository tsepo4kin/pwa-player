import {} from '@material-tailwind/react';

type EventCapture = {
	onPointerEnterCapture?: unknown;
	onPointerLeaveCapture?: unknown;
};

declare module '@material-tailwind/react' {
	export interface ButtonProps extends EventCapture {
		placeholder?: unknown;
	}
	export interface InputProps extends EventCapture {
		crossOrigin?: unknown;
	}
	export interface SelectProps extends EventCapture {
		placeholder?: unknown;
	}

	export interface CheckboxProps extends EventCapture {
		crossOrigin?: unknown;
	}

	export interface IconButtonProps extends EventCapture {
		placeholder?: unknown;
	}

	export interface SwitchProps extends EventCapture {
		crossOrigin?: unknown;
	}

	export interface SelectProps {
		children?: any;
	}

	export interface MenuListProps extends EventCapture {
		placeholder?: unknown;
		children?: any;
	}

	export interface MenuItemProps extends EventCapture {
		placeholder?: unknown;
	}

	export interface ProgressProps extends EventCapture {
		placeholder?: unknown;
	}
}
