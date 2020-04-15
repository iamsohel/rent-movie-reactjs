import React, {Component} from "react";
import {Link} from "react-router-dom";
import RentalsTable from "./RentalsTable";
import {toast} from "react-toastify";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Rentals extends Component {
    state = {
        rents: [
            {
                _id: '1',
                name: 'Troy',
                customer: 'James',
                rentDate: this.todayDate()
            },
            {
                _id: '2',
                name: 'Amar Akash',
                customer: 'HIru Kasda',
                rentDate: this.todayDate()
            },
            {
                _id: '3',
                name: 'Janura',
                customer: 'Kagsi',
                rentDate: this.todayDate()
            },
            {
                _id: '4',
                name: 'Prane Huds',
                customer: 'Konika Rims',
                rentDate: this.todayDate()
            },
            {
                _id: '5',
                name: 'Does',
                customer: 'Jemmmy',
                rentDate: this.todayDate()
            },
            {
                _id: '6',
                name: 'Good Days',
                customer: 'Stan Baker',
                rentDate: this.todayDate()
            },
            {
                _id: '7',
                name: 'Kobra',
                customer: 'Denis Riche',
                rentDate: this.todayDate()
            },
            {
                _id: '8',
                name: 'Black Panther',
                customer: 'Bishial Bois',
                rentDate: this.todayDate()
            },
            {
                _id: '9',
                name: 'End Gsam',
                customer: 'Stephen Hig',
                rentDate: this.todayDate()
            },
            {
                _id: '10',
                name: 'KIll Mission',
                customer: 'Riders',
                rentDate: this.todayDate()
            }
        ],
        currentPage: 1,
        pageSize: 8,
        searchQuery: "",
        sortColumn: {path: "name", order: "asc"}
    };

    todayDate(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    //  componentDidMount() {
    //     const {data: rents} = rentList;
    //     console.log(rents);
    //     this.setState({rents});
    // }

    // handleDelete = async customer => {
    //     const originalrents = this.state.rents;
    //     const rents = originalrents.filter(m => m._id !== customer._id);
    //     this.setState({rents});

    //     try {
    //         await deleteCustomer(customer._id);
    //     } catch (ex) {
    //         if (ex.response && ex.response.status === 404)
    //             toast.error('This customer has been already deleted.')
    //         this.setState({rents: originalrents});
    //     }


    // };

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
            rents: allrents
        } = this.state;

        let filtered = allrents;
        if (searchQuery)
            filtered = allrents.filter(m =>
                m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
    
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const rents = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: rents};
    };

    render() {
        const {length: count} = this.state.rents;
        const {pageSize, currentPage, sortColumn, searchQuery} = this.state;
        const {user} = this.props;

        //if (count === 0) return <p>There are no movies in the database.</p>;

        const {totalCount, data: rents} = this.getPagedData();

        return (
            <div className="row">
                <div className="col">
                    {user &&(<Link
                        to="/rents/new"
                        className="btn btn-primary"
                        style={{marginBottom: 20}}
                    >
                        New Rent
                    </Link>)}
                    <p>Showing {totalCount} rents in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                    <RentalsTable
                        rents={rents}
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
                </div>
            </div>
        );
    }
}

export default Rentals;
