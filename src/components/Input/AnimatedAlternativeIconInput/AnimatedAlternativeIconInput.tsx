import { InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import styles from './AnimatedAlternativeIconInput.module.scss';
import { useDebounce } from "../../../hooks/useDebounce";

interface AnimatedIconInputProps extends InputHTMLAttributes<HTMLInputElement> {
    iconClassName: string,
    tip?: string,
    requestHandler: (input: string) => void,
}

export default function AnimatedIconInput({
    iconClassName,
    defaultValue,
    className,
    tip,
    requestHandler,
    style,
}: AnimatedIconInputProps) {
    const [showInput, setShowInput] = useState(false);
    const [input, setInput] = useState(defaultValue);
    const debouncedInput = useDebounce(input, 800);

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
            <i
                className={iconClassName}
                style={style}
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