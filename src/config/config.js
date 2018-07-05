export const actionType = {
  all: {
    state: '-1',
  },
  praise: {
    state: '0',
    text: '点赞',
    route: 'praise'
  },
  collection: {
    state: '1',
    text: '收藏',
    route: 'collection',
  },
  comments: {
    state: '2',
    text: '评论',
    route: 'comments'
  },
}

export const categorys = [
  {
    category: "0",
    categoryName: "人像"
  },
  {
    category: "1",
    categoryName: "风景"
  },
  {
    category: "2",
    categoryName: "美食"
  },
  {
    category: "3",
    categoryName: "运动"
  }
]


export const findList = [
  {
    findType: 'new',
    findName: '最新'
  },
  {
    findType: 'hot',
    findName: '热门'
  },
  {
    findType: 'day',
    findName: '今日人气榜'
  },
  {
    findType: 'week',
    findName: '7天人气榜'
  },
  {
    findType: 'month',
    findName: '30天人气榜'
  }
]

export const state = {
  scuess: '1',
  error: '0'
}