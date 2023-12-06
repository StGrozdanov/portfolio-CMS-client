import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DraggableImage.module.scss';
import { faBraille, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MutableRefObject, useState } from 'react';

interface DraggableImageProps {
    imageURL: string,
    index: number,
    dragItem: MutableRefObject<number>,
    draggedOverItem: MutableRefObject<number>,
    sortHandler: () => void,
    deleteHandler: (imgURL: string) => void,
}

export default function DraggableImage({
    imageURL,
    index,
    dragItem,
    draggedOverItem,
    sortHandler,
    deleteHandler,
}: DraggableImageProps) {
    const [moveIconIsHovered, setMoveIconIsHovered] = useState(false);

    return (
        <div
            className={styles.container}
            draggable
            key={imageURL + index}
            onDragStart={() => dragItem.current = index}
            onDragEnter={() => draggedOverItem.current = index}
            onDragEnd={sortHandler}
            onDragOver={(e) => e.preventDefault()}
        >
            <FontAwesomeIcon
                icon={faBraille}
                className={styles['move-icon']}
                onMouseEnter={() => setMoveIconIsHovered(true)}
                onMouseLeave={() => setMoveIconIsHovered(false)}
            />
            <img src={imageURL} alt="" />
            <div className={styles['hover-layer']} />
            <FontAwesomeIcon
                className={styles['hover-link-icon']}
                icon={faTrashCan}
                style={moveIconIsHovered ? { display: 'none' } : {}}
                shake
                onClick={() => deleteHandler(imageURL)}
            />
        </div>
    );
}