import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SearchBar({ onSubmit }) {
  const [name, setName] = useState('');

  const handleChange = event => {
    setName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (name.trim() === '') {
      toast.error('Please enter something!');
      return;
    }
    onSubmit(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
}
