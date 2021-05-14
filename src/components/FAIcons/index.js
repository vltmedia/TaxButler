import React from 'react';
import { ReactComponent as SignOutIcon } from '../../img/sign-out-alt-solid.svg';
import { ReactComponent as BackIcon } from '../../img/caret-square-left-regular.svg';
import { ReactComponent as AddShoppingCart } from '../../img/cart-plus-solid.svg';
import { ReactComponent as Edit } from '../../img/edit-solid.svg';
import { ReactComponent as Home } from '../../img/home-solid.svg';
import { ReactComponent as AddSquare } from '../../img/plus-square-solid.svg';
import { ReactComponent as ThickList } from '../../img/th-list-solid.svg';
import { ReactComponent as UserEdit } from '../../img/user-cog-solid.svg';
import { ReactComponent as Inbox } from '../../img/inbox-solid.svg';

import { ReactComponent as Envelope } from '../../img/envelope-solid.svg';
import { ReactComponent as Trash } from '../../img/trash-alt-solid.svg';
import { ReactComponent as Robot } from '../../img/robot-solid.svg';
import { ReactComponent as Download } from '../../img/file-download-solid.svg';
import { ReactComponent as Help } from '../../img/question-circle-solid.svg';
class FA_HelpIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <Help className="FAIcon" />
      </div>
    );
  }
}
class FA_DownloadIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <Download className="FAIcon" />
      </div>
    );
  }
}
class FA_RobotIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <Robot className="FAIcon" />
      </div>
    );
  }
}
class FA_InboxIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <Inbox className="FAIcon" />
      </div>
    );
  }
}

class FA_TrashIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <Trash className="FAIcon" />
      </div>
    );
  }
}

class FA_EnvelopeIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <Envelope className="FAIcon" />
      </div>
    );
  }
}

class FA_SignOutIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <SignOutIcon className="FAIcon" />
      </div>
    );
  }
}

class FA_BackIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <BackIcon className="FAIcon" />
      </div>
    );
  }
}

class FA_AddShoppingCart extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <AddShoppingCart className="FAIcon" />
      </div>
    );
  }
}

class FA_AddSquareIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <AddSquare className="FAIcon" />
      </div>
    );
  }
}

class FA_HomeIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <Home className="FAIcon" />
      </div>
    );
  }
}

class FA_EditIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <Edit className="FAIcon" />
      </div>
    );
  }
}

class FA_ThickListIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <ThickList className="FAIcon" />
      </div>
    );
  }
}

class FA_UserEditIcon extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={this.props.OverideClassName} onClick={this.props.onClicked}>
        <UserEdit className="FAIcon" />
      </div>
    );
  }
}

export {
  FA_SignOutIcon,
  FA_BackIcon,
  FA_AddShoppingCart,
  FA_AddSquareIcon,
  FA_HomeIcon,
  FA_EditIcon,
  FA_ThickListIcon,
  FA_UserEditIcon,
  FA_TrashIcon,
  FA_EnvelopeIcon,
  FA_DownloadIcon,
  FA_RobotIcon,
  FA_HelpIcon,
  FA_InboxIcon
};
