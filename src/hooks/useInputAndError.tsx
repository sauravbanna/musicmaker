import {useState} from 'react'

const useInputAndError = <T,>(initial : T) : [T, any, string, any] => {
    const [value, setValue] = useState<T>(initial);

    const [valueError, setValueError] = useState<string>("");

    return [value, setValue, valueError, setValueError];
}

export function useInputAndErrorMap<T>(initial: T) {
    const [value, setValue, valueError, setValueError] = useInputAndError<T>(initial);

    return {
        value,
        setValue,
        valueError,
        setValueError
    }
}

export default useInputAndError

