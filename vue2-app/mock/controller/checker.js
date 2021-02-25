let data = {
  current: 1,
  total: 1,
  size: 2,
  list: [
    {
      sgNo: 'SG2020121709002',
      modelName: '雅阁1-2',
      brandName: '雅迪',
      carPic: 'https://img01.yzcdn.cn/vant/cat.jpeg',
    },
    {
      sgNo: 'SG2020121709002',
      modelName: '雅阁1-2',
      brandName: '雅迪',
      carPic: 'https://img01.yzcdn.cn/vant/cat.jpeg',
    },
    {
      sgNo: 'SG2020121709002',
      modelName: '雅阁1-2',
      brandName: '雅迪',
      carPic: 'https://img01.yzcdn.cn/vant/cat.jpeg',
    },
  ],
}

//验车员
module.exports = [
  {
    url: '/rec/getTodoCheckCarList',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: data,
      }
    },
  },
]
