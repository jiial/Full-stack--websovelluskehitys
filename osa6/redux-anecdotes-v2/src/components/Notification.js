import React from 'react'
import { notificationChange } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class Notification extends React.Component {

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.props.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  notificationChange
}

const ConnectedNotification = connect(mapStateToProps, mapDispatchToProps)(Notification)

export default ConnectedNotification
