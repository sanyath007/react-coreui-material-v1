import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addItem } from '../../redux/items';
import { fetchUnits } from '../../redux/units';
import { fetchItemTypes } from '../../redux/itemTypes';
import { fetchItemGroups } from '../../redux/itemGroups';

import ItemForm from '../../components/Items/Form';

const initialState = {
  status: false,
};

class NewForm extends Component {
  constructor (props) {
    super(props);

    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    errors: PropTypes.any,
    units: PropTypes.array.isRequired,
    itemTypes: PropTypes.array.isRequired,
    itemGroups: PropTypes.array.isRequired,
    addItem: PropTypes.func.isRequired,
    fetchUnits: PropTypes.func.isRequired,
    fetchItemTypes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchUnits();
    this.props.fetchItemTypes();
    this.props.fetchItemGroups();
  }
  
  handleSubmit (newItem) {
    this.props.addItem(newItem);
  }

  render () {
    let { item, units, itemTypes, itemGroups, errors } = this.props;

    return (

      <div className="animated fadeIn">
        <ItemForm
          item={item}
          units={units}
          itemTypes={itemTypes}
          itemGroups={itemGroups}
          handleSubmit={this.handleSubmit}
          formMode={true}
          validateErrors={errors}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.item.errors,
  units: state.unit.units,
  itemTypes: state.itemType.itemTypes,
  itemGroups: state.itemGroup.itemGroups
});

export default connect(
  mapStateToProps,
  { fetchUnits, fetchItemTypes, fetchItemGroups, addItem }
)(NewForm);
