import React from 'react';

function NavItem(props) {
  return (
    <ul class="ml-auto navbar-nav">
      <li class="d-md-down-none dropdown show nav-item">

        {/* ================== Notifications isOpen ================== */}
        <a aria-haspopup="true" href="#" class="nav-link" aria-expanded="true">
          <i class="icon-bell"></i>
          <span class="badge badge-danger badge-pill">5</span>
        </a>

        <div tabindex="-1" role="menu" aria-hidden="false" class="dropdown-menu dropdown-menu-right show"
          x-placement="bottom-end"
          style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-140px, 21px, 0px);"
          data-placement="bottom-end">
          <div tabindex="-1" class="text-center dropdown-header">
            <strong>You have 5 notifications</strong>
          </div>
          <button type="button" tabindex="0" class="dropdown-item">
            <i class="icon-user-follow text-success"></i> New user registered
          </button>
          <button type="button" tabindex="0" class="dropdown-item">
            <i class="icon-user-unfollow text-danger"></i> User deleted
          </button>
          <button type="button" tabindex="0" class="dropdown-item">
            <i class="icon-chart text-info"></i> Sales report is ready
          </button>
          <button type="button" tabindex="0" class="dropdown-item">
            <i class="icon-basket-loaded text-primary"></i> New client
          </button>
          <button type="button" tabindex="0" class="dropdown-item">
            <i class="icon-speedometer text-warning"></i> Server overloaded
          </button>
          <div tabindex="-1" class="text-center dropdown-header">
            <strong>Server</strong>
          </div>
          <button type="button" tabindex="0" class="dropdown-item">
            <div class="text-uppercase mb-1">
              <small><b>CPU Usage</b></small>
            </div>
            <div class="progress-xs progress">
              <div 
                class="progress-bar bg-info"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 25%;"></div>
            </div>
            <small class="text-muted">348 Processes. 1/4 Cores.</small>
          </button>
          <button type="button" tabindex="0" class="dropdown-item">
            <div class="text-uppercase mb-1">
              <small><b>Memory Usage</b></small>
            </div>
            <div class="progress-xs progress">
              <div
                class="progress-bar bg-warning"
                role="progressbar"
                aria-valuenow="70"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 70%;"></div>
            </div>
            <small class="text-muted">11444GB/16384MB</small>
          </button>
          <button type="button" tabindex="0" class="dropdown-item">
            <div class="text-uppercase mb-1">
              <small><b>SSD 1 Usage</b></small>
            </div>
            <div class="progress-xs progress">
              <div
                class="progress-bar bg-danger"
                role="progressbar"
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 90%;"></div>
            </div>
            <small class="text-muted">243GB/256GB</small>
          </button>
        </div>
        {/* ================== Notifications isOpen ================== */}

      </li>
      <li class="d-md-down-none dropdown nav-item">

        {/* ================== tasks ================== */}
        <a aria-haspopup="true" href="#" class="nav-link" aria-expanded="false">
          <i class="icon-list"></i>
          <span class="badge badge-warning badge-pill">15</span>
        </a>

        <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu-lg dropdown-menu dropdown-menu-right">
          <div tabindex="-1" class="text-center dropdown-header">
            <strong>You have 15 pending tasks</strong>
          </div>
          <button type="button" tabindex="0" class="dropdown-item">
            <div class="small mb-1">
              Upgrade NPM &amp; Bower 
              <span class="float-right"><strong>0%</strong></span>
            </div>
            <div class="progress-xs progress">
              <div class="progress-bar bg-info" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
            </div>
          </button>
          <button type="button" tabindex="0" class="dropdown-item">
            <div class="small mb-1">
              ReactJS Version 
              <span class="float-right"><strong>25%</strong></span>
            </div>
            <div class="progress-xs progress">
              <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;"></div>
            </div>
          </button>
          <button type="button" tabindex="0" class="dropdown-item">
            <div class="small mb-1">
              VueJS Version 
              <span class="float-right"><strong>50%</strong></span>
            </div>
            <div class="progress-xs progress">
              <div
                class="progress-bar bg-warning"
                role="progressbar"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 50%;"></div>
            </div>
          </button>
          <button type="button" tabindex="0" class="dropdown-item">
            <div class="small mb-1">
              Add new layouts <span class="float-right"><strong>75%</strong></span>
            </div>
            <div class="progress-xs progress">
              <div
                class="progress-bar bg-info"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 75%;"></div>
            </div>
          </button>
          <button type="button" tabindex="0" class="dropdown-item">
            <div class="small mb-1">
              Angular 2 Cli Version <span class="float-right"><strong>100%</strong></span>
            </div>
            <div class="progress-xs progress">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 100%;"></div>
            </div>
          </button>
          <button type="button" tabindex="0" class="text-center dropdown-item">
            <strong>View all tasks</strong>
          </button>
        </div>
        {/* ================== tasks ================== */}

      </li>
      <li class="d-md-down-none dropdown nav-item">

        {/* ================== messages ================== */}
        <a aria-haspopup="true" href="#" class="nav-link" aria-expanded="false">
          <i class="icon-envelope-letter"></i>
          <span class="badge badge-info badge-pill">7</span>
        </a>

        <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu-lg dropdown-menu dropdown-menu-right">
          <div tabindex="-1" class="dropdown-header">
            <strong>You have 7 messages</strong>
          </div>
          <a href="#" tabindex="0" class="dropdown-item">
            <div class="message">
              <div class="pt-3 mr-3 float-left">
                <div class="avatar">
                  <img src="assets/img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span class="avatar-status badge-success"></span>
                </div>
              </div>
              <div>
                <small class="text-muted">John Doe</small>
                <small class="text-muted float-right mt-1">Just now</small>
              </div>
              <div class="text-truncate font-weight-bold">
                <span class="fa fa-exclamation text-danger"></span> Important message
              </div>
              <div class="small text-muted text-truncate">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </a>
          <a href="#" tabindex="0" class="dropdown-item">
            <div class="message">
              <div class="pt-3 mr-3 float-left">
                <div class="avatar">
                  <img src="assets/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span class="avatar-status badge-warning"></span>
                </div>
              </div>
              <div>
                <small class="text-muted">Jane Doe</small>
                <small class="text-muted float-right mt-1">5 minutes ago</small>
              </div>
              <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <div class="small text-muted text-truncate">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </a>
          <a href="#" tabindex="0" class="dropdown-item">
            <div class="message">
              <div class="pt-3 mr-3 float-left">
                <div class="avatar">
                  <img src="assets/img/avatars/5.jpg" class="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span class="avatar-status badge-danger"></span>
                </div>
              </div>
              <div>
                <small class="text-muted">Janet Doe</small>
                <small class="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div class="text-truncate font-weight-bold">
                Lorem ipsum dolor sit amet
              </div>
              <div class="small text-muted text-truncate">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </a>
          <a href="#" tabindex="0" class="dropdown-item">
            <div class="message">
              <div class="pt-3 mr-3 float-left">
                <div class="avatar">
                  <img src="assets/img/avatars/4.jpg" class="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span class="avatar-status badge-info"></span>
                </div>
              </div>
              <div>
                <small class="text-muted">Joe Doe</small>
                <small class="text-muted float-right mt-1">4:03 AM</small>
              </div>
              <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <div class="small text-muted text-truncate">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </a>
          <a href="#" tabindex="0" class="text-center dropdown-item">
            <strong>View all messages</strong>
          </a>
        </div>
        {/* ================== messages ================== */}

      </li>
    </ul>
  );
}

export default NavItem;