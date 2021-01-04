
import { shallowMount ,delay,mount} from '@vue/test-utils';
import KitchenCounterList from '@/views/KitchenCounterList.vue';
import axios  from 'axios';
import Vue from 'vue';
import flushPromises from 'flush-promises';
import KitchenCounterService from '@/services/KitchenCounterService.js';
import * as Rx from 'rxjs';


describe('KitchenCounterList', () => {
  

it('calls getall counters on mount', () => {
  const getKitchenCounters = jest.fn()
  const wrapper = shallowMount(KitchenCounterList, {
    methods: {
      getKitchenCounters
    }
  })
  expect(getKitchenCounters).toBeCalled()
});

   it('should show add counter popup on add click', (async () => {
     
     const showForm = jest.fn();    
   const wrapper = shallowMount(KitchenCounterList, {
      methods: {
      showForm
     
    }
      }  
   );
   await wrapper.find('#addcounterbutton').trigger('click');   
    expect(showForm).toHaveBeenCalledTimes(1);    
    await wrapper.vm.showForm(); 
     await Vue.nextTick(()=>{
        expect(wrapper.vm.isShowForm).toBe(true);
     }); 
   
  }));


    it('should not call addcounter() if mandatory fields are not entered', (async() => {
       const addKCounter = jest.fn()
   const wrapper = mount(KitchenCounterList, {
      methods: {
      addKCounter
    }
      }  
   );
   
    await wrapper.setData({  Kitchen:{
     CounterNumber:" "
    } });
   
    await wrapper.setData({ isShowForm: true });
    expect(wrapper.vm.isShowForm).toBe(true);
     await wrapper.find('#addmodalcounterbutton').trigger('click');      
     await  expect(addKCounter).toHaveBeenCalledTimes(1); 
         await wrapper.vm.addKCounter(()=>{
      expect(wrapper.vm.errormsg).toBe("Please enter Counter Name");
         });    
     

  }));
  it('should call itemService.addItem() if mandatory fields are  entered', (async() => {
    
       const addKCounter = jest.fn()
       const  Kitchen={
     CounterNumber:" "
    }
   const wrapper = mount(KitchenCounterList, {
      methods: {
      addKCounter
           }
      } );
  
    await wrapper.setData({ isShowForm: true });
    expect(wrapper.vm.isShowForm).toBe(true);  
       await wrapper.find('#addmodalcounterbutton').trigger('click');    
     await  expect(addKCounter).toHaveBeenCalledTimes(1); 
      await wrapper.setData({   Kitchen:{
     CounterNumber:"counter 1 "
    } });  
     await  wrapper.vm.addKCounter(); 
  /* let spy_getItems = spyOn(ItemListService,"post").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });*/
    
      await Vue.nextTick(()=>{
        expect(spyOn(KitchenCounterService,"post")).toHaveBeenCalledWith( {Kitchen:wrapper.vm.Kitchen})    
        });
    
  }));

  it('should call kitchenCounterService.updateCounter() if mandatory fields are  entered', (async() => {
    
       const updateKCounter = jest.fn()
       const  Kitchen={
     CounterNumber:" ",
       KitchenId:"",
    }
   const wrapper = mount(KitchenCounterList, {
      methods: {
      updateKCounter
           }
      } );
  
    await wrapper.setData({ isShowForm: true });
      await wrapper.setData({ editmode: true });
    expect(wrapper.vm.isShowForm).toBe(true);  
       await wrapper.find('#updatemodalcounterbutton').trigger('click');    
     await  expect(updateKCounter).toHaveBeenCalledTimes(1); 
      await wrapper.setData({   Kitchen:{
     CounterNumber:"counter 1 ",
      KitchenId:"04869ef4-4924-11eb-b378-0242ac130002",
    } });  
     await  wrapper.vm.updateKCounter(); 
  /* let spy_getItems = spyOn(ItemListService,"post").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });*/
    
      await Vue.nextTick(()=>{
        expect(spyOn(KitchenCounterService,"put")).toHaveBeenCalledWith( {Kitchen:wrapper.vm.Kitchen})    
        });
    
  }));

});
