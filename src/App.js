import React, { useEffect, useState } from 'react';
import { Header, Card, Image, Button, Modal, Input } from 'semantic-ui-react';
import axios from 'axios';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState(null);
  const [slot, setSlot] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [personName, setPersonName] = useState('');

  useEffect(() => {
    getAvailaleCars();
  }, []);

  const getAvailaleCars = () => {
    axios.get('car')
      .then(response => {
        setCars(response.data);
      }).catch(error => {
        console.log(error);
      });
  }

  const getAvaialbleSlots = (id) => {
    axios.get(`schedule/${id}`)
      .then(response => {
        setCarId(id);
        setSchedule(response.data);
      }).catch(error => {
        console.log(error);
      });
  }

  const createBooking = () => {
    const booking = {
      carId,
      slot,
      personName
    }

    axios.post('/schedule', booking)
      .then(resonse => {
        console.log(resonse);
        setSlot(null);
        setPersonName(null);
        getAvaialbleSlots(carId);
      }).catch(error => console.log(error));
  }

  return (
    <div className="App">
      <Header as='h3' dividing>
        Test Drive App
      </Header>
      <div className="flex-row">
        {
          cars && cars.length > 0 && cars.map(car => (
            <div key={car.id}>
              <Card link onClick={() => getAvaialbleSlots(car.id)}>
                <Image src={car.image} wrapped size='medium' />
                <Card.Content>
                  <Card.Header>{car.companyName}</Card.Header>
                  <Card.Meta>
                    <span className='date'>{car.modelName}</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            </div>
          ))
        }
      </div>

      {
        carId &&
        <div>
          {
            schedule && schedule.length > 0 && schedule.map((slot, index) => (
              <Button
                key={index}
                basic
                color={(slot.isBooked) ? 'red' : 'green'}
                disabled={slot.isPassed}
                onClick={() => setSlot(slot.time)}>
                {slot.time}
              </Button>
            ))
          }
        </div>
      }

      {
        slot &&
        <Modal open={slot} onClose={() => setSlot(null)} closeOnDocumentClick>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content>
            <h4>{slot}</h4>
            <Input size='large' placeholder='Booked By' onChange={event => setPersonName(event.target.value)} value={personName} />
            <Button onClick={() => createBooking()}>
              Create
            </Button>
          </Modal.Content>
        </Modal>
      }
    </div>
  );
}

export default App;