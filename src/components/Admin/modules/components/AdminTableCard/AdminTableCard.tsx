import styles from './AdminTableCard.module.scss';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { BrowserIconKey, DeviceIconKey, browserIcons, devicesIcons } from './utils';
import { BrowserValues, CountryValues, DeviceValues } from '../../../../../services/interfaces/portfolio-service-interfaces';

interface AdminTableCardProps {
    heading: 'COUNTRIES' | 'BROWSERS' | 'DEVICES',
    values?: CountryValues[] | BrowserValues[] | DeviceValues[],
}

export default function AdminTableCard({ heading, values }: AdminTableCardProps) {
    return (
        <article className={styles["stats-card"]}>
            <section className={styles['heading-section']}>
                <h4>{heading}</h4>
            </section>
            <ul>
                {
                    values?.map((value, index) => {
                        if (heading === 'COUNTRIES') {
                            const countries = value as CountryValues;

                            return <li key={countries.code + index}>
                                <span className={styles['country-flag']}>{getUnicodeFlagIcon(countries.code)}</span>
                                <span className={styles.content}>{countries.country}</span>
                                <span className={styles.count}>{countries.count}</span>
                            </li>
                        }

                        const browserValue = value as BrowserValues;
                        const browserName = browserValue.browser as BrowserIconKey;

                        if (heading === 'BROWSERS') {
                            return <li key={browserName + index}>
                                <span>{browserIcons[browserName] || browserIcons['Default']}</span>
                                <span className={styles.content}>{browserName}</span>
                                <span className={styles.count}>{browserValue.count}</span>
                            </li>
                        }

                        const deviceValue = value as DeviceValues;
                        const deviceName = deviceValue.device as DeviceIconKey;

                        return <li key={deviceName + index}>
                            <span>{devicesIcons[deviceName]}</span>
                            <span className={styles.content}>{deviceName}</span>
                            <span className={styles.count}>{deviceValue.count}</span>
                        </li>
                    })
                }
            </ul>
        </article>
    );
}