import { Container, Form, FormControl, Button } from 'react-bootstrap';
import { ChangeEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/index';
import { setInitialState } from '../../store/availableTimesSlice';
import services from '../../assets/services.json';
import DatePicker, { registerLocale } from 'react-datepicker';
import { cs } from 'date-fns/locale'; // Import Czech locale for Monday as the first day
import axios from 'axios';

registerLocale('cs', cs);

interface BookingDetailFormParams {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const BookingDetailForm = ({
  handleChange,
}: BookingDetailFormParams) => {
  //need to fetch available times from server booking time endpoint and then set this data as available hours in store; - DONE

  const dispatch: AppDispatch = useDispatch();

  const availableHours = useSelector(
    (state: RootState) => state.availableTimes.times,
  );

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      const response = await fetch('http://localhost:5000/availableTimes').then(
        (res) => res.json(),
      );
      console.log(response[0].times);
      dispatch(setInitialState(response[0].times));
    };

    fetchAvailableTimes();
  }, []);

  return (
    <Container>
      <Form.Group className='mb-3'>
        <Form.Label htmlFor='sluzby'>Vyberte službu:</Form.Label>
        <Form.Control
          as='select'
          id='sluzby'
          name='service'
          onChange={handleChange}
          required
        >
          <option value=''>--vyberte službu--</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* <Form.Group className='mb-3'>
        <Form.Label>Vyberte délku trvání:</Form.Label>
        <div>
          <Button
            onClick={() => handleDurationSelection(30)}
            className={`custom-duration-button me-2 ${
              selectedDuration === 30 ? 'selected' : ''
            }`}
            disabled={isEntranceExam} // Disable 30 min if Entrance examination selected
          >
            30 min
          </Button>
          <Button
            className={`custom-duration-button me-2 ${
              selectedDuration === 60 ? 'selected' : ''
            }`}
            onClick={() => handleDurationSelection(60)}
          >
            60 min
          </Button>
        </div>
         {durationError && (
          <Form.Text className='text-muted'>
            Vyberte délku trvání!
            <br />
          </Form.Text>
        )} 
      </Form.Group> */}

      {/* <Form.Group className='mb-3'>
        <Form.Label htmlFor='date'>Vyberte termín:</Form.Label>
        <br></br>
        <FormControl
          as={DatePicker as any}
          selected={startDate}
          onChange={handleDateChange as any}
          filterDate={isWeekday}
          minDate={new Date()}
          dateFormat='dd-MM-yyyy'
          id='date'
          name='date'
          locale='cs'
          required
        />
      </Form.Group> */}

      <Form.Group className='mb-3'>
        <Form.Label htmlFor='time'>Vyberte čas návštěvy:</Form.Label>
        <Form.Control
          as='select'
          id='time'
          name='time'
          onChange={handleChange}
          required
        >
          <option value='' disabled hidden>
            Vyberte čas návštěvy
          </option>
          {availableHours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Container>
  );
};
