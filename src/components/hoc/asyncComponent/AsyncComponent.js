import React, {PureComponent} from 'react'
const asyncComponent = (importComponent, props) => {
    return class extends PureComponent{
        state = {
            component: null
        }
        async componentDidMount(){
            const cmp = await importComponent();
            this.setState({ component: cmp.default })
        }
        render(){
            const C = this.state.component
            return C ? <C {...props}></C> : <div>Lazy loading module...</div>;
        }
    }
}
export default asyncComponent