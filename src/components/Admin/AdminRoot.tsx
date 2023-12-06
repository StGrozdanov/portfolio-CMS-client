import styles from './AdminRoot.module.scss';
import AdminHeader from "./modules/components/AdminHeader/AdminHeader";
import AdminNav from "./modules/components/AdminNav/AdminNav";

export default function AdminRoot({ children }: { children: JSX.Element }) {
    return (
        <section className={styles["admin-panel-section"]}>
            <AdminNav />
            <section className={styles["admin-panel-section-wrapper"]}>
                <article className={styles["admin-panel-content"]}>
                    <AdminHeader />
                    <main className={styles["admin-panel-content-main"]}>
                        {children}
                    </main>
                </article>
            </section>
        </section>
    );
}