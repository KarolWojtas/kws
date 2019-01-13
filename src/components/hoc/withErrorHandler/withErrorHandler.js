import React, {Component} from 'react'
import Modal from '../../UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }

        componentWillMount(){
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({errors: null})
                return req
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
                return error
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }
        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render(){
            return (
                <>
                    <Modal show={this.state.error} clickedHandler={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </>
            )
        }
    }
}
export default withErrorHandler