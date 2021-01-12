import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateItem } from '../../redux/items';
import { fetchUnits } from '../../redux/units';
import { fetchItemTypes } from '../../redux/itemTypes';
import { fetchItemGroups } from '../../redux/itemGroups';

import ItemForm from './ItemForm';

class EditForm extends Component {
  constructor (props) {
    super(props);

    this.initialState = {
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
    }

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
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
    fetchItemTypes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchUnits();
    this.props.fetchItemTypes();
    this.props.fetchItemGroups();
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    
    /** If input name is 'item_group' call handleItemGroupSelected method */
    if (name === 'item_group') {
      this.handleItemGroupSelected(value);
    }
  }
  
  handleItemGroupSelected (id) {
    let selectedGroup = this.props.itemGroups.filter(group => parseInt(group.id) === parseInt(id));

    this.setState(prevState => ({
      ...prevState,
      name: selectedGroup[0].group_name+ ' No.'
    }));
  }

  handleSubmit = item => e => {
    e.preventDefault();
    
    console.log(item);
    // this.props.updateItem(item);
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
