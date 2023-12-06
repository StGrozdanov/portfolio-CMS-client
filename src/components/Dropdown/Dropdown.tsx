import styles from './Dropdown.module.scss';

interface DropdownProps {
    title: string,
    children: React.ReactNode,
}

export default function Dropdown({ title, children }: DropdownProps) {
    return (
        <article className={styles.container}>
            <button>{title}</button>
            <div>
                {children}
            </div>
        </article>
    )
}