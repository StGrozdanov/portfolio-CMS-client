import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputHTMLAttributes } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from './FileUpload.module.scss';
import { fileUploadHandler } from "./utils/fileUploadHandlers";

interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
    fontAwesomeIcon: IconProp,
    tip?: string,
    uploadType: 'uploadCV' | 'updateProjectImage' | 'updateJobImage' | 'addPartners' | 'addCarousel',
    targetResourceTitle?: string,
    limited: boolean,
    fileUploadCallback?: (results: any) => void,
}

export default function FileUpload({
    fontAwesomeIcon,
    className,
    type = 'file',
    tip,
    uploadType,
    targetResourceTitle,
    limited,
    fileUploadCallback,
}: FileUploadProps) {
    const { token } = useAuthContext();

    const saveFile = async (e: React.SyntheticEvent) => {
        const element = e.target as HTMLInputElement;
        if (element.files) {
            const file = element.files[0];
            const fileName = uploadType !== 'uploadCV' ? 'image' : 'file';
            const formData = new FormData();
            formData.append(fileName, file);

            const result = await fileUploadHandler({
                formData,
                token,
                uploadType,
                companyName: targetResourceTitle,
                projectTitle: targetResourceTitle
            });

            fileUploadCallback && fileUploadCallback(result);
        }
    }

    return (
        <label htmlFor={limited ? '' : `file-${uploadType}`} className={styles.container} >
            <FontAwesomeIcon
                icon={fontAwesomeIcon}
                className={className}
                style={limited ? { color: 'gray', cursor: 'default' } : {}}
            />
            {tip && <span className={styles.tooltiptext}>{tip}</span>}
            <input
                id={`file-${uploadType}`}
                type={type}
                style={{ display: 'none' }}
                onChange={saveFile}
            />
        </label>
    );
}