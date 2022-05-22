import { createStore } from "vuex";

export default createStore({
  state: {
    goodList: [
      {
        id: 1,
        name: "小米手机",
        price: 1999,
        checked: true,
      },
      {
        id: 2,
        name: "华为手机",
        price: 2999,
        checked: true,
      },
      {
        id: 3,
        name: "三星手机",
        price: 3999,
        checked: true,
      },
      {
        id: 4,
        name: "oppo手机",
        price: 4999,
        checked: true,
      },
      {
        id: 5,
        name: "苹果手机",
        price: 5999,
        checked: true,
      }
    ],
    adds: [],
  },
  getters: {
    //购物车商品列表
    cartProducts(state) {
      return state.adds.map((item1) => {
        let product = state.goodList.find((item2) => item2.id === item1.id);
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          checked: product.checked,
          num: item1.num,
          total_num: (product.price * item1.num)
        };
      });
    },
    // 购物车商品总数
    totalCount(state, getters) {
      return getters.cartProducts.reduce((total, item) => {
        if (item.checked) {   // 只有选中的商品才会计算到总数中
          return total + item.num;
        } else {
          return total;
        }
      }, 0);
    },
    // 购物车商品总价
    totalPrice(state, getters) {
      let total = 0;
      getters.cartProducts.forEach((item) => {
        if (item.checked) {
          total += item.price * item.num;
        }
      });
      return total.toFixed(2);
    }
  },
  mutations: {
    addCartMutation(state, data) {
      let record = state.adds.find((item) => item.id === data.id);
      if (!record) {
        state.adds.push({
          id: data.id,
          num: 1,
        });
      } else {
        //再一次添加,数量相加
        record.num++;
      }
    },
    
    changeNum(state, data) {
      state.adds.forEach((item) => {
        if (item.id === data.id) {
          item.num = data.num;
        }
      });
    },
    
    delProduct(state, data) {
      //  this.state.adds = this.state.adds.filter(item=>item.id!=data.id);
      this.state.adds.forEach((item, index) => {
          if (item.id === data.id) {
              this.state.adds.splice(index,1);
          }
      });
    },

    //清空购物车
    clearCart() {
      this.state.adds = [];
    },
  },
  actions: {
    addCart({ commit }, data) {
      commit("addCartMutation", data);
    },

    changeNumAction({ commit }, data) {
      commit("changeNum", data);
    },

    delProductAction({ commit }, data) {
      commit("delProduct", data);
    },

    clearAllCart({ commit }, data) {
      commit("clearCart", data);
    },
  },
});
