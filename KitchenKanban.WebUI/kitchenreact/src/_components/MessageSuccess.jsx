import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { itemsListActions,orderActions } from '../_actions';
import { Header } from '../_components/Header';
class MessageSuccess extends React.Component {
     constructor(props) {
        super(props); 
      
        this.state={
                 showmessage:false  
            
           
        };  
        
     
    
    }
  componentDidMount () 
    {  
         this.setState({
          showmessage:this.props.showsuccessform
      })
      
 
       
    }
    componentDidUpdate(nextprops,prevprops){         
        setTimeout(() =>this.props.handler(false) , 
            1000);
          
         
    }
    
    render() {
              const {showsuccessform} = this.props;
        const {showmessage}=this.state;      

        return (
        <div>
    {showmessage  &&
          <div className="overlay">
    <div className="success-overlay">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
    </div>
  </div>
    }
          </div>
        );
    }
}

function mapStateToProps(state) {
    const {  } = state;
    return {
         
    };
}

const connectedMessageSuccess = connect(mapStateToProps)(MessageSuccess);
export { connectedMessageSuccess as MessageSuccess };