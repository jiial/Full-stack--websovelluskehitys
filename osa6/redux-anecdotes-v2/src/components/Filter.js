import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {

    handleChange = (event) => {
      this.props.filterChange(event.target.value)
      console.log(event.target.value)
    }
    render() {
      const style = {
        marginBottom: 10
      }

      return (
        <div style={style}>
                filter <input onChange={this.handleChange} />
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  filterChange
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter