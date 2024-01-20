import Input from '../../../../../Input/Input';
import TextArea from '../../../../../TextArea/TextArea';
import styles from '../ProjectsAndJobs.module.scss';
import ImageBoard from '../../../../../ImageBoard/ImageBoard';
import { useJobsTemplate } from './hooks/useJobsTemplate';
import { useJobsAndProjectsContext } from '../../../../../../hooks/useJobsAndProjectsContext';
import { useModalContext } from '../../../../../../hooks/useModalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useJobInputModalContext } from '../../../../../../hooks/useProjectInputModalContext';
import moment from 'moment';

interface JobsTemplateProps {
    companyName: string,
    typeSetter: (type: string) => void,
}

export default function JobsTemplate({ companyName, typeSetter }: JobsTemplateProps) {
    const { removeJobByCompanyName, addJob } = useJobsAndProjectsContext();
    const confirmModal = useModalContext();
    const jobInputModal = useJobInputModalContext();

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
            <section className={styles['icons-container']}>
                <FontAwesomeIcon
                    icon={faTrashCan}
                    className={styles.remove}
                    onClick={() => {
                        confirmModal({ title: 'Are you sure you want to delete this project?' })
                            .then(() => {
                                removeJobByCompanyName(job?.company || '');
                                typeSetter('job');
                            })
                            .catch(() => console.info('action canceled.'))
                    }}
                />
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    className={styles['add-new']}
                    onClick={() => {
                        jobInputModal({
                            title: 'Add new Job',
                            updateStateHandler: addJob,
                        })
                            .then(() => console.info('confirmed'))
                            .catch(() => console.info('canceled'))
                    }}
                />
            </section>
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
                        defaultValue={moment(job?.started_at, 'YYYY-MM-DD').format('YYYY-MM-DD').toString()}
                    />
                    <legend>to</legend>
                    <Input
                        requestHandler={updateJobEndedAtHandler}
                        placeholder='ended at'
                        style={{ width: '100px' }}
                        defaultValue={moment(job?.ended_at, 'YYYY-MM-DD').format('YYYY-MM-DD').toString()}
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
                imageCollection={job?.images.map(image => image.imgURL) || []}
                uploadType="updateJobImage"
                tip="Upload"
                limit={2}
                updateStateHandler={updateJobImagesHandler}
                targetResourceTitle={job?.company}
            />
        </div>
    )
}