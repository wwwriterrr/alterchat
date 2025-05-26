
const roomDtFromTs = (timestamp: number) => {
    let res: string = '';

    const dt = new Date(timestamp*1000);
    const now = new Date();
    const dtYear = dt.getFullYear();
    const nowYear = now.getFullYear();
    const dtMonth = dt.getMonth()+1;
    const nowMonth = now.getMonth()+1;
    const dtDay = dt.getDate();
    const nowDay = now.getDate();

    if(nowYear !== dtYear){
        res = `${dtDay < 10 ? '0' : ''}${dtDay}.${dtMonth < 10 ? '0' : ''}${dtMonth}.${dtYear}`;
    }else{
        if(dtDay === nowDay && dtMonth === nowMonth){
            const h = dt.getHours();
            const m = dt.getMinutes();
            res = `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`
        }else{
            res = `${dtDay < 10 ? '0' : ''}${dtDay}.${dtMonth < 10 ? '0' : ''}${dtMonth}`;
        }
    }

    return res;
}

export const AppUtils = {
    roomDtFromTs
}
