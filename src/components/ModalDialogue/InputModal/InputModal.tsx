import { faImage } from '@fortawesome/free-solid-svg-icons';
import FileUpload from '../../FileUpload/FileUpload';
import { mountedStyleModal, unmountedStyleModal } from '../utils/modalUnmountAndMountStyle';
import styles from './InputModal.module.scss';
import { CarouselImage } from '../../../services/interfaces/portfolio-service-interfaces';

interface CarouselInputModalProps {
    content: string,
    onConfirm: (...args: any[]) => void,
    onCancel: (...args: any[]) => void,
    carouselData: CarouselImage,
    setCarouselData: React.Dispatch<React.SetStateAction<CarouselImage>>,
}

export default function CarouselInputModal({
    content,
    onConfirm,
    onCancel,
    carouselData,
    setCarouselData
}: CarouselInputModalProps) {

    const onImageUploadHandler = (images: string[]) => {
        const uploadedImage = images[images.length - 1];
        setCarouselData((oldState) => {
            return { ...oldState, imgURL: uploadedImage }
        });
    }

    const updateTypeHandler = (type: 'job' | 'project') => {
        setCarouselData((oldState) => {
            oldState.data.type = type;
            return { ...oldState }
        });
    };

    const updateLinkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCarouselData((oldState) => {
            oldState.data.linkTitle = e.target.value;
            return { ...oldState }
        });
    };
    const updateLabelHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCarouselData((oldState) => {
            oldState.data.label = e.target.value;
            return { ...oldState }
        });
    };

    return (
        <article
            className={styles.container}
            style={content ? mountedStyleModal : unmountedStyleModal}
        >
            <h1>{content}</h1>
            <section className={styles['radio-button-container']}>
                <div>
                    <input
                        type="radio"
                        name="job"
                        value="job"
                        checked={carouselData?.data.type === "job"}
                        onChange={() => updateTypeHandler('job')}
                    />
                    <label htmlFor="job">Job</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="project"
                        checked={carouselData?.data.type === "project"}
                        onChange={() => updateTypeHandler('project')}
                    />
                    <label htmlFor="project">Project</label>
                </div>
            </section>
            <section className={styles['input-section']}>
                <input
                    type="text"
                    name="linkTitle"
                    placeholder="Link Title"
                    value={carouselData?.data.linkTitle}
                    onChange={updateLinkHandler}
                />
                <input
                    type="text"
                    name="label"
                    placeholder="Label"
                    value={carouselData?.data.label}
                    onChange={updateLabelHandler}
                />
            </section>
            <FileUpload
                fontAwesomeIcon={faImage}
                limited={false}
                uploadType="addCarousel"
                fileUploadCallback={onImageUploadHandler}
            />
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