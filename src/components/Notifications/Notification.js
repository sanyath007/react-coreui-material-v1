import React from 'react';

class Notification extends React.Component {
  componentDidMount() {
    console.log('Notification did mounted');
    
    if(this.props.toggle) {
      setTimeout(() => {
        this.props.toggle();
      }, 5000);
    }
  }

  render() {
    const { message, type } = this.props;

    let alertWrapperClass = 'alert-dismissible fade show';
    let alertIconClass = '';

    if(type === 'success') {
      alertWrapperClass += ' alert alert-success';
      alertIconClass = 'icon-check';
    } else if(type === 'danger') {
      alertWrapperClass += ' alert alert-danger';
      alertIconClass = 'icon-close';
    }

    return (
      <div className={alertWrapperClass} role="alert">
        <button type="button" className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
        <i className={alertIconClass}></i> { message }        
      </div>
    );
  }
}

export default Notification;
