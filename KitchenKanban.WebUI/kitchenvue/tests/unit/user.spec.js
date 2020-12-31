
import { shallowMount ,delay,mount} from '@vue/test-utils';
import User from '@/views/User.vue';
import axios  from 'axios';
import Vue from 'vue';
import flushPromises from 'flush-promises';
import userService from "@/services/userService.js";
import * as Rx from 'rxjs';


describe('User', () => {
  

it('calls testMethod on mount', () => {
  const getUsers = jest.fn()
  const wrapper = shallowMount(User, {
    methods: {
      getUsers
    }
  })
  expect(getUsers).toBeCalled()
});
 it('should show add user popup on add click', (async () => {
     
     const showAddUser = jest.fn();    
   const wrapper = shallowMount(User, {
      methods: {
      showAddUser
     
    }
      }  
   );
   await wrapper.find('#adduserbutton').trigger('click');   
    expect(showAddUser).toHaveBeenCalledTimes(1);    
    await wrapper.vm.showAddUser(); 
     await Vue.nextTick(()=>{
        expect(wrapper.vm.isAddUser).toBe(true);
     }); 
   
  }));

  
    it('should not call adduser() if mandatory fields are not entered', (async() => {
       const addUser = jest.fn()
   const wrapper = mount(User, {
      methods: {
      addUser
    }
      }  
   );
   
    await wrapper.setData({ user: {
        userId: "",
        firstName: "",
        lastName: "",
        userName: "",
        userType: "",
        password: "",
      }});
   
    await wrapper.setData({ isAddUser: true });
    expect(wrapper.vm.isAddUser).toBe(true);
     await wrapper.find('#adduserformbutton').trigger('click');      
     await  expect(addUser).toHaveBeenCalledTimes(1); 
         await wrapper.vm.addUser(()=>{
      expect(wrapper.vm.errormsg).toBe("Please enter first name");
         });  
  }));


   it('should call userService.addUser() if mandatory fields are  entered', (async() => {
    
       const addUser = jest.fn()
       const user= {
        userId: "",
        firstName: "",
        lastName: "",
        userName: "",
        userType: "",
        password: "",
      }
   const wrapper = mount(User, {
      methods: {
      addUser
           }
      } );
  
    await wrapper.setData({ isAddUser: true });
    expect(wrapper.vm.isAddUser).toBe(true);  
       await wrapper.find('#adduserformbutton').trigger('click');    
     await  expect(addUser).toHaveBeenCalledTimes(1); 
      await wrapper.setData({ user:{
        userId: "",
        firstName: "sony",
        lastName: "krishna",
        userName: "sony",
        userType: "admin",
        password: "sony",
      } });  
     await  wrapper.vm.addUser(); 
  /* let spy_getItems = spyOn(ItemListService,"post").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });*/
    
      await Vue.nextTick(()=>{
        expect(spyOn(userService,"post")).toHaveBeenCalledWith( {data:wrapper.vm.user})    
        });
    
  }));


});
