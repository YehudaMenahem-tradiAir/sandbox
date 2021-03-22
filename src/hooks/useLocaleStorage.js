import { useEffect, useState } from 'react' 

function getSavedValue(key, initialVal){
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) return savedValue

    if (initialVal instanceof Function) return initialVal()
    return initialVal
}

export default function useLocaleStorage(key, initialVal){
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialVal)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key,value])

    return [value, setValue]
}