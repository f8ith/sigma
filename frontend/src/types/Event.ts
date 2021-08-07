declare interface Event {
        id: number,
        name: string,
        gender: string,
        group: string,
        stage: string,
        completed: boolean,
        participants: Participant[]
}

declare interface Participant {
    name: string,
    id: string,
    gender: string,
    house: string,
    lane: number,
    time: string 
}
