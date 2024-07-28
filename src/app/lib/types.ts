export type Location = {
    id: string
    latitude: number
    longitude: number
    name_en: string
    name_de: string
    points: number
    taxonomy?: string | null
    imageUrl: string | null
    description_en?: string | null
    description_de?: string | null
    isActive: boolean
    endDate: Date | null
    startDate: Date | null
    isTheme: boolean | null
    pin: string | null
}
