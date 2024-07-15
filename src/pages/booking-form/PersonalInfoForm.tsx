import { Container, Form } from 'react-bootstrap';
import { ChangeEvent } from 'react';

interface PersonalInfoFormParams {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  emailError: boolean;
  telephoneError: boolean;
}

export const PersonalInfoForm = ({
  handleChange,
  emailError,
  telephoneError,
}: PersonalInfoFormParams) => {
  return (
    <Container>
      <Form.Group className='mb-3'>
        {/* NAME */}
        <Form.Label htmlFor='name'>Křestní jméno</Form.Label>
        <Form.Control
          type='text'
          placeholder='Křestní jméno'
          id='name'
          name='name'
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* SURNAME */}
      <Form.Group className='mb-3'>
        <Form.Label htmlFor='surname'>Příjmení</Form.Label>
        <Form.Control
          type='text'
          placeholder='Příjmení'
          id='surname'
          name='surname'
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* EMAIL */}
      <Form.Group className='mb-3'>
        <Form.Label htmlFor='email'>E-mail</Form.Label>
        <Form.Control
          type='email'
          placeholder='E-mailová adresa'
          id='email'
          name='email'
          isInvalid={emailError}
          onChange={handleChange}
          required
        />

        <Form.Control.Feedback type='invalid'>
          Zadejte platný e-mail!
        </Form.Control.Feedback>

        <Form.Text className='text-muted'>
          Váš e-mail nebudeme s nikým sdílet.
        </Form.Text>
      </Form.Group>

      {/* PHONE NUMBER */}
      <Form.Group className='mb-3'>
        <Form.Label htmlFor='telephone'>Telefonní číslo</Form.Label>
        <Form.Control
          type='tel'
          placeholder='Telefonní číslo'
          id='telephone'
          name='telephone'
          isInvalid={telephoneError}
          onChange={handleChange}
          required
        />

        <Form.Control.Feedback type='invalid'>
          Zadejte platné telefonní číslo! (pouze číslice, bez předvolby)
        </Form.Control.Feedback>

        <Form.Text className='text-muted'>
          Vaše telefonní číslo nebudeme s nikým sdílet.
        </Form.Text>
      </Form.Group>
    </Container>
  );
};
