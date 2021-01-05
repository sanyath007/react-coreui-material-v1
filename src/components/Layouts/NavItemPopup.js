import React from 'react';

function NavItemPopup(props) {
  const wrapperAttrs = props.isOpen 
    ? {
        'x-placement': "bottom-end",
        style: {
          position: 'absolute',
          willChange: 'transform',
          top: '0px',
          left: '0px',
          transform: 'translate3d(-200px, 21px, 0px)'
        },
        'data-placement': "bottom-end"
      }
    : null;

  return (
    <div tabIndex="-1" role="menu" aria-hidden={!props.isOpen}
      className={`dropdown-menu-lg dropdown-menu dropdown-menu-right ${props.isOpen ? 'show' : ''}`}
      {...wrapperAttrs}>

      <div tabIndex="-1" className="text-center dropdown-header">
        <strong>{ props.title }</strong>
      </div>
    
      <a href="#" tabIndex="0" className="dropdown-item">
        <div className="message">
          <div className="pt-3 mr-3 float-left">
            <div className="avatar">
              <img src="assets/img/avatars/7.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
              <span className="avatar-status badge-success"></span>
            </div>
          </div>
          <div>
            <small className="text-muted">John Doe</small>
            <small className="text-muted float-right mt-1">Just now</small>
          </div>
          <div className="text-truncate font-weight-bold">
            <span className="fa fa-exclamation text-danger"></span> Important message
          </div>
          <div className="small text-muted text-truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
          </div>
        </div>
      </a>
      <a href="#" tabIndex="0" className="text-center dropdown-item">
        <strong>View all messages</strong>
      </a>
    </div>
  );
}

export default NavItemPopup;
