import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import styles from "./Footer.module.css";

export function Footer() {
	return <footer className={styles.footerContainer}>
		<p>Copyright &copy; John James Valencia - 2022</p>
		<section className={styles.iconSection}>
			<a href="https://linkedin.com/in/johnjamesvalencia" target="blank">{<AiFillLinkedin fontSize={21} />}</a>
			<a href="https://github.com/dunas26" target="blank">{<AiFillGithub fontSize={21} />}</a>
		</section>
	</footer>
}
