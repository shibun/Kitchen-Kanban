import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { itemsListActions } from '../_actions';
import { Header } from '../_components/Header';


class ItemsList extends React.Component {
    constructor(props) {
        super(props); 
        this.state={
            showform:false,
            item:{
                itemId:'',
                itemName: '',
                itemCharge: 0.0,
                imageId:""
            },
             imgSrc:'',
             file:'',
             editmode:false
        };
        
        this.handleOnAddClick=this.handleOnAddClick.bind(this);  
        this.handleChange = this.handleChange.bind(this);
        this.clearForm=this.clearForm.bind(this);  
        this.addItem=this.addItem.bind(this);
         this.catchFile = this.catchFile.bind(this);
        this.deleteItem=this.deleteItem.bind(this); 
        this.handleOnEdit=this.handleOnEdit.bind(this);  
        this.updateItem=this.updateItem.bind(this); 

   
    }
     componentDidMount() {
        this.props.dispatch(itemsListActions.getAll());
    }
    handleOnAddClick(){
        this.setState({
            showform:true,      
        });
        
    }
    addItem(){
         const { item } = this.state;
         this.setState({
            item: {
                ...item,
               itemCharge:parseFloat(this.state.item.itemCharge)
            }
        },()=>{
    this.props.dispatch(itemsListActions.addItem(this.state.item));
        });    
          
    }
        updateItem(){
              const { item } = this.state;
         this.setState({
            item: {
                ...item,
               itemCharge:parseFloat(this.state.item.itemCharge)
            }
        },()=>{
         this.props.dispatch(itemsListActions.updateItem(this.state.item));
        });          
        }
    clearForm(){
        this.setState({
             showform:false,
            item:{
                itemId:'',
                itemName: "",
                itemCharge: 0,
                imageId:"",
                imageContent:''
            },
             imgSrc:'',
             editmode:false
        })
    }
     handleChange(e) {
        const { name, value } = e.target;      
         const { item } = this.state;
         this.setState({
            item: {
                ...item,
                [name]: value
            }
        });
           
    }
     catchFile(e) {

        var file = e.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
         const formData = new FormData();
         formData.append("file", file);
        reader.onloadend = function (e) {
            this.setState({
            imgSrc: [reader.result]
           
            })
        }.bind(this);
         this.setState({
            file: formData
        });

      
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        console.log('nextprops',nextProps);        
         if (nextProps.createditem.itemId !== this.props.createditem.itemId) {
           console.log("selected file if: " + this.state.file);
            if (this.state.file) {
                console.log("selected file : " + this.state.file);
                this.props.dispatch(itemsListActions.uploadImage(this.state.file, nextProps.createditem.itemId, 2));
                this.clearForm();
                this.props.dispatch(itemsListActions.getAll());
                
            }
            else
            {
                this.clearForm();
                this.props.dispatch(itemsListActions.getAll());

            }
         }
               if (this.state.editmode) {                 
                    if (this.state.file) {                       
                        if (this.state.item.imageId!=null) {                             
                        this.props.dispatch(itemsListActions.updateImage(this.state.file,this.state.item.imageId));
                        this.clearForm();
                        this.props.dispatch(itemsListActions.getAll());
                        } else {                             
                            this.props.dispatch(itemsListActions.uploadImage(this.state.file, this.state.item.itemId, 2,));
                           this.clearForm(); 
                          this.props.dispatch(itemsListActions.getAll());
                        }                    
                    }
           
                 };
        
    }
    deleteItem(itemid) {
       
      this.props.dispatch(itemsListActions.deleteItem(itemid));
       this.props.dispatch(itemsListActions.getAll());
       
    }
    handleOnEdit(editeditem){
        this.setState({
            showform:true,
            item:editeditem,
            editmode:true
        })
        this.setState({
            imgSrc:'data:image/jpeg;base64,'+editeditem.imageContent
            
        })
     
      
    }
   

