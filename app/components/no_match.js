import React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'

export default function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code> 
      </h3>
      <hr />
      <h3>
        How about we go back <Link to="/"> Home </Link>
      </h3>
    </div>
  );
}

