import { createContext, useEffect, useState } from "react";
import { ContainerProps } from "./types";
import { JobDetails, ProjectsDetails } from "../services/interfaces/portfolio-service-interfaces";
import { portfolioAPI } from "../services/portfolio-service";
import { useAuthContext } from "../hooks/useAuthContext";

interface JobsAndProjects {
    jobs: JobDetails[],
    projects: ProjectsDetails[],
}

export interface JobsAndProjectsContextType {
    getJobByCompanyName: (companyName: string) => JobDetails | undefined,
    removeJobByCompanyName: (companyName: string) => void,
    getProjectByTitle: (title: string) => ProjectsDetails | undefined,
    removeProjectByTitle: (title: string) => void,
    jobs: JobDetails[],
    projects: ProjectsDetails[],
}

export const JobsAndProjectsContext = createContext<JobsAndProjectsContextType | null>(null);

export const JobsAndProjectsProvider = ({ children }: ContainerProps) => {
    const [jobs, setJobs] = useState<JobDetails[]>([]);
    const [projects, setProjects] = useState<ProjectsDetails[]>([]);
    const { token } = useAuthContext();

    useEffect(() => {
        portfolioAPI
            .getJobsAndProjectsInfo()
            .then(result => {
                const jobsAndProjects = result as unknown as JobsAndProjects;
                setJobs(jobsAndProjects.jobs);
                setProjects(jobsAndProjects.projects);
            })
    }, []);

    const getJobByCompanyName = (companyName: string) => jobs?.find(job => companyName === job.company);

    const removeJobByCompanyName = (companyName: string) => {
        const updatedJobs = jobs.filter(currentJob => currentJob.company !== companyName);

        setJobs(updatedJobs);

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
    }

    const getProjectByTitle = (title: string) => projects?.find(project => title === project.title);

    const removeProjectByTitle = (title: string) => {
        const updatedProjects = projects.filter(project => project.title !== title);

        setProjects(updatedProjects);

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
    }

    return (
        <JobsAndProjectsContext.Provider value={{
            getJobByCompanyName,
            removeJobByCompanyName,
            jobs,
            getProjectByTitle,
            removeProjectByTitle,
            projects,
        }}>
            {children}
        </JobsAndProjectsContext.Provider>
    );
}