export  interface IPair {
    pairId:string,
    likedUserId:string,
    likedUserFirstName: string,
    lastMessage: string,
    isToYou: boolean
}

export interface IPairMessage {
    pairId:string,
    pairMessageNo: number,
    fromUserId: string,
    toUserId: string,
    message: string,
    sentDate: Date
}