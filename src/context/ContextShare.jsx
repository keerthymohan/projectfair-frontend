import React, { createContext } from 'react'
import { useState } from 'react'

export const addResponseContext = createContext({})

function ContextShare({ children }) {

    const [addResponse, setAddResponse] = useState([])

    return (
        <>
            <addResponseContext.Provider value={{addResponse , setAddResponse}}>
                {children}
            </addResponseContext.Provider>
        </>
    )
}

export default ContextShare