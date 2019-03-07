import React from 'react'
// import AllCampus from './all_campus'

import NoMatch from './no_match'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to='/allstudent'>  
          <span className='navBar'> Students </span> 
          </Link>
          <Link to='/allcampus'>
          <span className='navBar'> Campuses </span> 
          </Link>
        </nav>
        <main>

        <h1>Welcome to the Wu Tang Academy of JavaScript!</h1>

          <Switch>

            <Route path='/allcampus' render={ () =>{

                  return (   <div>
                         <CampusForm />
                         <AllCampus />
                         </div>)
            }} />
            
            <Route path='/allstudent' render={ () =>{

                  return (   <div>
                         <AllStudent />
                         <Student_form />
                         </div>)
            }} />

            {/* 
            <Route path='/addcampus' component={CampusForm} />
            <Route path='/addstudent' component={Student_form} />
            <Route path='/student/:studentid' component={single_student} />
            <Route path='/campus/:campusid' component={single_campus} />
            <Route exact path='/' component={AllCampus} />
            */}
            
            <Route component={NoMatch} />

          </Switch>

        </main>
      </div>
    </BrowserRouter>
  )
}

export default Root
