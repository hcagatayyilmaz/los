export type Location = {
    id: string
    latitude: number
    longitude: number
    name: string
    points: number
    taxonomy?: string | null
    imageUrl: string | null
    meta: any
    isActive: boolean
    endDate: Date | null
    startDate: Date | null
}
