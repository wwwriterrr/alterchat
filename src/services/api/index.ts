import { BackendUrl } from "../../core/constants";

export const AppFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const token = localStorage.getItem('access');

    if(!token){
        return Promise.reject('Token is missing');
    }

    let requestInit: RequestInit = {...init, headers: {
        ...init?.headers, 
        'Authorization': `Bearer ${token}`,
    }}

    const response = await fetch(input, requestInit);

    if(response.status === 401){
        // Token is failed

        const refresh = localStorage.getItem('refresh');

        if(!refresh){
            return Promise.reject('RToken is missing');
        }

        const url = new URL(`${BackendUrl}/token/refresh/`);

        const tokenResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({refresh})
        });

        if(!tokenResponse.ok){
            return Promise.reject('Error with refresh token');
        }

        const data: {access: string, refresh: string} = await tokenResponse.json();

        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);

        requestInit = {...init, headers: {
            ...init?.headers, 
            'Authorization': `Bearer ${data.access}`,
        }}

        const response = await fetch(input, requestInit);

        return response;
    }else{
        return response;
    }
}
