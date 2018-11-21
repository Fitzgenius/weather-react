import React from "react";

class Header extends React.Component {

    render() {

        return (
            <header className="animated slideInDown">
                <div className="container">
                    <h1 className="title"><i className="fas fa-sun"></i> Weather</h1>
                    <span className="subtitle">Check the weather in these cities</span>
                </div>
            </header>
        )
    }
}

export default Header;