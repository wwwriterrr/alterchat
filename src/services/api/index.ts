
export const AppFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const token = localStorage.getItem('access');

    if(!token){
        return Promise.reject('Token is missing');
    }

    const requestInit: RequestInit = {...init, headers: {
        ...init?.headers, 
        'Authorization': `Bearer ${token}`,
    }}

    const response = await fetch(input, requestInit);

    if(response.status === 401){

    }else{
        return response;
    }
}
