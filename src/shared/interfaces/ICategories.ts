export interface ICategory {
    url: string
    name: string
    slug: string
}

export interface ICategoriesResponse {
    categories  : ICategory[]
}