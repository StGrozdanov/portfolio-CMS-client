import { useEffect, useState } from "react";
import { SocialMedia } from "../../../../../../services/interfaces/portfolio-service-interfaces";
import { useAuthContext } from "../../../../../../hooks/useAuthContext";
import { portfolioAPI } from "../../../../../../services/portfolio-service";

/**
 * Hook that fetches data about the social media links and exposes handler to update it
 * @returns socials data
 * @returns isLoading - is the request still pending
 * @returns handlers - to update the state and the data on the server
 */
export const useSocials = () => {
    const [socials, setSocials] = useState<SocialMedia>();
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuthContext();

    useEffect(() => {
        portfolioAPI
            .getSocialsInfo()
            .then(response => {
                setSocials(response.socialMedia);
                setIsLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    /**
     * Handler to update the facebook link and send it to the server
     * @param facebook the facebook link
     */
    const updateFacebookHandler = (facebook: string) => {
        setSocials((oldState) => {
            if (!oldState) {
                return oldState;
            }

            const newState = { ...oldState, facebook }

            portfolioAPI
                .updateUserSocials({ ...newState, id: 1 }, token)
                .then(response => console.info(response))
                .catch(err => console.error(err));

            return newState;
        });
    }

    /**
     * Handler to update the instagram link and send it to the server
     * @param instagram the instagram link
     */
    const updateLinkedInHandler = (instagram: string) => {
        setSocials((oldState) => {
            if (!oldState) {
                return oldState;
            }

            const newState = { ...oldState, instagram }

            portfolioAPI
                .updateUserSocials({ ...newState, id: 1 }, token)
                .then(response => console.info(response))
                .catch(err => console.error(err));

            return newState;
        });
    }

    /**
     * Handler to update the github link and send it to the server
     * @param github the github link
     */
    const updateGithubHandler = (github: string) => {
        setSocials((oldState) => {
            if (!oldState) {
                return oldState;
            }

            const newState = { ...oldState, github }

            portfolioAPI
                .updateUserSocials({ ...newState, id: 1 }, token)
                .then(response => console.info(response))
                .catch(err => console.error(err));

            return newState;
        });
    }

    return {
        socials,
        isLoading,
        updateFacebookHandler,
        updateGithubHandler,
        updateLinkedInHandler,
    }
}