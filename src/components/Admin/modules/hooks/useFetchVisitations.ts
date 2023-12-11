import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { AnalyticData } from "../../../../services/interfaces/portfolio-service-interfaces";
import { portfolioAPI } from "../../../../services/portfolio-service";
import moment from "moment";

/**
 * Hook that fetches visitations data
 * @param query the filter - it can be quarter eg 1 2 3 4 (this is when we use number) or variation of strings
 * @returns the visitation data for the selected period along with formatted chart to visualise it
 */
export function useFetchVisitations(query: number | "today" | "yesterday" | "last7days" | "last30days" | "last90days" | "lastYear") {
    const [visitationsData, setVisitationsData] = useState<AnalyticData>();
    const [chartData, setChartData] = useState();
    const { token } = useAuthContext();

    useEffect(() => {
        const analytics = portfolioAPI.getAnalythics(query, token);
        const todayVisitations = portfolioAPI.getAnalythicsForTodayCount(token);

        Promise
            .all([analytics, todayVisitations])
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
                        todayVisitationCount: visitationsTodayCount.count
                    }
                );
            })
            .catch(err => console.error(err));
    }, [query]);

    return { visitationsData, chartData };
}