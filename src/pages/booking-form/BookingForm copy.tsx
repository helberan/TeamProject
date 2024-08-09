import React, { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { Container, Form, Button, Modal, FormControl, Row, Col } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import './BookingForm.css';
import services from '../../assets/services.json';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import { cs } from 'date-fns/locale'; // Import Czech locale for Monday as the first day

registerLocale('cs', cs);

interface FormInputData {
  id: number | undefined;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  service: string;
  date: string;
  time: string;
  duration?: string;
}

export const BookingForm = () => {
  const d = new Date();
  const today = d.toISOString().split('T')[0];
  const maxDate = d.getFullYear() + 1 + '-01-01';

  const [inputData, setInputData] = useState<FormInputData>({
    id: undefined,
    name: '',
    surname: '',
    email: '',
    telephone: '',
    service: '',
    date: '',
    time: '',
    duration: '',
  });

  const [checkedInputData, setCheckedInputData] = useState<FormInputData | null>(null);
  const [telephoneError, setTelephoneError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [durationError, setDurationError] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [availableHours, setAvailableHours] = useState([
    '09:00','09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ]);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null); // null, 30 or 60
  const [isEntranceExam, setIsEntranceExam] = useState<boolean>(false); // Track if service is "Vstupní vyšetření"


  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      setInputData((prevData) => ({ ...prevData, date: date.toISOString().split('T')[0] }));
    }
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
    if (value === 'Vstupní vyšetření') {
      setIsEntranceExam(true);
      setSelectedDuration(60); // Force duration to 60 min for Entrance examination
      setInputData((prevData) => ({ ...prevData, duration: '60' }));
    } else {
      setIsEntranceExam(false);
    }
  };

  const handleDurationSelection = (duration: number) => {
    if (isEntranceExam && duration !== 60) {
      return;
    }
    setSelectedDuration(duration === selectedDuration ? null : duration);
     // If 60 min duration is selected, adjust available hours to only hourly slots
     if (duration === 60) {
      setAvailableHours([
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
      ]);
    } else {
      // Otherwise, reset available hours to default
      setAvailableHours([
        '09:00','09:30', '10:00', '10:30', '11:00', '11:30', '12:00', 
        '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
        '16:00', '16:30', '17:00', '17:30',
      ]);
    }
    setInputData((prevData) => ({ ...prevData, duration: duration.toString() }));
    setDurationError(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDuration) {
      setDurationError(true);
      return;
    }
    await checkAvailabilityAndSubmit();
    
  };

  const isValidEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const checkAvailabilityAndSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/bookings').then((res) => res.json());
      let checkedTelephone = inputData.telephone.trim().replace(/\s+/g, '');
      let checkedEmail = isValidEmail(inputData.email.trim());

      if (isNaN(parseInt(checkedTelephone)) || checkedTelephone.length > 9) {
        setTelephoneError(true);
        setEmailError(false);
      } else if (!checkedEmail) {
        setEmailError(true);
        setTelephoneError(false);
      } else {
        const formattedData = {
          id: response[response.length - 1].id + 1,
          name: inputData.name.trim(),
          surname: inputData.surname.trim(),
          email: inputData.email.trim(),
          telephone: checkedTelephone,
          service: inputData.service.trim(),
          date: inputData.date.trim(),
          time: inputData.time.trim(),
          duration: selectedDuration === 30 ? '30 min' : '60 min',
        };

        setTelephoneError(false);
        setEmailError(false);
        setCheckedInputData(formattedData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (checkedInputData) {
      const postNewBooking = async () => {
        try {
          if (checkedInputData) {
            const response = await axios.post('http://localhost:3001/bookings', checkedInputData);
            console.log('Booking submitted', response.data);
            localStorage.setItem('formSubmitted', 'true');
            setShowModal(true);
            setFormSubmitted(true);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setCheckedInputData(null);
          setInputData({
            id: undefined,
            name: '',
            surname: '',
            email: '',
            telephone: '',
            service: '',
            date: '',
            time: '',
            duration: '',
          });
          setTelephoneError(false);
          setEmailError(false);
        }
      };

      postNewBooking();
    }
  }, [checkedInputData]);

  useEffect(() => {
    if (localStorage.getItem('formSubmitted') === 'true') {
      setFormSubmitted(true);
      setTimeout(() => {
        localStorage.removeItem('formSubmitted');
        setFormSubmitted(false);
      }, 5000);
    }
  }, []);

  return (
    <Container className='mt-5 form-container'>
      {localStorage.getItem('formSubmitted') && (
        <div className='info-message'>Formulář byl úspěšně odeslán!</div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rezervace potvrzena</Modal.Title>
        </Modal.Header>
        <Modal.Body>Budeme se těšit na Vaši návštěvu!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>Zavřít</Button>
        </Modal.Footer>
      </Modal>

      <h1>Objednat se</h1>

      <Form className='mt-5' onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='name'>Křestní jméno</Form.Label>
          <Form.Control
            type='text'
            placeholder='Křestní jméno'
            id='name'
            name='name'
            value={inputData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='surname'>Příjmení</Form.Label>
          <Form.Control
            type='text'
            placeholder='Příjmení'
            id='surname'
            name='surname'
            value={inputData.surname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>E-mail</Form.Label>
          <Form.Control
            type='email'
            placeholder='E-mailová adresa'
            id='email'
            name='email'
            value={inputData.email}
            onChange={handleChange}
            required
          />

          {emailError && (
            <Form.Text>Zadejte platný e-mail!<br /></Form.Text>
          )}

          <Form.Text className='text-muted'>Váš e-mail nebudeme s nikým sdílet.</Form.Text>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='telephone'>Telefonní číslo</Form.Label>
          <Form.Control
            type='tel'
            placeholder='Telefonní číslo'
            id='telephone'
            name='telephone'
            value={inputData.telephone}
            onChange={handleChange}
            required
          />

          {telephoneError && (
            <Form.Text>Zadejte platné telefonní číslo! (pouze číslice, bez předvolby)<br /></Form.Text>
          )}

          <Form.Text className='text-muted'>Vaše telefonní číslo nebudeme s nikým sdílet.</Form.Text>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='sluzby'>Vyberte službu:</Form.Label>
          <Form.Control
            as='select'
            id='sluzby'
            name='service'
            value={inputData.service}
            onChange={handleChange}
            required
          >
            <option value='' disabled hidden>--vyberte službu--</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>{service.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Vyberte délku trvání:</Form.Label>
          <div>
            <Button
              onClick={() => handleDurationSelection(30)}
              className={`custom-duration-button me-2 ${selectedDuration === 30 ? 'selected' : ''}`}
              value = {inputData.duration} 
              disabled={isEntranceExam} // Disable 30 min if Entrance examination selected
            >
              30 min
            </Button>
            <Button
               className={`custom-duration-button me-2 ${selectedDuration === 60 ? 'selected' : ''}`}
              onClick={() => handleDurationSelection(60)}
              value = {inputData.duration}
            >
              60 min
            </Button>
          </div>
          {durationError && (
            <Form.Text className='text-muted'>Vyberte délku trvání!<br /></Form.Text>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='date'>Vyberte termín:</Form.Label>
          <br></br>
          <FormControl
            as={DatePicker as any}
            selected={startDate}
            onChange={handleDateChange as any}
            filterDate={isWeekday}
            minDate={new Date()}
            dateFormat="dd-MM-yyyy"
            id='date'
            name='date'
            locale='cs'
            value = {inputData.date}
            required
          />
        
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='time'>Vyberte čas návštěvy:</Form.Label>
          <Form.Control
            as='select'
            id='time'
            name='time'
            value={inputData.time}
            onChange={handleChange}
            required
          >
            <option value='' disabled hidden>Vyberte čas návštěvy</option>
            {availableHours.map((hour) => (
              <option key={hour} value={hour}>{hour}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type='submit' className='action-btn mt-3 mb-5'>Objednat se</Button>
      </Form>
    </Container>
  );
};
