//Write your javascript here, or roll your own. It's up to you.
//Make your ajax call to http://localhost:8765/api/index.php here
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }
    
    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state.search);
    }
  
    render() {  
        return (
            <div>
                <h2 className="justify-content-md-center text-center">Countries Search</h2>
                <div className="text-center" id="form-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                        <div className="col-md-8 form-group">
                            <label htmlFor="search">Search</label>
                            <input
                                id="search"
                                name="search" 
                                type="text"
                                className="form-control"
                                value={this.state.search}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor="search-type">Search Type</label>
                            <select className="form-control">
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
}
  
ReactDOM.render(<App />, document.getElementById("root"));
  
  