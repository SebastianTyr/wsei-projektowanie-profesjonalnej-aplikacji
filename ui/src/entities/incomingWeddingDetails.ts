export interface IIncomingWeddingDetails {
 date: Date,
 address: {
    city: string,
    country: string,
    postCode: string,
    street: string
},
description: string
}