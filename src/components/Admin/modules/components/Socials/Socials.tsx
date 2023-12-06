import AnimatedAlternativeIconInput from '../../../../Input/AnimatedAlternativeIconInput/AnimatedAlternativeIconInput';
import styles from './Socials.module.scss';
import { useSocials } from './hooks/useSocials';

export default function Socials() {
    const {
        isLoading,
        socials,
        updateFacebookHandler,
        updateGithubHandler,
        updateLinkedInHandler
    } = useSocials();

    return (
        isLoading
            ? null
            : <article className={styles.container}>
                <h1>Socials</h1>
                <AnimatedAlternativeIconInput
                    tip='edit'
                    iconClassName={'fa fa-facebook'}
                    style={{ color: 'blue' }}
                    requestHandler={updateFacebookHandler}
                    defaultValue={socials?.facebook}
                />
                <AnimatedAlternativeIconInput
                    tip='edit'
                    iconClassName={'fa fa-linkedin'}
                    style={{ color: 'cornflowerblue' }}
                    requestHandler={updateLinkedInHandler}
                    defaultValue={socials?.linkedIn}
                />
                <AnimatedAlternativeIconInput
                    tip='edit'
                    iconClassName={'fa fa-github'}
                    style={{ color: 'dimgray' }}
                    requestHandler={updateGithubHandler}
                    defaultValue={socials?.github}
                />
            </article>
    );
}