declare interface JGeocodingOptions {
    autoComplete?: boolean
    fuzzyMatch?: boolean
    proximity?: JLocation | null | undefined
}

declare interface JGeocodingResult {
    id: string
    location: GeoJSON.Feature<GeoJSON.Point>
    boundingBox?:GeoJSON.Feature<GeoJSON.Polygon>
    query: string
    relevance: number
    title: string
    placeName: string
    atttribution: string
}

declare interface JGeocodingSuccessEventParams {
    results: JGeocodingResult[]
}

declare interface JGeocodingErrorEventParams {
    error: any
}
