import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import styles from './AnimatedIconInput.module.scss';
import { useDebounce } from "../../../hooks/useDebounce";

interface AnimatedIconInputProps extends InputHTMLAttributes<HTMLInputElement> {
    fontAwesomeIcon: IconProp,
    tip?: string,
    requestHandler: (input: string) => void,
}

export default function AnimatedIconInput({
    fontAwesomeIcon,
    defaultValue,
    className,
    tip,
    requestHandler
}: AnimatedIconInputProps) {
    const [showInput, setShowInput] = useState(false);
    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 800);

    useEffect(() => {
        setInput(defaultValue as string);
    }, [defaultValue]);

    const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);

    useEffect(() => {
        if (debouncedInput !== '' && debouncedInput === input && input !== defaultValue) {
            requestHandler(debouncedInput as string);
        }
    }, [input, debouncedInput]);

    return (
        <div className={styles.container}>
            <FontAwesomeIcon
                icon={fontAwesomeIcon}
                onClick={() => setShowInput(!showInput)}
            />
            <input
                className={className ? className : styles.input}
                type="text"
                style={showInput ? { display: 'initial' } : { display: 'none' }}
                value={input}
                onChange={inputChangeHandler}
            />
            {tip && <span className={styles.tooltiptext}>{tip}</span>}
        </div>
    );
}