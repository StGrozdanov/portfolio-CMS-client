import { createContext, useRef, useState } from "react";
import { ContainerProps } from "./types";
import { CarouselImage } from "../services/interfaces/portfolio-service-interfaces";
import CarouselInputModal from "../components/ModalDialogue/InputModal/InputModal";

interface Options {
    title: string,
    updateStateHandler: (...args: any[]) => void,
}

interface CarouselInputModalContextType {
    openModal: (options: Options) => Promise<void>,
}

export const CarouselInputModalContext = createContext<CarouselInputModalContextType>({
    openModal: () => Promise.reject('modal context is not initialized'),
});

const initialCarouselState: CarouselImage = {
    data: { label: '', linkTitle: '', type: '' },
    imgURL: '',
    height: 0,
    width: 0,
}

export const CarouselInputModalProvider = ({ children }: ContainerProps) => {
    const [options, setOptions] = useState<Options | null>(null);
    const [carouselData, setCarouselData] = useState<CarouselImage>(initialCarouselState);

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
        setCarouselData(initialCarouselState);
    };

    const handleConfirm = () => {
        if (awaitingPromiseRef.current) {
            if (carouselData?.imgURL !== '' && carouselData?.data.label !== '' && carouselData?.data.type && carouselData?.data.linkTitle !== '') {
                options?.updateStateHandler(carouselData);
            }
            awaitingPromiseRef.current.resolve();
        }
        setOptions(null);
        setCarouselData(initialCarouselState);
    };

    return (
        <CarouselInputModalContext.Provider value={{ openModal }}>
            {children}
            <CarouselInputModal
                carouselData={carouselData}
                content={options ? options.title : ''}
                onCancel={handleClose}
                onConfirm={handleConfirm}
                setCarouselData={setCarouselData}
            />
        </CarouselInputModalContext.Provider>
    );
}