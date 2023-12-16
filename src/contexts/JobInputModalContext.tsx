import { createContext, useRef, useState } from "react";
import { ContainerProps } from "./types";
import { JobDetails } from "../services/interfaces/portfolio-service-interfaces";
import JobInputModal from "../components/ModalDialogue/JobInputModal/JobInputModal";

interface Options {
    title: string,
    updateStateHandler: (...args: any[]) => void,
}

interface JobInputModalContextType {
    openModal: (options: Options) => Promise<void>,
}

export const JobInputModalContext = createContext<JobInputModalContextType>({
    openModal: () => Promise.reject('modal context is not initialized'),
});

const initialJobState: JobDetails = {
    company: "",
    title: "",
    started_at: new Date,
    ended_at: null,
    concept: "",
    achievements: [],
    techStack: [],
    imgUrl: [],
}

export const JobInputModalProvider = ({ children }: ContainerProps) => {
    const [options, setOptions] = useState<Options | null>(null);
    const [job, setJob] = useState<JobDetails>(initialJobState);

    const awaitingPromiseRef = useRef<{ resolve: () => void, reject: () => void } | null>(null);

    const openModal = (options: Options): Promise<void> => {
        setOptions(options);
        return new Promise<void>((resolve: () => void, reject: () => void) => {
            awaitingPromiseRef.current = { resolve, reject };
        });
    };

    const handleClose = () => {
        if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.reject();
        }
        setOptions(null);
        setJob(initialJobState);
    };

    const handleConfirm = () => {
        if (awaitingPromiseRef.current) {
            options?.updateStateHandler(job);
            awaitingPromiseRef.current.resolve();
        }
        setOptions(null);
        setJob(initialJobState);
    };

    return (
        <JobInputModalContext.Provider value={{ openModal }}>
            {children}
            <JobInputModal
                job={job}
                content={options ? options.title : ''}
                onCancel={handleClose}
                onConfirm={handleConfirm}
                setJobsData={setJob}
            />
        </JobInputModalContext.Provider>
    );
}