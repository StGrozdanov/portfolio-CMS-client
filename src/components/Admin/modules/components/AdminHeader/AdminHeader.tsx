import styles from './AdminHeader.module.scss';
import greeting from '../../../../../utils/getCurrentPartOfTheDay';

export default function AdminHeader() {
    return (
        <header className={styles["admin-panel-content-header"]}>
            <article className={styles["admin-panel-content-header-greeting-article"]}>
                <h2>{greeting} !</h2>
            </article>
        </header>
    );
}