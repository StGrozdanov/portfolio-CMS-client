import { createContext, useEffect, useState } from "react";
import { ContainerProps } from "./types";
import { JobDetails, ProjectsDetails } from "../services/interfaces/portfolio-service-interfaces";
import { portfolioAPI } from "../services/portfolio-service";

interface JobsAndProjects {
    jobs: JobDetails[],
    projects: ProjectsDetails[],
}

export interface JobsAndProjectsContextType {
    getJobByCompanyName: (companyName: string) => JobDetails | undefined,
    getProjectByTitle: (title: string) => ProjectsDetails | undefined,
    jobs: JobDetails[],
    projects: ProjectsDetails[],
}

export const JobsAndProjectsContext = createContext<JobsAndProjectsContextType | null>(null);

export const JobsAndProjectsProvider = ({ children }: ContainerProps) => {
    const [jobs, setJobs] = useState<JobDetails[]>([]);
    const [projects, setProjects] = useState<ProjectsDetails[]>([]);

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

    const getProjectByTitle = (title: string) => projects?.find(project => title === project.title);

    return (
        <JobsAndProjectsContext.Provider value={{
            getJobByCompanyName,
            jobs,
            getProjectByTitle,
            projects,
        }}>
            {children}
        </JobsAndProjectsContext.Provider>
    );
}