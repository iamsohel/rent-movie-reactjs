import React, {Component} from "react";
import {Link} from "react-router-dom";
import CustomersTable from "./customerTable";
import {toast} from "react-toastify";
import Pagination from "./common/pagination";
import {getCustomers, deleteCustomer} from "../services/customerService";
import {paginate} from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Customers extends Component {
    state = {
        customers: [],
        currentPage: 1,
        pageSize: 8,
        searchQuery: "",
        sortColumn: {path: "name", order: "asc"},
        loading: false
    };

    async componentDidMount() {
        this.setState({loading: true})
        const {data: customers} = await getCustomers();
        console.log(customers);
        this.setState({customers, loading: false});
    }

    handleDelete = async customer => {
        const originalCustomers = this.state.customers;
        const customers = originalCustomers.filter(m => m._id !== customer._id);
        this.setState({customers});

        try {
            await deleteCustomer(customer._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error('This customer has been already deleted.')
            this.setState({customers: originalCustomers});
        }


    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleSearch = query => {
        this.setState({searchQuery: query});
    };

    handleSort = sortColumn => {
        this.setState({sortColumn});
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            sortColumn,
            searchQuery,
            customers: allCustomers
        } = this.state;

        let filtered = allCustomers;
        if (searchQuery)
            filtered = allCustomers.filter(m =>
                m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
    
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const customers = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: customers};
    };

    render() {
        const {length: count} = this.state.customers;
        const {pageSize, currentPage, sortColumn, searchQuery} = this.state;
        const {user} = this.props;

        //if (count === 0) return <p>There are no movies in the database.</p>;

        const {totalCount, data: customers} = this.getPagedData();

        return (
            <div className="row">
                <div className="col">
                    {(<Link
                        to="/customers/new"
                        className="btn btn-primary"
                        style={{marginBottom: 20}}
                    >
                        New Customer
                    </Link>)}
                    <p>Showing {totalCount} customers in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                    <CustomersTable
                        customers={customers}
                        sortColumn={sortColumn}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                     {this.state.loading && (
                        <div class="spinner-grow text-dark" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Customers;
