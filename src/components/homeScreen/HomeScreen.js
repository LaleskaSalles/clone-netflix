import Nav from "../nav/Nav"
import Banner from "../banner/Banner"
import "./HomeScreen.css"

function HomeScreen(){
    return(
        <div className="homeScreen">
            <Nav/>
            <Banner/>
        </div>
    )
}

export default HomeScreen