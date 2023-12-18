import { useRef } from 'react';
import styles from './ImageBoard.module.scss';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import FileUpload from '../FileUpload/FileUpload';
import DraggableImage from './modules/DraggableImage';
import { useModalContext } from '../../hooks/useModalContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { portfolioAPI } from '../../services/portfolio-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCarouselInputModalContext } from '../../hooks/useCarouselInputModalContext';

interface ImageBoardProps {
    imageCollection: string[],
    updateStateHandler: (updatedImageCollection: any[]) => void,
    updateFromInputHandler?: (...args: any[]) => void,
    uploadType: 'uploadCV' | 'updateProjectImage' | 'updateJobImage' | 'addPartners' | 'addCarousel',
    heading: string,
    tip?: string,
    limit?: number,
    targetResourceTitle?: string,
}

export default function ImageBoard({
    imageCollection,
    uploadType,
    updateStateHandler,
    heading,
    tip,
    limit,
    updateFromInputHandler,
    targetResourceTitle,
}: ImageBoardProps) {
    const { token } = useAuthContext();
    const confirmModal = useModalContext();
    const carouselInputModal = useCarouselInputModalContext();
    const dragItem = useRef<number>(0);
    const draggedOverItem = useRef<number>(0);

    const sortHandler = () => {
        const imageCollectionClone = [...imageCollection];
        const temp = imageCollectionClone[dragItem.current];
        imageCollectionClone[dragItem.current] = imageCollectionClone[draggedOverItem.current];
        imageCollectionClone[draggedOverItem.current] = temp;

        updateStateHandler(imageCollectionClone);
    }

    const deleteHandler = (image: string) => {
        const filteredImages = imageCollection.filter((imageUrl) => imageUrl !== image);
        updateStateHandler(filteredImages);
        sendS3ImageDeleteRequest(image);
    }

    const sendS3ImageDeleteRequest = (imageURL: string) => {
        portfolioAPI
            .deleteImage({ imageURL }, token)
            .then(() => console.info('successfully deleted the image from s3'))
            .catch(err => console.error(err));
    }

    return (
        <article className={styles['image-container']}>
            {
                uploadType !== 'addCarousel'
                    ? <FileUpload
                        fontAwesomeIcon={faPlusCircle}
                        tip={limit && imageCollection.length >= limit ? 'delete an image first' : tip}
                        uploadType={uploadType}
                        limited={limit && imageCollection.length >= limit ? true : false}
                        fileUploadCallback={updateStateHandler}
                        targetResourceTitle={targetResourceTitle}
                    />
                    : <FontAwesomeIcon
                        icon={faPlusCircle}
                        onClick={() => {
                            carouselInputModal({
                                title: 'Add new Carousel',
                                updateStateHandler: updateFromInputHandler as (...args: any[]) => void,
                            })
                                .then(() => console.info('confirmed'))
                                .catch(() => console.info('canceled'))
                        }} />
            }

            <h3>{heading}</h3>
            <section className={styles.content}>
                {imageCollection.map((imageURL, index) => (
                    <DraggableImage
                        deleteHandler={() => {
                            confirmModal({ title: 'Are you sure you want to delete this image?' })
                                .then(() => deleteHandler(imageURL))
                                .catch(() => console.info('action canceled.'))
                        }}
                        dragItem={dragItem}
                        draggedOverItem={draggedOverItem}
                        imageURL={imageURL}
                        index={index}
                        sortHandler={sortHandler}
                        key={imageURL + index}
                    />
                ))}
            </section>
        </article>
    );
}