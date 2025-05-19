import React, { type FC } from 'react'

export const AuthHOC: FC<{children: JSX.Element}> = ({children}) => {
    return (
        <>{children}</>
    )
}
