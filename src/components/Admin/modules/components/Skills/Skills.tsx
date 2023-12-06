import TextArea from '../../../../TextArea/TextArea';
import styles from './Skills.module.scss';
import { useSkills } from './hooks/useSkills';

export default function Skills() {
    const { isLoading, skills, updateFieldHandler } = useSkills();

    return (
        isLoading
            ? null
            : <article className={styles.container}>
                <h1>Skills</h1>
                <TextArea
                    style={{ width: '15vw', height: '60vh' }}
                    label="Tech Stack"
                    name="tech stack"
                    defaultValue={skills?.techStack.toString().replaceAll(',', '\n')}
                    requestHandler={updateFieldHandler}
                    rows={20}
                />
                <TextArea
                    style={{ width: '15vw', height: '60vh' }}
                    label="Soft Skills"
                    name="soft skills"
                    defaultValue={skills?.softSkills.toString().replaceAll(',', '\n')}
                    requestHandler={updateFieldHandler}
                    rows={20}
                />
                <TextArea
                    style={{ width: '15vw', height: '60vh' }}
                    label="Hobbies"
                    name="hobbies"
                    defaultValue={skills?.hobbies.toString().replaceAll(',', '\n')}
                    requestHandler={updateFieldHandler}
                    rows={20}
                />
            </article>
    );
}