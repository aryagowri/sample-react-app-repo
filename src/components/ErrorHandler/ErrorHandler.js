import React, { Component } from 'react';
import Modal from '../UI/Modal/Modal';


const ErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        constructor(props){
            super(props);
            this.state = {
                error: null
            }
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error =>
                {
                    this.setState({error: error});
                })

        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
            
        }
        errorConfirmed = () => {
            this.setState({error: null})  
        }
        render() {    
            return (
                <>
                <Modal show={this.state.error} backdropHandler={this.errorConfirmed} >
                    {this.state.error? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </>
            );
        }
    }
}
export default ErrorHandler;
