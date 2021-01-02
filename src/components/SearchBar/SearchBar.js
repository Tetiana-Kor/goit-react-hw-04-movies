import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './SearchBar.module.css';

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}
