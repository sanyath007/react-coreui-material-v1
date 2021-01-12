import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateItem } from '../../redux/items';
import { fetchUnits } from '../../redux/units';
import { fetchItemTypes } from '../../redux/itemTypes';
import { fetchItemGroups } from '../../redux/itemGroups';

import ItemForm from './ItemForm';

const initialState = {
  id: '',
  name: '',
  unit: '',
  cost: 0.00,
  stock: 0,
  min: 0,
  balance: 0,
  item_type: '',
  item_group: '',
  status: 0
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
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item.item,
  units: state.unit.units,
  itemTypes: state.itemType.itemTypes,
  itemGroups: state.itemGroup.itemGroups
});

export default connect(
  mapStateToProps,
  { fetchUnits, fetchItemTypes, fetchItemGroups, updateItem }
)(EditForm);
