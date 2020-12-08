<template>
    <div>

        <section>
            <div class="breadcrumb">
                <div>Dashboard</div>
            </div>
            <div class="kanban-sec">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-9"></div>
                        <div class="col-xs-3">
                            <input type="search" placeholder="Search Order" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="kb-main">
                    <div class="kb-column">
                        <div class="kb-column-header">
                            <div class="float-left">New Order <span class="order-count">03</span></div>
                            <div class="float-right">
                                <button class="add-order" @click="showForm">+</button>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="ticket-sec">

                            <div class="ticket-main">
                                <div class="order-detail">
                                    <div>
                                        <div class="float-left">123456 [ 15:46 ]</div>
                                        <div class="float-right">Take Away</div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div>
                                        <div class="float-left">Pramod Karkera</div>
                                        <div class="float-right">9844217817</div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="ticket-main">
                                <div class="order-detail">
                                    <div>
                                        <div class="float-left">123456 [ 15:46 ]</div>
                                        <div class="float-right">Take Away</div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div>
                                        <div class="float-left">Pramod Karkera</div>
                                        <div class="float-right">9844217817</div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="ticket-main">
                                <div class="order-detail">
                                    <div>
                                        <div class="float-left">123456 [ 15:46 ]</div>
                                        <div class="float-right">Take Away</div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div>
                                        <div class="float-left">Pramod Karkera</div>
                                        <div class="float-right">9844217817</div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="order-description">
                                    <table class="order-tbl">
                                        <tbody>
                                            <tr class="order-tbl-header">
                                                <td class="text-center">Item Name</td>
                                                <td class="text-center">Qty</td>
                                                <td class="text-center">Price</td>
                                            </tr>
                                            <tr>
                                                <td>Margherita</td>
                                                <td class="text-center">01</td>
                                                <td class="text-right">$120.00</td>
                                            </tr>
                                            <tr>
                                                <td>Peppy Paneer</td>
                                                <td class="text-center">01</td>
                                                <td class="text-right">$150.00</td>
                                            </tr>
                                            <tr>
                                                <td>Deluxe Veggie</td>
                                                <td class="text-center">01</td>
                                                <td class="text-right">$180.00</td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <th class="text-center">03</th>
                                                <th class="text-right">$120.00</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="top6">
                                        <div class="float-right">
                                            <button class="edit-order-btn left-btn">Edit Order</button>
                                            <button class="cancel-order-btn">Cancel Order</button>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div class="kb-column">
                        <div class="kb-column-header">Being Prepared <span class="order-count">03</span></div>
                        <div class="ticket-sec">
                            <div class="ticket-main">
                                <div class="order-detail">
                                    <div>
                                        <div class="float-left">123456 [ 15:46 ]</div>
                                        <div class="float-right">Take Away</div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div>
                                        <div class="float-left">Pramod Karkera</div>
                                        <div class="float-right">9844217817</div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="kb-column">
                        <div class="kb-column-header">Prepared <span class="order-count">03</span></div>
                        <div class="ticket-sec">
                            <div class="ticket-main">
                                <div class="order-detail">
                                    <div>
                                        <div class="float-left">123456 [ 15:46 ]</div>
                                        <div class="float-right">Take Away</div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div>
                                        <div class="float-left">Pramod Karkera</div>
                                        <div class="float-right">9844217817</div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="kb-column">
                        <div class="kb-column-header">Packing <span class="order-count">03</span></div>
                        <div class="ticket-sec">
                            <div class="ticket-main">
                                <div class="order-detail">
                                    <div>
                                        <div class="float-left">123456 [ 15:46 ]</div>
                                        <div class="float-right">Take Away</div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div>
                                        <div class="float-left">Pramod Karkera</div>
                                        <div class="float-right">9844217817</div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                    <div class="kb-column">
                        <div class="kb-column-header">Ready To Be Delivered <span class="order-count">03</span></div>
                        <div class="ticket-sec">

                            <div class="ticket-main">
                                <div class="order-detail">
                                    <div>
                                        <div class="float-left">123456 [ 15:46 ]</div>
                                        <div class="float-right">Take Away</div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div>
                                        <div class="float-left">Pramod Karkera</div>
                                        <div class="float-right">9844217817</div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="order-description">
                                    <table class="order-tbl">
                                        <tbody>
                                            <tr class="order-tbl-header">
                                                <td class="text-center">Item Name</td>
                                                <td class="text-center">Qty</td>
                                                <td class="text-center">Price</td>
                                            </tr>
                                            <tr>
                                                <td>Margherita</td>
                                                <td class="text-center">01</td>
                                                <td class="text-right">$120.00</td>
                                            </tr>
                                            <tr>
                                                <td>Peppy Paneer</td>
                                                <td class="text-center">01</td>
                                                <td class="text-right">$150.00</td>
                                            </tr>
                                            <tr>
                                                <td>Deluxe Veggie</td>
                                                <td class="text-center">01</td>
                                                <td class="text-right">$180.00</td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <th class="text-center">03</th>
                                                <th class="text-right">$120.00</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="top6">
                                        <div class="float-right">
                                            <button class="edit-order-btn">Deliver</button>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="ticket-main delivered-tkt">
                                <div class="order-detail">
                                    <div>
                                        <div class="float-left">123456 [ 15:46 ]</div>
                                        <div class="float-right">Take Away</div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div>
                                        <div class="float-left">Pramod Karkera</div>
                                        <div class="float-right">9844217817</div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="delivered-status">Delivered</div>
                                </div>                                
                            </div>

                        </div>
                    </div>                    
                    <div class="clearfix"></div>
                </div>
            </div>
        </section>
        <div class="clearfix"></div>
<NewOrder :showform="true" v-if="isShowForm"/>
       
    </div>
</template>
<script>
//import MessageSuccess from "@/components/MessageSuccess.vue";
//import MessageError from "@/components/MessageError.vue";
import NewOrder from "@/components/NewOrder.vue";
export default {
    name:'Dashboard',
    components:{
       // MessageError,
        //MessageSuccess,
        NewOrder
    },
    data(){
        return{
      successmsg: "",
      errormsg: "",
      isShowForm: false,
        };
    },
    methods:{
        showForm() {
            console.log('showForm method called');
      this.isShowForm = true;
    }
   
    }

}
</script>