<template>
  <div>
    <section>
      <div class="breadcrumb">
      <div>Item List</div>
        <div class="current-time">{{currentdate |formatTime}}</div>
         <div class="clearfix"></div>
      </div>
     
      <div class="list-sec">
        <div class="text-right">
          <button class="trans-btn" @click="showForm" id="addbutton">
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
            <tr
              v-for="(data, index) in Items"
              :key="data.ItemId"
              v-show="Items.length > 0"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">
                <img src="../assets/images/no_item_img.png" v-if="data.imageId==null" class="display-user-img" />
                <img v-bind:src="'data:image/jpeg;base64,'+ data.imageContent" v-if="data.imageId!=null" class="display-user-img"/>
              </td>
              <td class="text-center">{{ data.itemName }}</td>
              <td class="text-right">
                {{ data.itemCharge | toFixed | toUSD }}
              </td>
              <td class="text-center">
                <button class="trans-btn" @click="edititem(data)">
            <img src="../assets/images/edit.png" />
          </button>
                 
              </td>
              <td class="text-center">
                <button class="trans-btn" @click="deleteitem(data.itemId)">
                  <img src="../assets/images/delete.png" />
                </button>
              </td>
            </tr>
            <tr v-show="itemsnotfound">
             <td class="text-center" colspan="6">   <img src="../assets/images/norecordfound.png" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="clearfix"></div>

    <div class="add-overlay" v-if="isShowForm">
      <div class="add-pop-overlay">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            @click="hideForm"
          >
            ×
          </button>
          <h4 class="modal-title">Add Item</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="container-fluid">
              <div class="row">
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>Item Name <span class="asterisk">*</span></label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="Item.ItemName"
                    />
                  </div>
                </div>
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>Item Price <span class="asterisk">*</span></label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="Item.ItemCharge"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-4">
                  <div class="form-group">
                    <label>Item Image</label>
                   <img src="../assets/images/no_item_img.png" v-if="imagedata==''" class="uploaded-user-img">
                    <img :src="imagedata" v-if="imagedata!=''" class="uploaded-user-img"  />
                  </div>
                </div>
                <div class="col-xs-8">                 
                  <label class="user-img-upload-btn" >
                     <input type="file" name="file" multiple="" v-on:change="fileChange($event.target.files)"/>
                     Upload
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-default left-btn"
            data-dismiss="modal"
            @click="clearItem"
          >
            Cancel
          </button>
          <button 
            type="button" id="additembutton"
            class="btn btn-active"
            v-if="!editmode"
            data-dismiss="modal"
            @click="addItem"
          >
            Add
          </button>
          <button
            type="button" id="additemupdatebutton"
            class="btn btn-active"
            v-if="editmode"
            data-dismiss="modal"
            @click="updateItem"
          >
            Update
          </button>
        </div>
      </div>
    </div>

    <MessageSuccess :msg="successmsg" v-on:on-success="getItems" />
    <MessageError :msg="errormsg" v-on:on-error="onError" />
  </div>
</template>

<script src="../viewscripts/itemListScript.js" type="text/javascript"/>

