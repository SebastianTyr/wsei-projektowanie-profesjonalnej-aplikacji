export interface ICurrentUserDetails {
    addres: {
        city: string,
        country: string,
        postCode: string,
        street: string
    },
    birthDate: Date,
    coordinate: {
        latitude: number,
        longitude: number
    },
    description: string,
    email: string,
    firstName: string,
    gender: number,
    height: {
        unit: string,
        value: number
    },
    id: string,
    isConfirmed: boolean,
    photos: [
        {
            photoNo: number,
            photoUrl: string
        }
    ],
    secondName: string,
    userName: string,
    wantedGender: number,
    weight: {
        unit: string,
        value: number
    }
}