import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import styles from './ChartFilter.module.scss';

type ChartFilterProps = { filter: Dispatch<SetStateAction<number | "today" | "yesterday" | "last7days" | "last30days" | "last90days" | "lastYear">> }

export default function ChartFilter({ filter }: ChartFilterProps) {
    const [selectedOption, setSelectedOption] = useState<string>('today');

    const selectHandler = useCallback((e: React.FormEvent<HTMLOptionElement>) => {
        const selectedValue = e.currentTarget.value;
        setSelectedOption(selectedValue);
        const selectedValueIsNumber = selectedValue === '1' || selectedValue === '2' || selectedValue === '3' || selectedValue === '4';
        filter(selectedValueIsNumber ? Number(selectedValue) : selectedValue as "today" | "yesterday" | "last7days" | "last30days" | "last90days" | "lastYear");
    }, []);

    return (
        <article className={styles.container}>
            <section className={styles['heading-section']}>
                <h4>Metrics For</h4>
            </section>
            <section className={styles['options-container']}>
                <option
                    value="today"
                    className={selectedOption === 'today' ? styles.selected : ''}
                    onClick={selectHandler}
                >
                    Today
                </option>
                <option
                    value="yesterday"
                    className={selectedOption === 'yesterday' ? styles.selected : ''}
                    onClick={selectHandler}
                >
                    Yesterday
                </option>
                <option
                    value="last7days"
                    className={selectedOption === 'last7days' ? styles.selected : ''}
                    onClick={selectHandler}
                >
                    Last 7 Days
                </option>
                <option
                    value="last30days"
                    className={selectedOption === 'last30days' ? styles.selected : ''}
                    onClick={selectHandler}
                >
                    Last 30 Days
                </option>
                <option
                    value="last90days"
                    className={selectedOption === 'last90days' ? styles.selected : ''}
                    onClick={selectHandler}
                >
                    Last 90 Days
                </option>
                <option
                    value="lastYear"
                    className={selectedOption === 'lastYear' ? styles.selected : ''}
                    onClick={selectHandler}
                >
                    Last Year
                </option>
                <option
                    value={1}
                    className={selectedOption === '1' ? styles.selected : ''}
                    onClick={selectHandler}
                >
                    Quarter 1
                </option>
                <option
                    value={2}
                    className={selectedOption === '2' ? styles.selected : ''}
                    onClick={selectHandler}
                >
                    Quarter 2
                </option>
                <option
                    value={3}
                    className={selectedOption === '3' ? styles.selected : ''}
                    onClick={selectHandler}
                >
                    Quarter 3
                </option>
                <option
                    value={4}
                    className={selectedOption === '4' ? styles.selected : ''}
                    onClick={selectHandler}
                >
                    Quarter 4
                </option>
            </section>
        </article>
    );
}