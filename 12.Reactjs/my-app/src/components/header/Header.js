import React from 'react';

export default function Header({title, subtitle}) {
    return (
        <div className="jumbotron text-center" style={{"margin-bottom": "0"}}>
            <h1>{title}</h1>
            <p>{subtitle}</p> 
        </div>
    );
}