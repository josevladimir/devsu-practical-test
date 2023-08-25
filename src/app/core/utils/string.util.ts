function normalizeToSearch(searchTerm: string): string {
    return searchTerm.toLowerCase()
                     .replace('á','a')
                     .replace('é','e')
                     .replace('í','i')
                     .replace('ó','o')
                     .replace('ú','u');
}

export { normalizeToSearch }