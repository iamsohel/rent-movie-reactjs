import React, {Component} from 'react';
import Table from './common/table';
import {Link} from 'react-router-dom';
import auth from '../services/authService';

class CustomersTable extends Component {

    columns = [
        {
            path: 'name',
            label: 'Name',
            content: customer => <Link to={`/customers/${customer._id}`}>{customer.name} </Link>
        },
        {path: 'phone', label: 'Phone'},
        {path: 'isGold', label: 'Gold Customer'},
    ];

    deleteColumn = {
        key: 'delete',
        content: customer => <button onClick={() => this.props.onDelete(customer)}
                                  className="btn btn-danger btn-sm">Delete</button>
    };

    constructor(){
        super();
        const user = auth.getCurrentUser();
        if(user && user.isAdmin){
            this.columns.push(this.deleteColumn);
        }
    }


    render() {

        const {customers, onSort, sortColumn} = this.props;

        return (
            <Table
                columns={this.columns}
                data={customers}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    }
}

export default CustomersTable;