/* eslint-disable */
import { useEffect, useState } from "react";
import { ProjectsDetails } from "../../../../../../../services/interfaces/portfolio-service-interfaces";
import { useAuthContext } from "../../../../../../../hooks/useAuthContext";
import { portfolioAPI } from "../../../../../../../services/portfolio-service";
import { useJobsAndProjectsContext } from "../../../../../../../hooks/useJobsAndProjectsContext";

/**
* Hook that keeps the state of the user projects and exposes handlers to edit associated data 
* @param projectName the name of the project
*/
export const useProjectsTemplate = (projectName: string) => {
    const [project, setProject] = useState<ProjectsDetails>();
    const { projects, getProjectByTitle, jobs } = useJobsAndProjectsContext();
    const { token } = useAuthContext();

    useEffect(() => {
        const targetProject = getProjectByTitle(projectName);
        setProject(targetProject);
    }, [projectName]);

    /**
     * Handler that is used to update the project images in the state and send them to the server
     * @param images array of strings
     */
    const updateProjectImagesHandler = (images: string[]) => {
        if (project) {
            setProject((oldState) => {
                if (oldState) {
                    const newState = { ...oldState, imgUrl: images }
                    const updatedProjects = projects
                        .filter(currProject => currProject.title !== project.title);
                    updatedProjects.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs,
                                projects: updatedProjects,
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
     * Updates the data about the project into the state and sends it to the server
     * @param title the name of the project
     */
    const updateProjectTitleHandler = (title: string) => {
        if (project) {
            setProject((oldState) => {
                if (oldState) {
                    const newState = { ...oldState, title }
                    const updatedProjects = projects
                        .filter(currProject => currProject.title !== project.title);
                    updatedProjects.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs,
                                projects: updatedProjects,
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
     * Handler that updates the project data in the state and sends it to the server
     * @param startedAt started at date in YYYY-MM-dd format
     */
    const updateProjectStartedAtHandler = (startedAt: string) => {
        if (project) {
            setProject((oldState) => {
                const parsedDate = startedAt as unknown as Date;
                if (oldState) {
                    const newState = { ...oldState, startedAt: parsedDate }
                    const updatedProjects = projects
                        .filter(currProject => currProject.title !== project.title);
                    updatedProjects.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs,
                                projects: updatedProjects,
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
     * Handler that updates the project data in the state and sends it to the server
     * @param endedAt ended at date in YYYY-MM-dd format
     */
    const updateProjectEndDateHandler = (endedAt: string) => {
        if (project) {
            setProject((oldState) => {
                const parsedDate = endedAt as unknown as Date;
                if (oldState) {
                    const newState = { ...oldState, endedAt: parsedDate }
                    const updatedProjects = projects
                        .filter(currProject => currProject.title !== project.title);
                    updatedProjects.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs,
                                projects: updatedProjects,
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
     * Handler that updates the project data in the state and sends it to the server
     * @param concept description about the product
     */
    const updateProjectConceptHandler = (concept: string) => {
        if (project) {
            setProject((oldState) => {
                if (oldState) {
                    const newState = { ...oldState, concept }
                    const updatedProjects = projects
                        .filter(currProject => currProject.title !== project.title);
                    updatedProjects.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs,
                                projects: updatedProjects,
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
     * Handler that updates the project data in the state and sends it to the server
     * @param repository of the code
     */
    const updateProjectRepositoryHandler = (repository: string) => {
        if (project) {
            setProject((oldState) => {
                if (oldState) {
                    const newState = { ...oldState, repository }
                    const updatedProjects = projects
                        .filter(currProject => currProject.title !== project.title);
                    updatedProjects.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs,
                                projects: updatedProjects,
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
     * Handler that updates the project data in the state and sends it to the server
     * @param description about the deployed project
     */
    const updateProjectDescriptionHandler = (description: string) => {
        if (project) {
            setProject((oldState) => {
                if (oldState) {
                    const newState = { ...oldState, description }
                    const updatedProjects = projects
                        .filter(currProject => currProject.title !== project.title);
                    updatedProjects.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs,
                                projects: updatedProjects,
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
     * Handler that updates the project data in the state and sends it to the server
     * @param link link to the deployed project
     */
    const updateProjectDeployLinkHandler = (link: string) => {
        if (project) {
            setProject((oldState) => {
                if (oldState) {
                    const newState = { ...oldState, link }
                    const updatedProjects = projects
                        .filter(currProject => currProject.title !== project.title);
                    updatedProjects.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs,
                                projects: updatedProjects,
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
     * Handler that updates the project data in the state and sends it to the server
     * @param techStack the used tech stack
     */
    const updateProjectTechStackHandler = (techStack: string) => {
        if (project) {
            setProject((oldState) => {
                if (oldState) {
                    const toArray = techStack.split('\n');

                    const newState = { ...oldState, techStack: toArray }
                    const updatedProjects = projects
                        .filter(currProject => currProject.title !== project.title);
                    updatedProjects.push(newState);

                    portfolioAPI
                        .updateUserJobsAndProjects({
                            data: {
                                jobs,
                                projects: updatedProjects,
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
    }
}