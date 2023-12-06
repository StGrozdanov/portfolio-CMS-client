import { InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import styles from './Input.module.scss';
import { useDebounce } from "../../hooks/useDebounce";

interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
    tip?: string,
    requestHandler: (input: string) => void,
}

export default function AnimatedIconInput({
    defaultValue,
    className,
    requestHandler,
    placeholder,
    style,
    name,
}: IconInputProps) {
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
            <input
                className={className ? className : styles.input}
                type="text"
                placeholder={placeholder}
                value={input}
                onChange={inputChangeHandler}
                style={style}
                name={name}
            />
        </div>
    );
}