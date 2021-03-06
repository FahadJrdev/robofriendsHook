import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';
function App(){
    const [robots, setRobot] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>response.json())
            .then(users=>{setRobot(users)});
    },[])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    };

    const filteredRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    return !robots.length?
        <h1 className='tc'>Loading</h1>:
        (
            <div className="tc">
                <Scroll>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={ onSearchChange }/>
                </Scroll>
                <ErrorBoundary>
                    <CardList robots = {filteredRobots} />    
                </ErrorBoundary>
            </div>
        );
}

export default App;