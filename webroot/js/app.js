//Write your javascript here, or roll your own. It's up to you.
//Make your ajax call to http://localhost:8765/api/index.php here
function ErrorMsg({message}) {
    return (
        <div className="alert alert-danger text-center">{message}</div>       
    );
}

function SearchBar({search, handleChange, handleSubmit}) {   
    return (
        <div>
            <h2 className="justify-content-md-center text-center">Countries Search</h2>
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
            results: {},
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
        })
        .catch(err => {
            console.log(err.message);
            this.setState({
                error: 'There are no results'
            });          
        });        
    }
  
    render() {
        const {error, search} = this.state;

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
            </div>       
       );
    }
}
  
ReactDOM.render(<App />, document.getElementById("root"));
  
  