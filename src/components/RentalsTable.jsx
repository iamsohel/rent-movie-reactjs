import React, {Component} from 'react';
import Table from './common/table';
import {Link} from 'react-router-dom';
import auth from '../services/authService';

class RentalsTable extends Component {

    columns = [
        {
            path: 'name',
            label: 'Movie Name'
        },
        {path: 'customer', label: 'Customer Name'},
        {path: 'rentDate', label: 'Rent Date'},
    ];

    deleteColumn = {
        key: 'delete',
        content: rent => <button onClick={() => this.props.onDelete(rent)}
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

        const {rents, onSort, sortColumn} = this.props;
        console.log("rents: ",rents)

        return (
            <Table
                columns={this.columns}
                data={rents}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    }
}

export default RentalsTable;