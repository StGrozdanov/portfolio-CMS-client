import { useEffect, useState } from "react";
import { JobDetails } from "../../../../../../../services/interfaces/portfolio-service-interfaces";
import { useAuthContext } from "../../../../../../../hooks/useAuthContext";
import { portfolioAPI } from "../../../../../../../services/portfolio-service";
import { useJobsAndProjectsContext } from "../../../../../../../hooks/useJobsAndProjectsContext";

/**
* Hook that keeps the state of the user jobs and exposes handlers to edit associated data 
* @param companyName the name of the company
*/
export const useJobsTemplate = (companyName: string) => {
    const [job, setJob] = useState<JobDetails>();
    const { jobs, getJobByCompanyName, projects } = useJobsAndProjectsContext();
    const { token } = useAuthContext();

    useEffect(() => {
        const targetJob = getJobByCompanyName(companyName);
        setJob(targetJob);
    }, [companyName]);

    /**
     * Handler that is used to update the job images in the state and send them to the server
     * @param images array of strings
     */
    const updateJobImagesHandler = (images: string[]) => {
        if (job) {
            setJob((oldState) => {
                if (oldState) {
                    const newState = { ...oldState, imgUrl: images }
                    const updatedJobs = jobs.filter(currJob => currJob.company !== job.company);
                    updatedJobs.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs: updatedJobs,
                                projects,
                                id: 1,
                            },
                            authToken: token,
                        })
                        .then(response => console.info(response))
                        .catch(error => console.error(error));

                    return newState;
                }
            });
        }
    }

    /**
     * Updates the data about the company into the state and sends it to the server
     * @param company the name of the company
     */
    const updateJobCompanyNameHandler = (company: string) => {
        if (job) {
            setJob((oldState) => {
                if (oldState) {
                    const newState = { ...oldState, company }
                    const updatedJobs = jobs.filter(currJob => currJob.company !== job.company);
                    updatedJobs.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs: updatedJobs,
                                projects,
                                id: 1,
                            },
                            authToken: token,
                        })
                        .then(response => console.info(response))
                        .catch(error => console.error(error));

                    return newState;
                }
            });
        }
    }

    /**
     * Handler that updates the job data in the state and sends it to the server
     * @param title the position in the company
     */
    const updateJobTitleHandler = (title: string) => {
        if (job) {
            setJob((oldState) => {
                if (oldState) {
                    const newState = { ...oldState, title }
                    const updatedJobs = jobs.filter(currJob => currJob.company !== job.company);
                    updatedJobs.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs: updatedJobs,
                                projects,
                                id: 1,
                            },
                            authToken: token,
                        })
                        .then(response => console.info(response))
                        .catch(error => console.error(error));

                    return newState;
                }
            });
        }
    }

    /**
     * Handler that updates the job data in the state and sends it to the server
     * @param started_at that started at date in YYYY-MM-dd format
     */
    const updateJobStartedAtHandler = (started_at: string) => {
        if (job) {
            setJob((oldState) => {
                if (oldState) {
                    const parsedDate = started_at as unknown as Date;

                    const newState = { ...oldState, started_at: parsedDate }
                    const updatedJobs = jobs.filter(currJob => currJob.company !== job.company);
                    updatedJobs.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs: updatedJobs,
                                projects,
                                id: 1,
                            },
                            authToken: token,
                        })
                        .then(response => console.info(response))
                        .catch(error => console.error(error));

                    return newState;
                }
            });
        }
    }

    /**
     * Handler that updates the job data in the state and sends it to the server
     * @param ended_at that ended at date in YYYY-MM-dd format
     */
    const updateJobEndedAtHandler = (ended_at: string) => {
        if (job) {
            setJob((oldState) => {
                if (oldState) {
                    const parsedDate = ended_at as unknown as Date;

                    const newState = { ...oldState, ended_at: parsedDate }
                    const updatedJobs = jobs.filter(currJob => currJob.company !== job.company);
                    updatedJobs.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs: updatedJobs,
                                projects,
                                id: 1,
                            },
                            authToken: token,
                        })
                        .then(response => console.info(response))
                        .catch(error => console.error(error));

                    return newState;
                }
            });
        }
    }

    /**
     * Handler that updates the job data in the state and sends it to the server
     * @param concept description about the company expertise and field of operations
     */
    const updateJobConceptHandler = (concept: string) => {
        if (job) {
            setJob((oldState) => {
                if (oldState) {
                    const newState = { ...oldState, concept }
                    const updatedJobs = jobs.filter(currJob => currJob.company !== job.company);
                    updatedJobs.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs: updatedJobs,
                                projects,
                                id: 1,
                            },
                            authToken: token,
                        })
                        .then(response => console.info(response))
                        .catch(error => console.error(error));

                    return newState;
                }
            });
        }
    }

    /**
     * Handler that updates the job data in the state and sends it to the server
     * @param techStack your tech stack in the company
     */
    const updateJobTechStackHandler = (techStack: string) => {
        if (job) {
            setJob((oldState) => {
                if (oldState) {
                    const toArray = techStack.split('\n');

                    const newState = { ...oldState, techStack: toArray }
                    const updatedJobs = jobs.filter(currJob => currJob.company !== job.company);
                    updatedJobs.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs: updatedJobs,
                                projects,
                                id: 1,
                            },
                            authToken: token,
                        })
                        .then(response => console.info(response))
                        .catch(error => console.error(error));

                    return newState;
                }
            });
        }
    }

    /**
    * Handler that updates the job data in the state and sends it to the server
    * @param contribution what have you contributed with
    */
    const updateJobContributionHandler = (contribution: string) => {
        if (job) {
            setJob((oldState) => {
                if (oldState) {
                    const toArray = contribution.split('\n');

                    const newState = { ...oldState, achievements: toArray }
                    const updatedJobs = jobs.filter(currJob => currJob.company !== job.company);
                    updatedJobs.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs: updatedJobs,
                                projects,
                                id: 1,
                            },
                            authToken: token,
                        })
                        .then(response => console.info(response))
                        .catch(error => console.error(error));

                    return newState;
                }
            });
        }
    }

    return {
        job,
        updateJobCompanyNameHandler,
        updateJobConceptHandler,
        updateJobContributionHandler,
        updateJobEndedAtHandler,
        updateJobImagesHandler,
        updateJobStartedAtHandler,
        updateJobTechStackHandler,
        updateJobTitleHandler,
    }
}