import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './AdminStatsCard.module.scss';
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface AdminStatsCardProps {
    heading: string,
    value?: string | number,
    icon: IconDefinition,
}

export default function AdminStatsCard({ heading, value, icon }: AdminStatsCardProps) {
    return (
        <article className={styles["stats-card"]}>
            <FontAwesomeIcon
                icon={icon}
                className={styles["fa-solid fa-file-circle-plus"]}
            />
            <h5>{heading}</h5>
            <h4>{value}</h4>
        </article>
    );
}