    render() {
        const { items,createditem} = this.props;
        let {item,showform,file,imgSrc,editmode}=this.state;
        console.log('props items',this.props);
      
        return (
      <div>   
            <div>
                    <Header />
                    <section>
                        <div className="breadcrumb">Item List</div>
                        <div className="list-sec">
                            <div className="text-right">
                                <button className="trans-btn">
                                    <img src="images/add.png" onClick={this.handleOnAddClick}/>
                                </button>
                            </div>
                            <table className="custom-tbl">
                                <tbody>
                                    <tr>
                                        <th className="text-center">Sl No</th>
                                        <th className="text-center">Item Image</th>
                                        <th className="text-center">Item Name</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">Edit</th>
                                        <th className="text-center">Delete</th>
                                    </tr>
                                    {items.items && items.items.map((itemvalue, index) =>                                         
                                                    
                                                    <tr key={itemvalue.itemId}>
                                                        <td className="text-center">{index+1}</td>     
                                                        <td className="text-center">
                                                        {
                                                            itemvalue.imageId!=null &&
                                                            <img  src={'data:image/jpeg;base64,'+ itemvalue.imageContent} className="display-user-img"/>

                                                        }
                                                        {
                                                            itemvalue.imageId==null &&   <img src="images/no_item_img.png"  className="display-user-img" />

                                                        }                                                      
                                                         
                                                        </td>                                                                                              
                                                        <td >{itemvalue.itemName}</td>
                                                        <td className="text-right">{itemvalue.itemCharge}</td>
                                                    
                                                <td className="text-center">
                                              <button className="trans-btn">
                                                 <img src="images/edit.png" onClick={e=>this.handleOnEdit(itemvalue)}/>
                                                 </button>
                                               </td>
                                                    <td className="text-center"><a onClick={e =>
                                                        window.confirm("Are you sure you wish to delete this item?") &&
                                                        this.deleteItem(itemvalue.itemId)
                                                    }><img src="images/delete.png" /></a></td>
                                                    </tr>
                    
                                                        )}
                                        
                                    
                                    
                                    <tr>
                                        <td className="text-center">3</td>
                                        <td className="text-center"><img src="images/pizza.png" /></td>
                                        <td>Deluxe Veggie</td>
                                        <td className="text-right">$180.00</td>
                                        <td className="text-center">
                                            <button className="trans-btn"><img src="images/edit.png" /></button>
                                        </td>
                                        <td className="text-center">
                                            <button className="trans-btn"><img src="images/delete.png" /></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <div className="clearfix"></div>
            </div>            
              
         {
             this.state.showform &&
          <div className="add-overlay" >
                <div className="add-pop-overlay">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal"  onClick={this.clearForm}>×</button>
                        <h4 className="modal-title">Add Item</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <div className="form-group">
                                            <label>Item Name <span className="asterisk">*</span></label>
                                            <input type="text" className="form-control" name="itemName" value={item.itemName || ""} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <div className="form-group">
                                            <label>Item Price <span className="asterisk">*</span></label>
                                            <input type="number" className="form-control" name="itemCharge" value={item.itemCharge || ""} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-4">
                                        <div className="form-group">
                                            <label>Item Image</label>                                            
                                             <img className="uploaded-user-img" src={this.state.imgSrc} onError={(e) => { e.target.onerror = null; e.target.src = "images/no_item_img.png" }}/>
                                            
                                        </div>
                                    </div>
                                    <div className="col-xs-8">
                                          <label className="user-img-upload-btn" >
                                        <input type="file" name="file" multiple="" onChange={this.catchFile}/>
                                        Upload
                                    </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default left-btn" data-dismiss="modal" onClick={this.clearForm}>Cancel</button>
                        
                        {
                            !this.state.editmode &&
                            <button type="button" className="btn btn-active" data-dismiss="modal" onClick={this.addItem}>Add</button>

                        }
                        {this.state.editmode &&
                             <button type="button" className="btn btn-active" data-dismiss="modal" onClick={this.updateItem}>Update</button>
                        }
                    </div>
                </div>
            </div> 
            }
    
    
    </div>


        );
    }
}

function mapStateToProps(state) {
    const {items,createditem } = state;
    return {items,createditem};
}


const connectedItemsList = connect(mapStateToProps)(ItemsList);
export { connectedItemsList as ItemsList }; 