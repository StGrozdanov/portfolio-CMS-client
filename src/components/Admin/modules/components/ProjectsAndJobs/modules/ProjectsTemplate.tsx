import { faCode, faGlobe } from "@fortawesome/free-solid-svg-icons";
import AnimatedIconInput from "../../../../../Input/AnimatedIconInput/AnimatedIconInput";
import Input from "../../../../../Input/Input";
import TextArea from "../../../../../TextArea/TextArea";
import styles from '../ProjectsAndJobs.module.scss';
import ImageBoard from "../../../../../ImageBoard/ImageBoard";
import { useProjectsTemplate } from "./hooks/useProjectsTemplate";

interface ProjectsTemplateProps {
    projectName: string,
}

export default function ProjectsTemplate({ projectName }: ProjectsTemplateProps) {
    const {
        project,
        updateProjectConceptHandler,
        updateProjectDeployLinkHandler,
        updateProjectDescriptionHandler,
        updateProjectEndDateHandler,
        updateProjectImagesHandler,
        updateProjectRepositoryHandler,
        updateProjectStartedAtHandler,
        updateProjectTechStackHandler,
        updateProjectTitleHandler,
    } = useProjectsTemplate(projectName);
    return (
        <div className="animate__animated animate__fadeInLeft">
            <section className={styles['basic-info']} style={{ justifyContent: 'space-between' }}>
                <Input
                    requestHandler={updateProjectTitleHandler}
                    placeholder='Name'
                    style={{ width: '320px' }}
                    defaultValue={project?.title}
                />
                <section className={styles['date-section']}>
                    <legend>from</legend>
                    <Input
                        requestHandler={updateProjectStartedAtHandler}
                        placeholder='started at'
                        style={{ width: '100px' }}
                        defaultValue={project?.startedAt.toString()}
                    />
                    <legend>to</legend>
                    <Input
                        requestHandler={updateProjectEndDateHandler}
                        placeholder='ended at'
                        style={{ width: '100px' }}
                        defaultValue={project?.endedAt?.toString()}
                    />
                </section>
            </section>
            <section className={styles['main-info']}>
                <section>
                    <TextArea
                        label="Concept"
                        requestHandler={updateProjectConceptHandler}
                        style={{ width: '25vw', height: '35vh' }}
                        defaultValue={project?.summary}
                        rows={9}
                    />
                    <AnimatedIconInput
                        requestHandler={updateProjectRepositoryHandler}
                        fontAwesomeIcon={faCode}
                        tip='repository'
                        defaultValue={project?.repository}
                    />
                </section>
                <TextArea
                    label="Tech Stack"
                    requestHandler={updateProjectTechStackHandler}
                    style={{ width: '15vw', height: '60vh' }}
                    rows={20}
                    defaultValue={project?.techStack.toString().replaceAll(',', '\n')}
                />
                <section>
                    <TextArea
                        label="Description"
                        requestHandler={updateProjectDescriptionHandler}
                        style={{ width: '25vw', height: '35vh' }}
                        defaultValue={project?.description}
                        rows={9}
                    />
                    <AnimatedIconInput
                        requestHandler={updateProjectDeployLinkHandler}
                        fontAwesomeIcon={faGlobe}
                        tip='deployment link'
                        defaultValue={project?.link}
                    />
                </section>
            </section>
            <ImageBoard
                heading="Project Images"
                imageCollection={project ? project.imgUrl : []}
                uploadType="updateProjectImage"
                tip="Upload"
                limit={2}
                updateStateHandler={updateProjectImagesHandler}
                targetResourceTitle={project?.title}
            />
        </div>
    )
}