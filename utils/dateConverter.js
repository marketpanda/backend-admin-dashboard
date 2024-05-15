export const convertToUnixTimeStamp = (ts) => {
    if (!ts) return null

    const unixTimeStamp = new Date(ts).getTime() 
    return Math.floor(unixTimeStamp / 1000)     
}

 
