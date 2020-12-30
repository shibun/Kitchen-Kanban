
import { shallowMount ,delay,mount} from '@vue/test-utils';
import ItemsList from '@/views/ItemsList.vue';
import ItemList from '@/viewscripts/itemListScript.js';
import axios  from 'axios';
import flushPromises from 'flush-promises';
import ItemListService from '@/services/ItemListService.js';

describe('ItemsList', () => {
  

it('calls testMethod on mount', () => {
  const getItems = jest.fn()
  const wrapper = shallowMount(ItemsList, {
    methods: {
      getItems
    }
  })
  expect(getItems).toBeCalled()
});

   it('should show add item popup on add click', (async (done) => {
     
     const showForm = jest.fn();
     const getNow=jest.fn();
   const wrapper = shallowMount(ItemsList, {
      methods: {
      showForm,
      getNow
    }
      }  
   );
   await wrapper.find('#addbutton').trigger('click');   
    expect(showForm).toHaveBeenCalledTimes(1);
    const data=await wrapper.vm.getNow();
    const data1=await wrapper.vm.showForm();  
    done();
    
    console.log('data getnow',data) ;
    console.log('data showform',data1) ; 
    expect(wrapper.vm.isShowForm).toBe(true);   
    
  }));


    it('should not call addItem() if mandatory fields are not entered', (async() => {
       const addItem = jest.fn()
   const wrapper = mount(ItemsList, {
      methods: {
      addItem
    }
      }  
   );
   
    await wrapper.setData({ Item:{
      ItemName: "",ItemCharge: 123 
    } });
   
    await wrapper.setData({ isShowForm: true });
    expect(wrapper.vm.isShowForm).toBe(true);
     await wrapper.find('#additembutton').trigger('click'); 
     
     await  expect(addItem).toHaveBeenCalledTimes(1);    
     //console.log('itemchrge',wrapper.vm.errormsg) ;  
    expect(wrapper.vm.errormsg).toBe("Please enter Item Name");
   
  }));
  it('should call itemService.addItem() if mandatory fields are  entered', (async() => {
    
       const addItem = jest.fn()
       const Item={
         ItemName:"",
         ItemCharge:""
       }
   const wrapper = mount(ItemsList, {
      methods: {
      addItem
    }
      }  
   );
   
    await wrapper.setData({ Item:{
      ItemName: "panner",ItemCharge: 123 
    } });
   
    await wrapper.setData({ isShowForm: true });
    expect(wrapper.vm.isShowForm).toBe(true);
     await wrapper.find('#additembutton').trigger('click'); 
     
     await  expect(addItem).toHaveBeenCalledTimes(1);    
    await expect(spyOn(ItemListService,"post")).toHaveBeenCalledWith( {Item:Item})
   
  }));

});
