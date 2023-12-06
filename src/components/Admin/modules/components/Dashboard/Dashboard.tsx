import { faCalendarCheck, faEye, faLaptop, faUsers } from "@fortawesome/free-solid-svg-icons";
import { normalizeFilterValue } from "../../utils/normalizeFilterValue";
import AdminStatsCard from "../AdminStatsCard/AdminStatsCard";
import ChartFilter from "../ChartFilter/ChartFilter";
import VisitationsChart from "../VisitationsChart/VisitationsChart";
import { useState } from "react";
import { useFetchVisitations } from "../../hooks/useFetchVisitations";

export default function Dashboard() {
    const [filter, setFilter] = useState<number | "today" | "yesterday" | "last7days" | "last30days" | "last90days" | "lastYear">('today');
    const { visitationsData, chartData } = useFetchVisitations(filter);

    return (
        <>
            <AdminStatsCard
                heading={'VISITATIONS FOR ' + normalizeFilterValue(filter)}
                icon={faCalendarCheck}
                value={visitationsData?.totalVisitationsCount} />
            <AdminStatsCard
                heading={'MOST POPULAR DEVICE'}
                icon={faLaptop}
                value={visitationsData?.mostPopularDevice} />
            <AdminStatsCard
                heading={'MOST POPULAR LOCATION'}
                icon={faUsers}
                value={visitationsData?.mostPopularCountry} />
            <AdminStatsCard
                heading={'VISITATIONS TODAY'}
                icon={faEye}
                value={visitationsData?.todayVisitationCount} />
            <ChartFilter filter={setFilter} />
            <VisitationsChart data={chartData} />
        </>
    );
}
