import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { itemsListActions,orderActions } from '../_actions';
import { Header } from '../_components/Header';
class MessageError extends React.Component {
     constructor(props) {
        super(props); 
      
        this.state={
                 showmessage:false  
        };  
        
     
    
    }
  componentDidMount () 
    {  
         this.setState({
          showmessage:this.props.showerrorform
      })
      
 
       
    }
    componentDidUpdate(nextprops,prevprops){         
        setTimeout(() =>this.props.handler(false) , 
            2000);
    }
    
    render() {
              const {showErrorform,msg} = this.props;
        const {showmessage}=this.state;      

        return (
        <div>
    {showmessage  &&
        <div className="overlay">
        <div className="pop-overlay">
                    <div className="error-header">
                        <img src="images/error.png" />
                    </div>
                    <div className="text-center pop-header">Error!</div>
                    <div className="text-center">{msg}</div>
                
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

const connectedMessageError = connect(mapStateToProps)(MessageError);
export { connectedMessageError as MessageError };