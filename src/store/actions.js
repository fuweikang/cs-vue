import { login } from "../utils/request"

const actions = {
  reqChangeUserInfo(context,obj) {
    context.commit("changeUserInfo",obj)
  }
}

export default actions