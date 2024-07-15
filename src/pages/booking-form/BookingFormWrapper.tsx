import { PersonalInfoForm } from './PersonalInfoForm';
import { BookingDetailForm } from './BookingDetailForm';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { AppDispatch } from '../../store/index';
import { removeTime } from '../../store/availableTimesSlice';
import { useDispatch } from 'react-redux';

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

export const BookingFormWrapper = () => {
  const dispatch: AppDispatch = useDispatch();

  const [step, setStep] = useState<number>(1);
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
  const [emailError, setEmailError] = useState<boolean>(false);
  const [telephoneError, setTelephoneError] = useState<boolean>(false);

  //REMOVE SELECTED TIME FROM AVAILABLE TIMES IN STORE AND SERVER
  const handleRemoveTime = (time: string) => {
    dispatch(removeTime(time));
    //tady udělat axios.delete from booking time endpoint
  };

  //INPUT CHANGE HANDLING
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  //FIRST SECTION SUBMISSION - PERSONAL INFO
  const handleFirstSectionSubmit = (e: FormEvent) => {
    e.preventDefault();

    const checkedTelephone = inputData.telephone.trim().replace(/\s+/g, '');
    const checkedEmail = isValidEmail(inputData.email.trim());

    const isTelephoneValid =
      !isNaN(parseInt(checkedTelephone)) && checkedTelephone.length === 9;
    const isEmailValid = checkedEmail;

    setTelephoneError(!isTelephoneValid);
    setEmailError(!isEmailValid);

    if (isTelephoneValid && isEmailValid) {
      setStep(2);
      console.log('after first submit', inputData);
    }
  };

  //EMAIL VALIDITY CHECK
  const isValidEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  //GO A STEP BACK ONCLICK FUNCTION
  const handleStepBack = () => {
    setStep(1);
    setEmailError(false);
    setTelephoneError(false);
  };

  //SECOND SECTION SUBMISSION - BOOKING INFO + SENDING DATA TO SERVER
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('after second submit', inputData);
    handleRemoveTime(inputData.time);
  };

  return (
    <Container className='mt-5 form-container'>
      <h1>Objednat se</h1>
      <Form
        className='mt-5'
        onSubmit={step === 1 ? handleFirstSectionSubmit : handleSubmit}
      >
        {step === 1 && (
          <PersonalInfoForm
            handleChange={handleChange}
            emailError={emailError}
            telephoneError={telephoneError}
          />
        )}
        {step === 2 && <BookingDetailForm handleChange={handleChange} />}

        {step === 1 ? (
          <Button type='submit' className='action-btn mt-3 mb-5'>
            Další
          </Button>
        ) : (
          <Container>
            <Button className='action-btn mt-3 mb-5' onClick={handleStepBack}>
              Zpět
            </Button>
            <Button type='submit' className='action-btn mt-3 mb-5'>
              Objednat se
            </Button>
          </Container>
        )}
      </Form>
    </Container>
  );
};
