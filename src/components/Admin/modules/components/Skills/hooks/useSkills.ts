import { useEffect, useState } from "react";
import { AboutMeResponse } from "../../../../../../services/interfaces/portfolio-service-interfaces";
import { useAuthContext } from "../../../../../../hooks/useAuthContext";
import { portfolioAPI } from "../../../../../../services/portfolio-service";

/**
 * Hook that fetches and expose user skills for modificaiton
 * @returns the tech stack, the soft skills and the hobbies along with info if the request is still pending and handler for updating the information
 */
export const useSkills = () => {
    const [skills, setSkills] = useState<AboutMeResponse>();
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuthContext();

    useEffect(() => {
        portfolioAPI
            .getAboutMeInfo()
            .then(response => {
                setSkills(response);
                setIsLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    /**
     * handler that finds the column to be updated, updates the state and sends it to the server
     * @param updatedField this is the field data in a raw string text
     * @param fieldName can be tech stack, soft skills or hobbies
     */
    const updateFieldHandler = (updatedField: string, fieldName: string) => {
        const toArray = updatedField.split('\n');

        setSkills((oldState) => {
            if (!oldState) {
                return oldState;
            }

            let updatedState: AboutMeResponse = { hobbies: [], softSkills: [], techStack: [] };

            switch (fieldName) {
                case ('tech stack'):
                    updatedState = { ...oldState, techStack: toArray }
                    break;
                case ('soft skills'):
                    updatedState = { ...oldState, softSkills: toArray }
                    break;
                case ('hobbies'):
                    updatedState = { ...oldState, hobbies: toArray }
                    break;
            }

            portfolioAPI
                .updateUserSkills({ ...updatedState, id: 1 }, token)
                .then(response => console.info(response))
                .catch(err => console.error(err));

            return updatedState;
        })
    }

    return {
        skills,
        isLoading,
        updateFieldHandler,
    }
}