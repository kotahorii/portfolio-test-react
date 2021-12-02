import { commentRes, favoriteRes, postRes, rateRes } from 'data/response'

export type Post = typeof postRes
export type CreatePost = {
  body: string
  title: string
  prefecture: string
  city: string
  town: string
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
  postId: number | undefined
  comment: string
}
export type DeleteComment = {
  id: number
  postId: string
}

export type Favorite = typeof favoriteRes
export type CreateFavorite = {
  postId: number | undefined
}
export type DeleteFavorite = CreateFavorite & { id: number }

export type Rate = typeof rateRes
export type CreateRate = {
  postId: number | undefined
  rate: number
}
export type UpdateRate = CreateRate & { id: number | undefined }

export type MenuType = {
  name: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  onClick?: () => void
}[]
