import axios from "axios";
import { AboutMeResponse, BasicInfoResponse, JobsAndProjectsResponse, SocialsResponse, LoginResponse, AuthData, AnalyticsResponse, VisitationCountResponse, BasicUserInfo, PartnersUpdateResponse, CarouselsUpdateResponse, JobsUpdateResponse, ProjectsUpdateResponse, AboutMeRequest, SocialMediaInput, JobsAndProjectsInput, CountryValuesResponse, DeviceValuesResponse, BrowserValuesResponse } from "./interfaces/portfolio-service-interfaces";

const portfolioApiInstance = axios.create({
    baseURL: process.env.REACT_APP_PORTFOLIO_SERVICE_URL,
    timeout: 3000,
});

export const portfolioAPI = {
    getBasicUserInfo: async (): Promise<BasicInfoResponse> => {
        const response = await portfolioApiInstance.request({
            method: "GET",
            url: '/users/basic-info'
        });
        const result = await response.data;
        return result ? result : Promise.reject('No user info returned from the API');
    },
    getAboutMeInfo: async (): Promise<AboutMeResponse> => {
        const response = await portfolioApiInstance.request({
            method: "GET",
            url: '/users/skills'
        });
        const result = await response.data;
        return result ? result : Promise.reject('No response returned from the API');
    },
    getJobsAndProjectsInfo: async (): Promise<JobsAndProjectsResponse> => {
        const response = await portfolioApiInstance.request({
            method: "GET",
            url: '/users/jobs-and-projects'
        });
        const result = await response.data;
        return result ? result : Promise.reject('No response returned from the API');
    },
    getSocialsInfo: async (): Promise<SocialsResponse> => {
        const response = await portfolioApiInstance.request({
            method: "GET",
            url: '/users/socials'
        });
        const result = await response.data;
        return result ? result : Promise.reject('No response returned from the API');
    },
    authenticate: async (data: AuthData): Promise<LoginResponse> => {
        const response = await portfolioApiInstance.request({
            method: "POST",
            url: '/auth/login',
            data
        });
        const result = await response.data;
        return result ? result : Promise.reject('No response returned from the API');
    },
    getAnalythics: async (query: number | "today" | "yesterday" | "last7days" | "last30days" | "last90days" | "lastYear", authToken: string): Promise<AnalyticsResponse> => {
        const response = await portfolioApiInstance.request({
            method: "GET",
            url: `/analytics?${typeof query !== 'number' ? query : `quarter=${query}`}`,
            headers: { 'X-Authorization': authToken }
        });
        const result = await response.data;
        return result ? result : Promise.reject('No response returned from the API');
    },
    getAnalythicsForTodayCount: async (authToken: string): Promise<VisitationCountResponse> => {
        const response = await portfolioApiInstance.request({
            method: "GET",
            url: `/analytics/count`,
            headers: { 'X-Authorization': authToken }
        });
        const result = await response.data;
        return result ? result : Promise.reject('No response returned from the API');
    },
    getAnalythicsByCountry: async (authToken: string): Promise<CountryValuesResponse> => {
        const response = await portfolioApiInstance.request({
            method: "GET",
            url: `/analytics/country`,
            headers: { 'X-Authorization': authToken }
        });
        const result = await response.data;
        return result ? result : Promise.reject('No response returned from the API');
    },
    getAnalythicsByDevice: async (authToken: string): Promise<DeviceValuesResponse> => {
        const response = await portfolioApiInstance.request({
            method: "GET",
            url: `/analytics/device`,
            headers: { 'X-Authorization': authToken }
        });
        const result = await response.data;
        return result ? result : Promise.reject('No response returned from the API');
    },
    getAnalythicsByBrowser: async (authToken: string): Promise<BrowserValuesResponse> => {
        const response = await portfolioApiInstance.request({
            method: "GET",
            url: `/analytics/browser`,
            headers: { 'X-Authorization': authToken }
        });
        const result = await response.data;
        return result ? result : Promise.reject('No response returned from the API');
    },
    uploadCV: async (data: FormData, authToken: string): Promise<void> => {
        const response = await portfolioApiInstance.request({
            method: "POST",
            url: '/files/cv',
            data,
            headers: { 'X-Authorization': authToken }
        });
        return response.status === 201 ? Promise.resolve() : Promise.reject('No response returned from the API');
    },
    uploadProjectImage: async (data: FormData, authToken: string, projectTitle: string): Promise<ProjectsUpdateResponse> => {
        data.append('projectTitle', projectTitle);
        const response = await portfolioApiInstance.request({
            method: "POST",
            url: '/files/project-image',
            data,
            headers: { 'X-Authorization': authToken }
        });
        const result = await response.data;
        return response.status === 201 ? result : Promise.reject('No response returned from the API');
    },
    uploadJobImage: async (data: FormData, authToken: string, companyName: string): Promise<JobsUpdateResponse> => {
        data.append('companyName', companyName);
        const response = await portfolioApiInstance.request({
            method: "POST",
            url: '/files/job-image',
            data,
            headers: { 'X-Authorization': authToken }
        });
        const result = await response.data;
        return response.status === 201 ? result : Promise.reject('No response returned from the API');
    },
    uploadPartnerLogo: async (data: FormData, authToken: string): Promise<PartnersUpdateResponse> => {
        const response = await portfolioApiInstance.request({
            method: "POST",
            url: '/files/partners',
            data,
            headers: { 'X-Authorization': authToken }
        });
        const result = await response.data;
        return response.status === 201 ? result : Promise.reject('No response returned from the API');
    },
    uploadCarouselImage: async (data: FormData, authToken: string): Promise<CarouselsUpdateResponse> => {
        const response = await portfolioApiInstance.request({
            method: "POST",
            url: '/files/carousel',
            data,
            headers: { 'X-Authorization': authToken }
        });
        const result = await response.data;
        return response.status === 201 ? result : Promise.reject('No response returned from the API');
    },
    updateBaseUserInfo: async (data: BasicUserInfo, authToken: string): Promise<void> => {
        const response = await portfolioApiInstance.request({
            method: "PUT",
            url: '/users/basic-info',
            data,
            headers: { 'X-Authorization': authToken }
        });
        return response.status === 200 ? Promise.resolve() : Promise.reject('No response returned from the API');
    },
    deleteImage: async (data: { imageURL: string }, authToken: string): Promise<void> => {
        const response = await portfolioApiInstance.request({
            method: "DELETE",
            url: '/files/image',
            data,
            headers: { 'X-Authorization': authToken }
        });
        return response.status === 200 ? Promise.resolve() : Promise.reject('No response returned from the API');
    },
    updateUserSkills: async (data: AboutMeRequest, authToken: string): Promise<void> => {
        const response = await portfolioApiInstance.request({
            method: "PUT",
            url: '/users/skills',
            data,
            headers: { 'X-Authorization': authToken }
        });
        return response.status === 200 ? Promise.resolve() : Promise.reject('No response returned from the API');
    },
    updateUserSocials: async (data: SocialMediaInput, authToken: string): Promise<void> => {
        const response = await portfolioApiInstance.request({
            method: "PUT",
            url: '/users/socials',
            data,
            headers: { 'X-Authorization': authToken }
        });
        return response.status === 200 ? Promise.resolve() : Promise.reject('No response returned from the API');
    },
    updateUserJobsAndProjects: async ({ data, authToken }: JobsAndProjectsInput): Promise<void> => {
        const response = await portfolioApiInstance.request({
            method: "PUT",
            url: '/users/jobs-and-projects',
            data,
            headers: { 'X-Authorization': authToken }
        });
        return response.status === 200 ? Promise.resolve() : Promise.reject('No response returned from the API');
    },
}