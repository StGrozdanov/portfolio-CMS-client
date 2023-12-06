import { getGreeting } from '../../../../../utils/getCurrentPartOfTheDay';
import styles from './AdminHeader.module.scss';

export default function AdminHeader() {
    return (
        <header className={styles["admin-panel-content-header"]}>
            <article className={styles["admin-panel-content-header-greeting-article"]}>
                <h2>{getGreeting()} !</h2>
            </article>
        </header>
    );
}