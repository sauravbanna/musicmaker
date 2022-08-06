import {useState} from 'react'

const useInputAndError = (initial : string) : [string, any, string, any] => {
    const [input, setInput] = useState<string>(initial);

    const [inputError, setInputError] = useState<string>("");

    return [input, setInput, inputError, setInputError];
}

export default useInputAndError