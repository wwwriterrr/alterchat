export type TUser = {
    id: number,
    avatar: string,
    name: string,
    username: string,
    groups?: string[],
}

export type TIconProps = {
    size?: number | string,
    width?: number | string,
    height?: number | string,
    fill?: string,
    strokeWidth?: number,
}

export type TRoom = {
    id: number,
    title: string | null,
    description: string | null,
    avatar: string | null,
    dt_created: number,
    dt_modified: number | null,
    members: TUser[],
    last_msg: string | null,
}

export type TFile = {
    id: number,
    url: string,
    type: string,
    name: string,
    description?: string | {name: string},
    video_data?: {
        gif: string,
        poster: string,
    }
}

export type TMessage = {
    id: number,
    user: TUser,
    dt_created: number,
    dt_modified: number | null,
    content: string,
    files: TFile[],
    read: number[],
}
