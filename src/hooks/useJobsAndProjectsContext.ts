import { useContext } from "react";
import { JobsAndProjectsContext, JobsAndProjectsContextType } from "../contexts/JobsAndProjectsContext";

/**
 * Jobs and Projects context hook that allows access to the context props
 */
export const useJobsAndProjectsContext = (): JobsAndProjectsContextType => useContext(JobsAndProjectsContext) as JobsAndProjectsContextType;