import { mountedStyleModal, unmountedStyleModal } from '../utils/modalUnmountAndMountStyle';
import styles from './ProjectInputModal.module.scss';
import { ProjectsDetails } from '../../../services/interfaces/portfolio-service-interfaces';

interface ProjectInputModalProps {
    content: string,
    onConfirm: (...args: any[]) => void,
    onCancel: (...args: any[]) => void,
    project: ProjectsDetails,
    setProjectsData: React.Dispatch<React.SetStateAction<ProjectsDetails>>,
}

export default function CarouselInputModal({
    content,
    onConfirm,
    onCancel,
    project,
    setProjectsData
}: ProjectInputModalProps) {

    const updateTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectsData((oldState) => {
            oldState.title = e.target.value;
            return { ...oldState }
        });
    };

    const updateRepositoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectsData((oldState) => {
            oldState.repository = e.target.value;
            return { ...oldState }
        });
    };

    return (
        <article
            className={styles.container}
            style={content ? mountedStyleModal : unmountedStyleModal}
        >
            <h1>{content}</h1>
            <section className={styles['input-section']}>
                <input
                    type="text"
                    name="projectTitle"
                    placeholder="Title"
                    value={project?.title}
                    onChange={updateTitleHandler}
                />
                 <input
                    type="text"
                    name="repository"
                    placeholder="Repository"
                    value={project?.repository}
                    onChange={updateRepositoryHandler}
                />
            </section>
            <section className={styles['button-container']}>
                <button
                    className={styles['confirm-btn']}
                    onClick={onConfirm}
                >
                    Confirm
                </button>
                <button
                    className={styles['cancel-btn']}
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </section>
        </article>
    );
}