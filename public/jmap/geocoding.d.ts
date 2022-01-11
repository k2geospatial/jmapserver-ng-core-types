declare interface JGeocodingOptions {
    /**
     * if true, returns all match that would begin with the search string
     */
    autoComplete?: boolean
    /**
     * if true, proceeds with a fuzzy search (ex: "montan" will match "montain")
     */
    fuzzyMatch?: boolean
    /**
     * a JLocation object, or null. If not specified, it is by default set to the map's extent center. If you want to disable proximity bias, pass null for this option.
     */
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
    attribution: string
}

declare interface JGeocodingSuccessEventParams {
    results: JGeocodingResult[]
}

declare interface JGeocodingErrorEventParams {
    error: any
}
