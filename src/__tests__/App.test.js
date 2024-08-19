import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';


test('the form includes text inputs for name and email address', () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test('the form includes three checkboxes to select areas of interest', () => {
  render(<App />);
  
  const codingCheckbox = screen.getByLabelText(/coding/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  const writingCheckbox = screen.getByLabelText(/writing/i);
  
  expect(codingCheckbox).toBeInTheDocument();
  expect(designCheckbox).toBeInTheDocument();
  expect(writingCheckbox).toBeInTheDocument();
});

test('the checkboxes are initially unchecked', () => {
  render(<App />);
  
  const codingCheckbox = screen.getByLabelText(/coding/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  const writingCheckbox = screen.getByLabelText(/writing/i);
  
  expect(codingCheckbox).not.toBeChecked();
  expect(designCheckbox).not.toBeChecked();
  expect(writingCheckbox).not.toBeChecked();
});


test('the page shows information the user types into the name and email address form fields', () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  
  expect(nameInput).toHaveValue('John Doe');
  expect(emailInput).toHaveValue('john@example.com');
});

test('checked status of checkboxes changes when user clicks them', () => {
  render(<App />);
  
  const codingCheckbox = screen.getByLabelText(/coding/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  
  fireEvent.click(codingCheckbox);
  fireEvent.click(designCheckbox);
  
  expect(codingCheckbox).toBeChecked();
  expect(designCheckbox).toBeChecked();
  
  fireEvent.click(codingCheckbox);
  fireEvent.click(designCheckbox);
  
  expect(codingCheckbox).not.toBeChecked();
  expect(designCheckbox).not.toBeChecked();
});

test('a message is displayed when the user clicks the Submit button', () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const codingCheckbox = screen.getByLabelText(/coding/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });
  
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.click(codingCheckbox);
  fireEvent.click(submitButton);
  
  expect(screen.getByText(/thank you for signing up, john doe!/i)).toBeInTheDocument();
  expect(screen.getByText(/we have received your interest in coding/i)).toBeInTheDocument();
});
