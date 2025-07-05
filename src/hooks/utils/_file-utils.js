/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _fileUtils = {
    /**
     * @string
     */
    BASE_URL: import.meta.env.BASE_URL,

    /**
     * @param {String} url
     * @param {String} filename
     */
    download: (url, filename) => {
        window.open(_fileUtils.resolvePath(url), "_blank")
    },

    /**
     * @param {String} path
     * @return {Promise<any>}
     */
    loadJSON: async (path) => {
        try {
            const resolvedPath = _fileUtils.resolvePath(path)
            const response = await fetch(resolvedPath)
            const contentType = response.headers.get("content-type") || ""

            if (!response.ok || !contentType.includes("application/json")) {
                return null
            }

            return await response.json()
        }
        catch (error) {
            console.error(`Failed to load JSON from ${path}:`, error)
            return null
        }
    },

    /**
     * @param {String} path
     * @return {String}
     */
    resolvePath: (path) => {
        if (path.startsWith("http"))
            return path
    
        const baseUrl = _fileUtils.BASE_URL || ""
        const cleanedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl
        const cleanedPath = path.startsWith("/") ? path.slice(1) : path
    
        return `${cleanedBase}/${cleanedPath}`
    },
}