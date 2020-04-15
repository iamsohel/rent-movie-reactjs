import React, {Component} from "react";
import {getMovie} from "../services/movieService";
import Form from "./common/form";
import Joi from "joi-browser";
import {getGenres} from "../services/genreService";
import faker from 'faker';

class MovieDetail extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: {},
        loading: false
    };

   
    async populateGenres() {
        const {data: genres} = await  getGenres();
        this.setState({genres});
    }

    async populateMovie() {
        try {
            const movieId = this.props.match.params.id;
            const {data: movie} = await getMovie(movieId);
            this.setState({data: this.mapToViewModel(movie), loading: false});
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string()
            .required()
            .label("Title"),
        genreId: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number()
            .required()
            .min(0)
            .max(100)
            .label("Number in Stock"),
        dailyRentalRate: Joi.number()
            .required()
            .min(0)
            .max(10)
            .label("Daily Rental Rate")
    };

    async componentDidMount() {
        this.setState({loading: true})
        await  this.populateGenres();
        await  this.populateMovie();
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = async () => {

        this.props.history.push("/movies");
    };

    render() {
        return (
                <React.Fragment>
                     {this.state.loading && (
                        <div class="spinner-grow text-dark" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
                    {!this.state.loading && (
                        <div className="row">
                             <div className="col-md-8">
                                <h1>Movie Details</h1>
                                <form>
                                    {this.renderInput("title", "Title", "text", true)}
                                    {this.renderSelect("genreId", "Genre", this.state.genres, true)}
                                    {this.renderInput("numberInStock", "Number in Stock", "number", true)}
                                    {this.renderInput("dailyRentalRate", "Rate", 'Text', true)}
                                </form>
                             </div>
                             <div className="col-md-4">
                                <div className="card" style={{width: '100%'}}>
                                <img src={faker.internet.avatar()} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                <h5 className="card-title">Title: {this.state.data.title}</h5>
                                </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                </React.Fragment>
            
        );
    }
}

export default MovieDetail;
