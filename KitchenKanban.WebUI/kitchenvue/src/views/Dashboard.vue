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
                                <button class="add-order">+</button>
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

         <div class="add-overlay" style="display:none;">
        <div class="add-pop-overlay">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">New Order</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="form-group">
                                <label>Customer Name <span class="asterisk">*</span></label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="form-group">
                                <label>Customer Phone <span class="asterisk">*</span></label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="form-group">
                                <label>Delivery Type <span class="asterisk">*</span></label>
                                <select class="form-control">
                                    <option>Select</option>
                                    <option>Dining</option>
                                    <option>Take Away</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="food-order-section">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="food-ordering-header">
                                Select Item
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <input class="form-control" list="itemList" name="itemList">
                            <datalist id="itemList">
                                <option value="Margherita"/>
                                <option value="Double Cheese Margherita"/>
                                <option value="Farm House"/>
                                <option value="Peppy Paneer"/>
                                <option value="Mexican Green Wave"/>
                                <option value="Deluxe Veggie"/>
                            </datalist>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <table class="ordered-items-tbl">
                                <tr>
                                    <th class="text-center">Sl No</th>
                                    <th class="text-center">Item Name</th>
                                    <th class="text-center">Qty</th>
                                    <th class="text-center">Delete</th>
                                    <th class="text-center">Price</th>
                                </tr>
                                <tr>
                                    <td class="text-center">01</td>
                                    <td>Margherita</td>
                                    <td class="text-center bold">
                                        <div class="qty-main">
                                            <div class="float-left neg-qty-box">
                                                <button class="qty-btn">-</button>
                                            </div>
                                            <div class="float-left qty-box">02</div>
                                            <div class="float-left pos-qty-box">
                                                <button class="qty-btn">+</button>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <button class="trans-btn"><img src="images/delete.png" /></button>
                                    </td>
                                    <td class="text-right bold">$120.00</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="text-center bold">Total</td>
                                    <td class="text-center bold">05</td>
                                    <td>&nbsp;</td>
                                    <td class="text-right bold">$1524.00</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default left-btn" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-active" data-dismiss="modal">Add</button>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    name:'Dashboard'
}
</script>