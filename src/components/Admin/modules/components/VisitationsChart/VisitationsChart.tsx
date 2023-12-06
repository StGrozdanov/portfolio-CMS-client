import { Chart } from "react-google-charts";
import { options } from "../../config/chartConfig";
import styles from './VisitationsChart.module.scss';

interface ChartProps {
    data: any | any[] | undefined,
}

export default function VisitationsChart({ data } : ChartProps) {
    return (
        <article className={styles["stats-graph"]}>
            <div className={styles.chart}>
                <Chart
                    chartType="AreaChart"
                    data={data}
                    options={options}
                />
            </div>
        </article>
    );
}