import React, {Component} from 'react';
import Like from './common/like';
import Table from './common/table';
import {Link} from 'react-router-dom';
import auth from '../services/authService';

class MoviesTable extends Component {

    columns = [
        {
            path: 'title',
            label: 'Title',
            content: movie => <Link to={`/movie-detail/${movie._id}`}>{movie.title} </Link>
        },
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {key: 'like', content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)}/>},
    ];

    editColumn = {
        key: 'edit',
        content: movie => <Link to={`/movies/${movie._id}`} className="btn btn-primary btn-sm">Update</Link>
    };

    deleteColumn = {
        key: 'delete',
        content: movie => <button onClick={() => this.props.onDelete(movie)}
                                  className="btn btn-danger btn-sm">Delete</button>
    };

    constructor(){
        super();
        const user = auth.getCurrentUser();
        this.columns.push(this.editColumn);
        if(user && user.isAdmin){
            
            this.columns.push(this.deleteColumn);
        }
    }


    render() {

        const {movies, onSort, sortColumn} = this.props;

        return (
            <Table
                columns={this.columns}
                data={movies}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    }
}

export default MoviesTable;