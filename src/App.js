import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, Card, Image } from 'semantic-ui-react';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('car')
      .then(response => {
        setCars(response.data);
      }).catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <div className="App">
      <Header as='h3' dividing>
        Test Drive App
      </Header>
      <div className="flex-row">
        {
          cars && cars.length > 0 && cars.map(car => (
            <div key={car.id}>
              <Card>
                <Image src={car.image} wrapped size='medium' />
                <Card.Content>
                  <Card.Header>{car.companyName} </Card.Header>
                  <Card.Meta>
                    <span className='date'>{car.modelName}</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
