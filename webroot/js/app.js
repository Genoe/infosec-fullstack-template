//Write your javascript here, or roll your own. It's up to you.
//Make your ajax call to http://localhost:8765/api/index.php here
function RegionsTable({regions}) {
    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Region</th>
                    <th scope="col">Number of Countries in Results</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(regions).map(([region, freq], i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{region !== '' ? region : 'Regionless'}</th>
                            <td>{freq}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

function CountriesTable({countries}) {
    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Alpha 2 Code</th>
                    <th scope="col">Alpha 3 Code</th>
                    <th scope="col">Flag</th>
                    <th scope="col">Region</th>
                    <th scope="col">Subregion</th>
                    <th scope="col">Population</th>
                    <th scope="col">Languages</th>
                </tr>
            </thead>
            <tbody>
                {countries.map((country, i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{country.name}</th>
                            <td>{country.alpha2code}</td>
                            <td>{country.alpha3code}</td>
                            <td><img className="flag-img" src={country.flag}></img></td>
                            <td>{country.region}</td>
                            <td>{country.subregion}</td>
                            <td>{country.population}</td>
                            <td>{country.languages.join(', ')}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

function ErrorMsg({message}) {
    return (
        <div className="alert alert-danger text-center">{message}</div>       
    );
}

function SearchBar({search, handleChange, handleSubmit}) {   
    return (
        <div>
            <h1 className="justify-content-md-center text-center">Countries Search</h1>
            <div className="text-center" id="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                    <div className="col-md-8 form-group">
                        <label htmlFor="search">Search</label>
                        <input
                            id="search"
                            name="search" 
                            type="text"
                            className="form-control"
                            value={search}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-4 form-group">
                        <label htmlFor="searchType">Search Type</label>
                        <select className="form-control" name="searchType" id="searchType" onChange={handleChange}>
                            <option>Name</option>
                            <option>Full Name</option>
                            <option>Country Code</option>
                        </select>
                    </div>
                    </div>                  
                    <button type="submit" className="btn btn-primary">
                        Search!
                    </button>
                </form>  
            </div>   
        </div>             
    );  
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchType: 'Name',
            results: undefined,
            error: ''
        };
    }
    
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.searchType);

        if (this.state.search === '') {
            this.setState({
                error: 'Please enter a search query'
            });

            return;
        }

        axios.get(`/api/index.php/name/${this.state.search}`, {
            params: {
                fullName: this.state.searchType === 'Full Name'
            }
        })
        .then(res => {
            console.log(res.data);
            this.setState({
                error: '',
                results: res.data
            });
        })
        .catch(err => {
            console.log(err.message);
            this.setState({
                error: 'There are no results',
                results: undefined
            });          
        });        
    }
  
    render() {
        const {error, search, results} = this.state;

        return (
            <div>
                {error && (
                    <ErrorMsg message={error} />
                )}
                <SearchBar
                    search={search}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                {results && (
                    <div>
                        <CountriesTable
                            countries={results.countries}
                        />
                        <h2 className="justify-content-md-center text-center">
                            Total Number of Countries: {results.countries.length}
                        </h2>
                        <RegionsTable
                            regions={results.regions}
                        />
                    </div>                 
                )}
            </div>       
       );
    }
}
  
ReactDOM.render(<App />, document.getElementById("root"));
  
  