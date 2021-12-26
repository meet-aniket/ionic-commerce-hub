import { OrderService } from '@/services/OrderService'
import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import OrderState from './OrderState'
import * as types from './mutation-types'
import { hasError, showToast } from '@/utils'
import { translate } from '@/i18n'

const actions: ActionTree<OrderState, RootState> = {
  
  // Find Orders
  async findOrders ( { commit, state }, payload) {
    let resp;
    try {
      resp = await OrderService.findOrder(payload)
      if (resp && resp.status === 200 && !hasError(resp)) {
        const orders = resp.data.grouped.orderId;
        console.log(orders);
        this.dispatch('product/getProductInformation', { orders });
        commit(types.ORDER_LIST_UPDATED, {
          items: orders.groups,
        });
      } else {
        showToast(translate("Something went wrong"));
      }
    } catch(error){
      showToast(translate("Something went wrong"));
    }
    return resp;
  },
  async getOrderDetails(){
    let resp;
    try{
      resp = await OrderService.findOrderDetails();
      console.log(resp);
    } catch(error) {
      console.log(error)
    }
  }
} 

export default actions


// resp = await ProductService.fetchProducts({
//   // used sku as we are currently only using sku to search for the product
//   "filters": ['sku: ' + payload.queryString],
//   "viewSize": payload.viewSize,
//   "viewIndex": payload.viewIndex
// })

// // resp.data.response.numFound tells the number of items in the response
// if (resp.status === 200 && resp.data.response.numFound > 0 && !hasError(resp)) {
//   let products = resp.data.response.docs;
//   const totalProductsCount = resp.data.response.numFound;

//   if (payload.viewIndex && payload.viewIndex > 0) products = state.products.list.concat(products)
//   commit(types.PRODUCT_SEARCH_UPDATED, { products: products, totalProductsCount: totalProductsCount })
// } else {
//   //showing error whenever getting no products in the response or having any other error
//   showToast(translate("Product not found"));
// }
// // Remove added loader only when new query and not the infinite scroll
// if (payload.viewIndex === 0) emitter.emit("dismissLoader");
//     } catch (error) {
//   console.log(error)
//   showToast(translate("Something went wrong"));
// }