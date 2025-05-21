export type TUser = {
    id: number,
    avatar: string,
    name: string,
    username: string,
    accessToken: string,
    refreshToken: string,
}

export type TIconProps = {
    size?: number | string,
    width?: number | string,
    height?: number | string,
    fill?: string,
    strokeWidth?: number,
}
