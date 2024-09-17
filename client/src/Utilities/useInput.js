import { useState } from "react"

function useInput(initialValue) {

    const [value, setValue] = useState(initialValue)

    const handleChange = e => {
        setValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return [value, { onChange: e => handleChange(e) }, () => setValue(initialValue)]
}

export default useInput