//Write your javascript here, or roll your own. It's up to you.
//Make your ajax call to http://localhost:8765/api/index.php here
function AreaInfoTable({title, areas, header, naText}) {
    return (
        <div>
            <h3 className="justify-content-md-center text-center">{title}</h3>
            <table className="table table-striped table-bordered area-table">
                <thead>
                    <tr>
                        <th scope="col">{header}</th>
                        <th scope="col">Number of Countries in Results</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(areas).map(([region, freq], i) => {
                        return (
                            <tr key={i}>
                                <th scope="row">{region !== '' ? region : naText}</th>
                                <td>{freq}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
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

    submitForm = () => {
        const {search, searchType} = this.state;
        let searchUrlPath;
        let params;
        
        if (search === '') {
            this.setState({
                error: 'Please enter a search query'
            });

            return;
        }

        if (searchType === 'Name' || searchType === 'Full Name') {
            searchUrlPath = 'name';
            params = {
                fullName: searchType === 'Full Name'
            }
        } else {
            searchUrlPath = 'alpha';
        }

        axios.get(`/api/index.php/${searchUrlPath}/${this.state.search}`, {params})
        .then(res => {
            this.setState({
                error: '',
                results: res.data
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                error: 'There are no results',
                results: undefined
            });          
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        
        // always clear out error before submitting the form again
        this.setState({
            error: ''
        }, this.submitForm);      
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
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <AreaInfoTable
                                        title={'Region Data'}
                                        areas={results.regions}
                                        header={'Region'}
                                        naText={'Regionless'}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <AreaInfoTable
                                        title={'Subregion Data'}
                                        areas={results.subregions}
                                        header={'Subregion'}
                                        naText={'Subregionless'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>                 
                )}
            </div>       
       );
    }
}
  
ReactDOM.render(<App />, document.getElementById("root"));
  
  