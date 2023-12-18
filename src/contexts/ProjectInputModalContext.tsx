import { createContext, useRef, useState } from "react";
import { ContainerProps } from "./types";
import { ProjectsDetails } from "../services/interfaces/portfolio-service-interfaces";
import ProjectInputModal from "../components/ModalDialogue/ProjectInputModal/ProjectInputModal";

interface Options {
    title: string,
    updateStateHandler: (...args: any[]) => void,
}

interface ProjectInputModalContextType {
    openModal: (options: Options) => Promise<void>,
}

export const ProjectInputModalContext = createContext<ProjectInputModalContextType>({
    openModal: () => Promise.reject('modal context is not initialized'),
});

const initialProjectState: ProjectsDetails = {
    title: "",
    images: [],
    startedAt: new Date,
    endedAt: null,
    description: "",
    link: "",
    repository: "",
    summary: "",
    techStack: []
}

export const ProjectInputModalProvider = ({ children }: ContainerProps) => {
    const [options, setOptions] = useState<Options | null>(null);
    const [project, setProject] = useState<ProjectsDetails>(initialProjectState);

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
        setProject(initialProjectState);
    };

    const handleConfirm = () => {
        if (awaitingPromiseRef.current) {
            options?.updateStateHandler(project);
            awaitingPromiseRef.current.resolve();
        }
        setOptions(null);
        setProject(initialProjectState);
    };

    return (
        <ProjectInputModalContext.Provider value={{ openModal }}>
            {children}
            <ProjectInputModal
                project={project}
                content={options ? options.title : ''}
                onCancel={handleClose}
                onConfirm={handleConfirm}
                setProjectsData={setProject}
            />
        </ProjectInputModalContext.Provider>
    );
}