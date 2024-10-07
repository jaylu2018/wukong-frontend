import { request } from '@/utils'

export default {
  login: data => request.post('/v1/auth/login', data, { noNeedToken: true }),
}
