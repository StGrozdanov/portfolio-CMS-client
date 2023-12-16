import { mountedStyleModal, unmountedStyleModal } from '../utils/modalUnmountAndMountStyle';
import styles from './JobInputModal.module.scss';
import { JobDetails } from '../../../services/interfaces/portfolio-service-interfaces';

interface JobInputModalProps {
    content: string,
    onConfirm: (...args: any[]) => void,
    onCancel: (...args: any[]) => void,
    job: JobDetails,
    setJobsData: React.Dispatch<React.SetStateAction<JobDetails>>,
}

export default function CarouselInputModal({
    content,
    onConfirm,
    onCancel,
    job,
    setJobsData
}: JobInputModalProps) {
    const updateCompanyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobsData((oldState) => {
            oldState.company = e.target.value;
            return { ...oldState }
        });
    };

    const updateTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobsData((oldState) => {
            oldState.title = e.target.value;
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
                    name="companyName"
                    placeholder="Company Name"
                    value={job?.company}
                    onChange={updateCompanyHandler}
                />
                <input
                    type="text"
                    name="companyTitle"
                    placeholder="Title"
                    value={job?.title}
                    onChange={updateTitleHandler}
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