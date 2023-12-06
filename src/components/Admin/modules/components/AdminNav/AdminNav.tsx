import styles from './AdminNav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faUserLarge, faGear, faHandshake, faAddressCard, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';

export default function AdminNav() {
    const location = useLocation();

    return (
        <nav className={styles["admin-panel-nav"]}>
            <NavLink target="_blank" to={'/'}>
                <img
                    className={styles["admin-panel-nav-logo"]}
                    src="/images/favicon.png"
                    alt=""
                />
            </NavLink>
            <ul className={styles["admin-panel-nav-ul"]}>
                <li className={styles["admin-panel-nav-li"]}>
                    <NavLink to={'/admin/dashboard'}>
                        <FontAwesomeIcon
                            icon={faChartSimple}
                            className={location.pathname === '/admin/dashboard' ? styles.active : ''}
                        />
                    </NavLink>
                </li>
                <li className={styles["admin-panel-nav-li"]}>
                    <NavLink to={'/admin/personal-info'}>
                        <FontAwesomeIcon
                            icon={faUserLarge}
                            className={location.pathname === '/admin/personal-info' ? styles.active : ''}
                        />
                    </NavLink>
                </li>
                <li className={styles["admin-panel-nav-li"]}>
                    <NavLink to={'/admin/skills'}>
                        <FontAwesomeIcon
                            icon={faAddressCard}
                            className={location.pathname === '/admin/skills' ? styles.active : ''}
                        />
                    </NavLink>
                </li>
                <li className={styles["admin-panel-nav-li"]}>
                    <NavLink to={'/admin/projects-and-jobs'}>
                        <FontAwesomeIcon
                            icon={faHandshake}
                            className={location.pathname === '/admin/projects-and-jobs' ? styles.active : ''}
                        />
                    </NavLink>
                </li>
                <li className={styles["admin-panel-nav-li"]}>
                    <NavLink to={'/admin/social-media'}>
                        <FontAwesomeIcon
                            icon={faGlobe}
                            className={location.pathname === '/admin/social-media' ? styles.active : ''}
                        />
                    </NavLink>
                </li>
            </ul>
            <FontAwesomeIcon
                icon={faGear}
                className={styles["fa-gear"]}
            />
        </nav>
    );
}