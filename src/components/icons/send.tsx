import { type FC } from 'react'
import { type TIconProps } from '../../core/types'

export const SendIcon: FC<TIconProps> = ({size=24, fill='#000'}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 21V14.25L10.8421 12L2 9.75V3L23 12L2 21Z" fill={fill}/>
    </svg>
)
