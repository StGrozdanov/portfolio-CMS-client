import { portfolioAPI } from "../../../services/portfolio-service"

interface FileUploadHandlerProps {
    uploadType: 'uploadCV' | 'updateProjectImage' | 'updateJobImage' | 'addPartners' | 'addCarousel',
    formData: FormData,
    token: string,
    projectTitle?: string,
    companyName?: string,
}

const uploadEndpoints = {
    uploadCV: (formData: FormData, token: string) => portfolioAPI.uploadCV(formData, token),
    addPartners: (formData: FormData, token: string) => portfolioAPI.uploadPartnerLogo(formData, token),
    addCarousel: (formData: FormData, token: string) => portfolioAPI.uploadCarouselImage(formData, token),
    updateProjectImage: (formData: FormData, token: string, projectTitle: string) => portfolioAPI.uploadProjectImage(formData, token, projectTitle),
    updateJobImage: (formData: FormData, token: string, companyName: string) => portfolioAPI.uploadJobImage(formData, token, companyName),
}

/**
 * Handler that sends the attached file to the server (currently supported pdf and images)
 * @param formData the form with the attached file
 * @param token the request access token
 * @param uploadType what is the type we are attaching for upload ? Can be carousel, partners, cv and so on
 * @param companyName if we are uploading image for a job then we need the company name
 * @param projectTitle if we are uploading image for a project then we need the project name
 * @returns array of the uploaded response data
 */
export const fileUploadHandler = async ({
    formData,
    token,
    uploadType,
    companyName,
    projectTitle
}: FileUploadHandlerProps): Promise<string[]> => {
    let result: string[] = [];
    let response;

    switch (uploadType) {
        case "addCarousel":
            response = await uploadEndpoints.addCarousel(formData, token);
            result = response  ? response.carousel_images : [];
            break;
        case "addPartners":
            response = await uploadEndpoints.addPartners(formData, token);
            result = response ? response.partners : [];
            break;
        case "uploadCV":
            response = await uploadEndpoints.uploadCV(formData, token);
            break;
        case "updateJobImage":
            response = await uploadEndpoints.updateJobImage(formData, token, companyName as string);
            result = response ? response.job_images : [];
            break;
        case "updateProjectImage":
            response = await uploadEndpoints.updateProjectImage(formData, token, projectTitle as string);
            result = response ? response.project_images : [];
            break;
        default:
            break;
    }
    return result;
}
