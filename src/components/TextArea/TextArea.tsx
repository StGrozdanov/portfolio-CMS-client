import { TextareaHTMLAttributes, useCallback, useEffect, useState } from 'react';
import styles from './TextArea.module.scss';
import { useDebounce } from '../../hooks/useDebounce';

interface TextAreaProps extends TextareaHTMLAttributes<TextAreaProps> {
    label: string,
    requestHandler: (...args: any[]) => void,
}

export default function TextArea({
    defaultValue,
    rows = 4,
    cols = 50,
    name,
    label,
    requestHandler,
    className,
    style,
}: TextAreaProps) {
    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 800);

    useEffect(() => {
        setInput(defaultValue as string);
    }, [defaultValue]);

    const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    }, []);

    useEffect(() => {
        if (debouncedInput !== '' && debouncedInput === input && input !== defaultValue) {
            if (name === 'tech stack' || name === 'soft skills' || name === 'hobbies') {
                requestHandler(debouncedInput, name);
            } else {
                requestHandler(debouncedInput);
            }
        }
    }, [input, debouncedInput]);

    return (
        <section className={className ? className : styles['text-area-container']} style={style}>
            <label htmlFor={name}>{label}</label>
            <textarea
                name={name}
                rows={rows}
                cols={cols}
                value={input}
                onChange={inputChangeHandler}
            />
        </section>
    );
}