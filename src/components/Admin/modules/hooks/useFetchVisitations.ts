import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { AnalyticData, BrowserValuesResponse, CountryValuesResponse, DeviceValuesResponse } from "../../../../services/interfaces/portfolio-service-interfaces";
import { portfolioAPI } from "../../../../services/portfolio-service";
import { GoogleChartWrapperChartType } from "react-google-charts";
import moment from "moment";

interface VisitationsHookReponse {
    visitationsData: AnalyticData | undefined,
    visitationsByCountry: CountryValuesResponse | undefined,
    visitationsByDevice: DeviceValuesResponse | undefined,
    visitationsByBrowser: BrowserValuesResponse | undefined,
    chartData: [[string, number]] | undefined,
    chartType: GoogleChartWrapperChartType,
}

/**
 * Hook that fetches visitations data
 * @param query the filter - it can be quarter eg 1 2 3 4 (this is when we use number) or variation of strings
 * @returns the visitation data for the selected period along with formatted chart to visualise it
 */
export function useFetchVisitations(query: number | "today" | "yesterday" | "last7days" | "last30days" | "last90days" | "lastYear"): VisitationsHookReponse {
    const [visitationsData, setVisitationsData] = useState<AnalyticData>();
    const [visitationsByCountry, setvisitationsByCountry] = useState<CountryValuesResponse>();
    const [visitationsByDevice, setvisitationsByDevice] = useState<DeviceValuesResponse>();
    const [visitationsByBrowser, setvisitationsByBrowser] = useState<BrowserValuesResponse>();
    const [chartData, setChartData] = useState<[[string, number]]>();
    const { token } = useAuthContext();

    const chartType: GoogleChartWrapperChartType =
        query === 'today' || query === 'yesterday'
            ? 'BarChart'
            : 'AreaChart';

    useEffect(() => {
        const analytics = portfolioAPI.getAnalythics(query, token);
        const todayVisitations = portfolioAPI.getAnalythicsForTodayCount(token);
        const allVisitationsByCountry = portfolioAPI.getAnalythicsByCountry(token);
        const allVisitationsByDevice = portfolioAPI.getAnalythicsByDevice(token);
        const allVisitationsByBrowser = portfolioAPI.getAnalythicsByBrowser(token);

        Promise
            .all([analytics, todayVisitations, allVisitationsByCountry, allVisitationsByDevice, allVisitationsByBrowser])
            .then(response => {
                const chartResult: any = [["Date", "Visitations"]];
                let visitationsCountForTheDate = 1;
                const visitationsAnalytics = response[0];
                const visitationsTodayCount = response[1];

                if (query !== 'today' && query !== 'yesterday') {
                    for (let index = 0; index < visitationsAnalytics.results.length; index++) {
                        const currDate = moment(visitationsAnalytics.results[index].date).utc(true).format('YYYY-MM-DD');
                        const searchedIndex = index + 1 < visitationsAnalytics.results.length ? index + 1 : 0;
                        const nextDate = moment(visitationsAnalytics.results[searchedIndex]?.date).utc(true).format('YYYY-MM-DD');

                        if (currDate === nextDate) {
                            visitationsCountForTheDate++;
                            continue
                        }

                        chartResult.push([currDate, visitationsCountForTheDate]);
                        visitationsCountForTheDate = 1;
                    }
                    setChartData(chartResult);
                } else {
                    for (let index = 0; index < visitationsAnalytics.results.length; index++) {
                        const currDate = moment(visitationsAnalytics.results[index].date).utc(true).format('HH:mm');
                        chartResult.push([currDate, visitationsCountForTheDate]);
                    }
                    setChartData(chartResult);
                }

                setVisitationsData(
                    {
                        ...visitationsAnalytics,
                        todayVisitationCount: visitationsTodayCount.count,
                    }
                );

                setvisitationsByCountry(response[2]);
                setvisitationsByDevice(response[3]);
                setvisitationsByBrowser(response[4]);
            })
            .catch(err => console.error(err));
    }, [query]);

    return {
        visitationsData,
        chartData,
        chartType,
        visitationsByCountry,
        visitationsByDevice,
        visitationsByBrowser,
    };
}