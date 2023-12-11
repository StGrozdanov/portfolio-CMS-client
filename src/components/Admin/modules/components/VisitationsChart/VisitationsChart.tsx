import { Chart, GoogleChartWrapperChartType } from "react-google-charts";
import { options } from "../../config/chartConfig";
import styles from './VisitationsChart.module.scss';

interface ChartProps {
    data: [[string, number]] | undefined,
    chartType: GoogleChartWrapperChartType
}

export default function VisitationsChart({ data, chartType }: ChartProps) {
    const colors = chartType === 'BarChart' ? ['#7f87cc'] : ['rgb(128, 138, 255)'];
    return (
        <article className={styles["stats-graph"]}>
            <div className={styles.chart}>
                {
                    data && data.length > 1
                        ? <Chart
                            chartType={chartType}
                            data={data}
                            options={{ ...options, colors }}
                            className={chartType === 'BarChart' ? styles['bar-chart'] : ''}
                        />
                        : <span className={styles['no-data']}>
                            <h4>No visitations data for the selected period</h4>
                        </span>
                }
            </div>
        </article>
    );
}