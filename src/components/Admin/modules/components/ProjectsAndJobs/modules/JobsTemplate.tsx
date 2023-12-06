import Input from '../../../../../Input/Input';
import TextArea from '../../../../../TextArea/TextArea';
import styles from '../ProjectsAndJobs.module.scss';
import ImageBoard from '../../../../../ImageBoard/ImageBoard';
import { useJobsTemplate } from './hooks/useJobsTemplate';

interface JobsTemplateProps {
    companyName: string,
}

export default function JobsTemplate({ companyName }: JobsTemplateProps) {
    const {
        job,
        updateJobCompanyNameHandler,
        updateJobConceptHandler,
        updateJobContributionHandler,
        updateJobEndedAtHandler,
        updateJobImagesHandler,
        updateJobStartedAtHandler,
        updateJobTechStackHandler,
        updateJobTitleHandler,
    } = useJobsTemplate(companyName);
    return (
        <div className="animate__animated animate__fadeInLeft">
            <section className={styles['basic-info']}>
                <Input
                    requestHandler={updateJobCompanyNameHandler}
                    placeholder='Company'
                    style={{ width: '200px', marginLeft: '20px' }}
                    defaultValue={job?.company}
                />
                <Input
                    requestHandler={updateJobTitleHandler}
                    placeholder='Position'
                    style={{ width: '200px', marginLeft: '60px' }}
                    defaultValue={job?.title}
                />
                <section className={styles['date-section']}>
                    <legend>from</legend>
                    <Input
                        requestHandler={updateJobStartedAtHandler}
                        placeholder='started at'
                        style={{ width: '100px' }}
                        defaultValue={job?.started_at.toString()}
                    />
                    <legend>to</legend>
                    <Input
                        requestHandler={updateJobEndedAtHandler}
                        placeholder='ended at'
                        style={{ width: '100px' }}
                        defaultValue={job?.ended_at?.toString()}
                    />
                </section>
            </section>
            <section className={styles['main-info']}>
                <section>
                    <TextArea
                        label="Concept"
                        requestHandler={updateJobConceptHandler}
                        style={{ width: '25vw', height: '40vh' }}
                        defaultValue={job?.concept}
                        rows={10}
                    />
                </section>
                <TextArea
                    label="Tech Stack"
                    requestHandler={updateJobTechStackHandler}
                    style={{ width: '15vw', height: '60vh' }}
                    rows={20}
                    defaultValue={job?.techStack.toString().replaceAll(',', '\n')}
                />
                <section>
                    <TextArea
                        label="Contribution"
                        requestHandler={updateJobContributionHandler}
                        style={{ width: '25vw', height: '40vh' }}
                        rows={10}
                        defaultValue={job?.achievements.toString().replaceAll(',', '\n')}
                    />
                </section>
            </section>
            <ImageBoard
                heading="Job Images"
                imageCollection={job?.imgUrl || []}
                uploadType="updateJobImage"
                tip="Upload"
                limit={2}
                updateStateHandler={updateJobImagesHandler}
                targetResourceTitle={job?.company}
            />
        </div>
    )
}