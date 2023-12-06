import { useEffect, useState } from "react";
import { BasicInfoResponse, CarouselImage } from "../../../../../../services/interfaces/portfolio-service-interfaces";
import { useAuthContext } from "../../../../../../hooks/useAuthContext";
import { portfolioAPI } from "../../../../../../services/portfolio-service";

/**
 * Makes a request and retrieves user info as defined in the BasicInfoResponse interface
 * @returns BasicInfoResponse
 * @returns isLoading to indicate if the request is still fetching or not
 * @returns handlers for manipulating each of the fields of the basic info response object
 */
export const usePersonalInfo = () => {
    const [basicUserInfo, setBasicUserInfo] = useState<BasicInfoResponse>();
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuthContext();

    useEffect(() => {
        portfolioAPI
            .getBasicUserInfo()
            .then(response => {
                setBasicUserInfo(response);
                setIsLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    /**
     * Handler that updates partner images, sends them into the server and into the react state.
     * @argument string[] of partner images.
     */
    const updatePartnersHandler = (partners: string[]) => {
        if (basicUserInfo) {
            setBasicUserInfo((oldState) => {
                portfolioAPI
                    .updateBaseUserInfo({ ...basicUserInfo, partners, id: 1 }, token)
                    .then(response => console.error(response))
                    .catch(error => console.error(error));
                return { ...oldState as BasicInfoResponse, partners }
            });
        }
    }

    /**
     * Handler that updates carousel images, sends them into the server and into the react state.
     * @argument string[] of carousel images.
     */
    const updateCarouselImagesHandler = (carouselImages: string[]) => {
        if (basicUserInfo) {
            setBasicUserInfo((oldState) => {
                if (oldState) {
                    const updatedCarousel = oldState.carousel.map((carousel, index) => ({
                        ...carousel,
                        imgURL: carouselImages[index],
                    })).filter(carousel => carousel.imgURL);

                    portfolioAPI
                        .updateBaseUserInfo({ ...basicUserInfo, carousel: updatedCarousel, id: 1 }, token)
                        .then(response => console.error(response))
                        .catch(error => console.error(error));

                    return { ...oldState as BasicInfoResponse, carousel: updatedCarousel }
                }
            });
        }
    }

    /**
     * Handler that adds new carousel image, sends it into the server and into the react state.
     * @argument CarouselImage
     */
    const addNewCarouselImageHandler = (carouselImage: CarouselImage) => {
        if (basicUserInfo) {
            setBasicUserInfo((oldState) => {
                if (oldState) {
                    const carousel = oldState.carousel;
                    carousel.push(carouselImage);

                    portfolioAPI
                        .updateBaseUserInfo({ ...basicUserInfo, carousel, id: 1 }, token)
                        .then(response => console.error(response))
                        .catch(error => console.error(error));

                    return { ...oldState as BasicInfoResponse, carousel }
                }
            });
        }
    }

     /**
     * Handler that updates email of the user, sends it into the server and into the react state.
     * @argument string email.
     */
     const updateEmailRequestHandler = (email: string) => {
        if (basicUserInfo) {
            setBasicUserInfo((oldState) => {
                if (!oldState) {
                    return oldState;
                }

                portfolioAPI
                    .updateBaseUserInfo({ ...basicUserInfo, email, id: 1 }, token)
                    .then(response => console.error(response))
                    .catch(error => console.error(error));

                return { ...oldState, email }
            });
        }
    }

    /**
     * Handler that updates basic user info, sends it into the server and into the react state.
     * @argument string about me text
     */
    const updateAboutMeRequestHandler = (aboutMe: string) => {
        if (basicUserInfo) {
            setBasicUserInfo((oldState) => {
                if (!oldState) {
                    return oldState;
                }

                portfolioAPI
                    .updateBaseUserInfo({ ...basicUserInfo, aboutMe, id: 1 }, token)
                    .then(response => console.error(response))
                    .catch(error => console.error(error));

                return { ...oldState, aboutMe }
            });
        }
    }

    return {
        basicUserInfo,
        isLoading,
        updateAboutMeRequestHandler,
        updateCarouselImagesHandler,
        updateEmailRequestHandler,
        updatePartnersHandler,
        addNewCarouselImageHandler,
    }
}