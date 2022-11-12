import styles from './Button.module.css';

export interface ButtonProps {
	label?: string;
	click?: () => void;
}

export function Button({ label = "", click = () => { } }: ButtonProps) {
	return <button className={styles.buttonFrame} onClick={click}>{label}</button>
}
