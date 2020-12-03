<template>
    <div>
<section>
         <div class="breadcrumb">User List</div>
            <div class="list-sec">
                <div class="text-right">
                    <button class="trans-btn" data-toggle="modal" data-target="#addUser">
                        <img src="../assets/../assets/images/add.png" />
                    </button>
                </div>
                <table class="custom-tbl">
                    <tbody>
                        <tr>
                            <th class="text-center">Sl No</th>
                            <th class="text-center">User Image</th>
                            <th class="text-center">User Name</th>
                            <th class="text-center">User Id</th>
                            <th class="text-center">User Type</th>
                            <th class="text-center">Edit</th>
                            <th class="text-center">Delete</th>
                        </tr>
                        <tr>
                            <td class="text-center">1</td>
                            <td class="text-center"><img src="../assets/images/user_img.png" /></td>
                            <td>Pramod Karkera</td>
                            <td>123456</td>
                            <td>Front Office</td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/edit.png" /></button>
                            </td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/delete.png" /></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">2</td>
                            <td class="text-center"><img src="../assets/images/user_img.png" /></td>
                            <td>Shibu Narayan</td>
                            <td>123456</td>
                            <td>chef</td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/edit.png" /></button>
                            </td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/delete.png" /></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">3</td>
                            <td class="text-center"><img src="../assets/images/user_img.png" /></td>
                            <td>Sujeesh Soman</td>
                            <td>123456</td>
                            <td>Delivery</td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/edit.png" /></button>
                            </td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/delete.png" /></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">4</td>
                            <td class="text-center"><img src="../assets/images/user_img.png" /></td>
                            <td>Jayanth Soman</td>
                            <td>123456</td>
                            <td>Back Office</td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/edit.png" /></button>
                            </td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/delete.png" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
             </section>
               <div class="clearfix"></div>


       <div id="addUser" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add User</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>First Name <span class="asterisk">*</span></label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>Last Name <span class="asterisk">*</span></label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>User Type <span class="asterisk">*</span></label>
                                        <select class="form-control">
                                            <option>Front Office</option>
                                            <option>Chef</option>
                                            <option>Delivery</option>
                                            <option>Back Office</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xs-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <label>User Image</label>
                                        <img src="images/no_user_img.png" />
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
                    <button type="button" class="btn btn-default left-btn" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-active" data-dismiss="modal">Add</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    
}
</script>