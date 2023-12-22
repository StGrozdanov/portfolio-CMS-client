import { faCalendarCheck, faEye, faLaptop, faUsers } from "@fortawesome/free-solid-svg-icons";
import { normalizeFilterValue } from "../../utils/normalizeFilterValue";
import AdminStatsCard from "../AdminStatsCard/AdminStatsCard";
import ChartFilter from "../ChartFilter/ChartFilter";
import VisitationsChart from "../VisitationsChart/VisitationsChart";
import { useState } from "react";
import { useFetchVisitations } from "../../hooks/useFetchVisitations";
import AdminTableCard from "../AdminTableCard/AdminTableCard";

export default function Dashboard() {
    const [filter, setFilter] = useState<number | "today" | "yesterday" | "last7days" | "last30days" | "last90days" | "lastYear">('today');
    const {
        visitationsData,
        chartData,
        chartType,
        visitationsByBrowser,
        visitationsByCountry,
        visitationsByDevice,
    } = useFetchVisitations(filter);

    return (
        <>
            <AdminStatsCard
                heading={'VISITATIONS FOR ' + normalizeFilterValue(filter)}
                icon={faCalendarCheck}
                value={visitationsData?.totalVisitationsCount}
            />
            <AdminStatsCard
                heading={'MOST POPULAR DEVICE'}
                icon={faLaptop}
                value={visitationsData?.mostPopularDevice}
            />
            <AdminStatsCard
                heading={'MOST POPULAR LOCATION'}
                icon={faUsers}
                value={visitationsData?.mostPopularCountry}
            />
            <AdminStatsCard
                heading={'VISITATIONS TODAY'}
                icon={faEye}
                value={visitationsData?.todayVisitationCount}
            />
            <div style={{ display: 'flex', marginTop: '30px' }}>
                <ChartFilter filter={setFilter} />
                <VisitationsChart data={chartData} chartType={chartType} />
            </div>
            <section style={{ display: 'flex', justifyContent: 'space-around', marginTop: 15, marginBottom: 40, width: '100%' }}>
                <AdminTableCard
                    heading={'COUNTRIES'}
                    values={visitationsByCountry?.analytics}
                />
                <AdminTableCard
                    heading={'DEVICES'}
                    values={visitationsByDevice?.analytics}
                />
                <AdminTableCard
                    heading={'BROWSERS'}
                    values={visitationsByBrowser?.analytics}
                />
            </section>
        </>
    );
}
