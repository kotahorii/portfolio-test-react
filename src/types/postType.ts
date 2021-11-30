import { prefecturesConst } from 'data/prefecture'
import { commentRes, favoriteRes, postRes, rateRes } from 'data/response'

export type Post = typeof postRes
export type CreatePost = {
  body: string
  title: string
  prefecture: typeof prefecturesConst[number]
  city: string
  town: string
  genre: number
  image: string
}
export type CreatePostFormData = FormData & {
  append(name: keyof CreatePost, value: String | Blob, fileName?: string): any
}
export type UpdatePost = CreatePost & { id: number }
export type UpdatePostFormData = FormData & {
  append(name: keyof UpdatePost, value: String | Blob, fileName?: string): any
}

export type Comment = typeof commentRes
export type CreateComment = {
  bookId: number
  comment: string
}
export type DeleteComment = {
  id: number
  bookId: string
}

export type Favorite = typeof favoriteRes
export type CreateFavorite = {
  bookId: number
}
export type DeleteFavorite = CreateFavorite & { id: number }

export type Rate = typeof rateRes
export type CreateRate = {
  bookId: number
  rate: number
}
export type UpdateRate = CreateRate & { id: number }

export type MenuType = {
  name: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  onClick?: () => void
}[]
