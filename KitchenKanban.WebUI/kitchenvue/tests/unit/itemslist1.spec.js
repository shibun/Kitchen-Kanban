
import { shallowMount ,delay,mount} from '@vue/test-utils';
import ItemsList from '@/views/ItemsList.vue';
import ItemList from '@/viewscripts/itemListScript.js';
import axios  from 'axios';
import Vue from 'vue';
import flushPromises from 'flush-promises';
import ItemListService from '@/services/ItemListService.js';
import * as Rx from 'rxjs';


describe('ItemsList', () => {
  

it('calls getall items on mount', () => {
  const getItems = jest.fn()
  const wrapper = shallowMount(ItemsList, {
    methods: {
      getItems
    }
  })
  expect(getItems).toBeCalled()
});

   it('should show add item popup on add click', (async () => {
     
     const showForm = jest.fn();    
   const wrapper = shallowMount(ItemsList, {
      methods: {
      showForm
     
    }
      }  
   );
   await wrapper.find('#addbutton').trigger('click');   
    expect(showForm).toHaveBeenCalledTimes(1);    
    await wrapper.vm.showForm(); 
     await Vue.nextTick(()=>{
        expect(wrapper.vm.isShowForm).toBe(true);
     }); 
   
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
         await wrapper.vm.addItem(()=>{
      expect(wrapper.vm.errormsg).toBe("Please enter Item Name");
         });  
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
      } );
  
    await wrapper.setData({ isShowForm: true });
    expect(wrapper.vm.isShowForm).toBe(true);  
       await wrapper.find('#additembutton').trigger('click');    
     await  expect(addItem).toHaveBeenCalledTimes(1); 
      await wrapper.setData({ Item:{
      ItemName: "panner",ItemCharge: 123 
    } });  
     await  wrapper.vm.addItem(); 
  /* let spy_getItems = spyOn(ItemListService,"post").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });*/
    
      await Vue.nextTick(()=>{
        expect(spyOn(ItemListService,"post")).toHaveBeenCalledWith( {Item:wrapper.vm.Item})    
        });
    
  }));

   it('should call itemService.updateItem() if mandatory fields are  entered', (async() => {
    
       const updateItem = jest.fn()
       const Item={
         ItemName:"",
         ItemCharge:"",
         ItemId:""
       }
      const wrapper = mount(ItemsList, {
      methods: {
      updateItem
           }
      } );
  
     await wrapper.setData({ isShowForm: true });
      await wrapper.setData({ editmode: true });
     expect(wrapper.vm.isShowForm).toBe(true);  
       await wrapper.find('#additemupdatebutton').trigger('click');    
     await  expect(updateItem).toHaveBeenCalledTimes(1); 
      await wrapper.setData({ Item:{
      ItemName: "panner",ItemCharge: 123 ,
      ItemId:"04869ef4-4924-11eb-b378-0242ac130002"
    } });  
     await  wrapper.vm.updateItem(); 
  /* let spy_getItems = spyOn(ItemListService,"post").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });*/
    
      await Vue.nextTick(()=>{
        expect(spyOn(ItemListService,"put")).toHaveBeenCalledWith( {Item:wrapper.vm.Item})    
        });
    
  }));

});
