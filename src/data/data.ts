export const authRes = {
  status: 'success',
  data: {
    id: 2,
    provider: 'email',
    uid: 'user0@gmail.com',
    allow_password_change: false,
    name: 'takashi4 update',
    image: {
      url: null,
    },
    email: 'user0@gmail.com',
    created_at: '2021-11-29T11:24:42.980Z',
    updated_at: '2021-11-29T11:24:43.056Z',
    introduction: 'testtest',
    prefecture: 1,
  },
}
export const signInRes = {
  data: {
    email: 'user0@gmail.com',
    uid: 'user0@gmail.com',
    image: {
      url: null,
    },
    id: 2,
    provider: 'email',
    allow_password_change: false,
    name: 'takashi4 update',
    introduction: 'testtest',
    prefecture: 1,
  },
}
export const sessionRes = {
  id: 2,
  provider: 'email',
  uid: 'user0@gmail.com',
  allow_password_change: false,
  name: 'takashi4 update',
  image: {
    url: null,
  },
  email: 'user0@gmail.com',
  created_at: '2021-11-29T11:24:42.980Z',
  updated_at: '2021-11-29T11:28:32.029Z',
  introduction: 'testtest',
  prefecture: 1,
}
export const postRes = {
  title: 'update',
  body: 'test',
  prefecture: 'test',
  city: 'test',
  town: 'test',
  user_id: 2,
  image: {
    url: null,
  },
  id: 2,
  created_at: '2021-11-29T12:07:52.161Z',
  updated_at: '2021-11-29T12:08:44.215Z',
}
export const commentRes = {
  id: 2,
  comment: 'test update',
  user_id: 2,
  post_id: 3,
  created_at: '2021-11-29T12:33:57.621Z',
  updated_at: '2021-11-29T12:33:57.621Z',
}
export const favoriteRes = {
  id: 1,
  user_id: 2,
  post_id: 3,
  created_at: '2021-11-29T12:38:05.237Z',
  updated_at: '2021-11-29T12:38:05.237Z',
}
export const rateRes = {
  id: 1,
  rate: 3.0,
  user_id: 2,
  post_id: 3,
  created_at: '2021-11-29T12:43:42.722Z',
  updated_at: '2021-11-29T12:44:02.921Z',
}
