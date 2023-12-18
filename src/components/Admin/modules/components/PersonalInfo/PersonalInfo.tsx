import { faEnvelope, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import FileUpload from "../../../../FileUpload/FileUpload";
import styles from './PersonalInfo.module.scss';
import AnimatedIconInput from "../../../../Input/AnimatedIconInput/AnimatedIconInput";
import TextArea from "../../../../TextArea/TextArea";
import ImageBoard from "../../../../ImageBoard/ImageBoard";
import { usePersonalInfo } from "./hooks/usePersonalInfo";

export default function PersonalInfo() {
    const {
        basicUserInfo,
        isLoading,
        updateAboutMeRequestHandler,
        updateCarouselImagesHandler,
        updateEmailRequestHandler,
        updatePartnersHandler,
        addNewCarouselImageHandler,
    } = usePersonalInfo();

    return (
        isLoading
            ? <span>Loading ...</span>
            :
            <article className={styles.container}>
                <h1>Personal Info</h1>
                <section className={styles['icon-section']}>
                    <section className={styles['email-and-cv-section']}>
                        <AnimatedIconInput
                            fontAwesomeIcon={faEnvelope}
                            defaultValue={basicUserInfo?.email}
                            tip="Update Email"
                            requestHandler={updateEmailRequestHandler}
                        />
                        <FileUpload
                            fontAwesomeIcon={faFileArrowUp}
                            tip="Upload your CV"
                            uploadType="uploadCV"
                            limited={false}
                        />
                    </section>
                </section>
                <TextArea
                    label="About Me"
                    name="about"
                    defaultValue={basicUserInfo?.aboutMe}
                    requestHandler={updateAboutMeRequestHandler}
                />
                <ImageBoard
                    heading="Partners Banners"
                    imageCollection={basicUserInfo ? basicUserInfo.partners.map(partner => partner.imgURL) : []}
                    updateStateHandler={updatePartnersHandler}
                    uploadType="addPartners"
                    tip="Upload banner"
                    limit={6}
                />
                <ImageBoard
                    heading="Carousel Images"
                    imageCollection={basicUserInfo ? basicUserInfo.carousel.map(carousel => carousel.imgURL) : []}
                    updateStateHandler={updateCarouselImagesHandler}
                    uploadType="addCarousel"
                    tip="Upload Carousel"
                    updateFromInputHandler={addNewCarouselImageHandler}
                />
            </article>
    );
}