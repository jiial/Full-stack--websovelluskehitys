class Wrapper extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        formInput: ''
      }
    }
    onChange = (e) => {
      this.setState({ formInput: e.target.value })
    }
    render() {
      return (
        <App
        />
    )}
  }
  