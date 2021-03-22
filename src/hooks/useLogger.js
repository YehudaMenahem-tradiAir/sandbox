import { useEffect } from 'react'

export default function useLogger(val){
    useEffect(()=>{
        console.log(val)
    },[val])
}

