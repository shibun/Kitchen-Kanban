<template>
    <div>
        <section>
            <div class="breadcrumb">Item List</div>
            <div class="list-sec">
                <div class="text-right">
                    <button class="trans-btn" data-toggle="modal" data-target="#addItem">
                        <img src="../assets/images/add.png" />
                    </button>
                </div>
                <table class="custom-tbl">
                    <tbody>
                        <tr>
                            <th class="text-center">Sl No</th>
                            <th class="text-center">Item Image</th>
                            <th class="text-center">Item Name</th>
                            <th class="text-center">Price</th>
                            <th class="text-center">Edit</th>
                            <th class="text-center">Delete</th>
                        </tr>
                        <tr v-for="(data,index) in Items" :key="data.ItemId" v-show="Items.length>0">
                            <td class="text-center">{{index+1}}</td>
                            <td class="text-center"><img src="../assets/images/pizza.png" /></td>
                            <td>{{data.itemName}}</td>
                            <td class="text-right">{{data.itemCharge |toFixed |toUSD}}</td>
                            <td class="text-center">
                                <button class="trans-btn" @click="edititem(data)" data-toggle="modal" data-target="#addItem"><img src="../assets/images/edit.png" /></button>
                            </td>
                            <td class="text-center">
                                <button class="trans-btn" @click="deleteItem(data.itemId)"><img src="../assets/images/delete.png" /></button>
                            </td>
                        </tr>
                        <tr v-show="itemsnotfound">
                            No records found
                        </tr>



                    </tbody>
                </table>
            </div>
        </section>
        <div class="clearfix"></div>
        <div id="addItem" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Item</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <div class="form-group">
                                            <label>Item Name <span class="asterisk">*</span></label>
                                            <input type="text" class="form-control" v-model="Item.ItemName">
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="form-group">
                                            <label>Item Price <span class="asterisk">*</span></label>
                                            <input type="number" class="form-control" v-model="Item.ItemCharge">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-4">
                                        <div class="form-group">
                                            <label>Item Image</label>
                                            <img src="images/no_item_img.png" />
                                        </div>
                                    </div>
                                    <div class="col-xs-8">
                                        <button class="user-img-upload-btn">Upload</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default left-btn" data-dismiss="modal" @click="clearItem">Cancel</button>
                        <button type="button" class="btn btn-active" v-if="!editmode" data-dismiss="modal" @click="addItem">Add</button>
                        <button type="button" class="btn btn-active" v-if="editmode" data-dismiss="modal" @click="updateItem">Update</button>
                    </div>
                </div>
            </div>
        </div>
        <MessageSuccess :msg="successmsg" v-on:on-success="getItems" />
        <MessageError :msg="errormsg" v-on:on-error="onError" />
    </div>
</template>

<script>
    import ItemListService from '../services/ItemListService'
    import MessageSuccess from '@/components/MessageSuccess.vue'
    import MessageError from '@/components/MessageError.vue'
    export default {
        name: 'ItemList',
        created() {
            this.getItems()
        },
        components: {
            MessageSuccess,
            MessageError

        },
        data() {
            return {
                Item:
                {
                    ItemName: "",
                    ItemCharge: 0,
                },


                Items: [],
                itemsnotfound: false,
                successmsg: "",
                errormsg: "",
                editmode: false
            }
        },
        filters: {

            toUSD(price) {
                return `$${price}`;
            },
            toFixed(value) {
                return value.toFixed(2);
            }
        },

        methods: {
            getItems() {
                this.successmsg = false,
                    ItemListService.get().then(response => {
                        if (response.data.length > 0)
                         {
                            this.Items = response.data,
                                this.itemsnotfound = false
                        }
                        else {
                            this.itemsnotfound = true
                        }

                    } )
                 },
            addItem: function () {
                //console.log('item is in add', this.Item),
                if (!this.Item.ItemName) {
                    this.errormsg = "Please enter Item Name"
                    return
                }
                if (!this.Item.ItemCharge) {
                    this.errormsg = "Please enter Item Charge"
                    return
                }
                ItemListService.post(this.Item).then(response => {
                    console.log('response', response.data),
                        this.successmsg = "Item added",
                        this.clearItem()
                     } )
                    .catch(err => {
                        this.errormsg = "error occured",
                            console.log(err.message)
                    })
            },
            edititem: function (data) {
                this.editmode = true,
                    console.log('datais', data),
                    this.Item.ItemName = data.itemName,
                    this.Item.ItemCharge = data.itemCharge
            },
            updateItem: function () {
                 if (!this.Item.ItemName) {
                    this.errormsg = "Please enter Item Name"
                    return
                }
                if (!this.Item.ItemCharge) {
                    this.errormsg = "Please enter Item Charge"
                    return
                }
                console.log('item is in add', this.Item),
                    ItemListService.patch(this.Item).then(response => {
                        console.log('response', response.data),
                            this.successmsg = "Item updated"
                             this.editmode = false,
                            this.clearItem()

                    })
                        .catch(err => {
                            this.errormsg = "error occured",
                             console.log(err.message)
                        })
            },
            deleteItem: function (itemid) {
                ItemListService.delete(itemid).then(response => {
                    console.log('response', response.data),
                        this.successmsg = "Item deleted"
                })
                    .catch(err => {
                        this.errormsg = "error occured",
                        console.log(err.message)
                    })
            },
            onError() {
                console.log("onError parent");
                this.errormsg = '';
                this.iserror = false
            },
            clearItem: function () {
                this.Item = {
                    ItemCharge: 0,
                    ItemName: ""
                }
            }
        }
    }

</script>