import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateItem } from '../../redux/items';
import { fetchUnits } from '../../redux/units';
import { fetchItemTypes } from '../../redux/itemTypes';
import { fetchItemGroups } from '../../redux/itemGroups';

import ItemForm from '../../components/Items/Form';

const initialState = {
  isEditing: false,
};

class EditForm extends Component {
  constructor (props) {
    super(props);

    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    isError: PropTypes.any,
    isSuccess: PropTypes.object,
    item: PropTypes.object,
    units: PropTypes.array.isRequired,
    itemTypes: PropTypes.array.isRequired,
    itemGroups: PropTypes.array.isRequired,
    updateItem: PropTypes.func.isRequired,
    fetchUnits: PropTypes.func.isRequired,
    fetchItemTypes: PropTypes.func.isRequired,
    fetchItemGroups: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchUnits();
    this.props.fetchItemTypes();
    this.props.fetchItemGroups();
  }

  handleSubmit = item => e => {
    e.preventDefault();
    
    this.props.updateItem(item);
  }

  render() {
    let { item, units, itemTypes, itemGroups } = this.props;
    
    return (
      <div className="animated fadeIn">
        <ItemForm
          item={item}
          units={units}
          itemTypes={itemTypes}
          itemGroups={itemGroups}
          handleSubmit={this.handleSubmit}
          isEditing={true}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;

  return {
    item: state.item.items.find(item => parseInt(item.id) === parseInt(id)),
    units: state.unit.units,
    itemTypes: state.itemType.itemTypes,
    itemGroups: state.itemGroup.itemGroups
  }
};

export default connect(
  mapStateToProps, {
    fetchUnits,
    fetchItemTypes,
    fetchItemGroups,
    updateItem 
  }
)(EditForm);
