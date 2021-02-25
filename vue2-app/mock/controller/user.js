const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
  },
}

module.exports = [
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      // console.log(config.body)
      // const { username } = config.body
      // const token = tokens[username]
      const token = ''

      // mock error
      if (!token) {
        return {
          code: 200,
          message: 'Account and password 11--1',
        }
      }

      return {
        code: 200,
        data: token,
      }
    },
  },
  {
    url: '/user/xxx',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: 'success',
      }
    },
  },
  {
    url: '/1/xxx',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: 'password 11--1',
      }
    },
  },

  // get user info
  {
    url: '/user/info.*',
    type: 'get',
    response: config => {
      // const { token } = config.query
      // const info = users[token]

      // // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed',
      //   }
      // }

      return {
        code: 20000,
        data: 'info',
      }
    },
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success',
      }
    },
  },
]
