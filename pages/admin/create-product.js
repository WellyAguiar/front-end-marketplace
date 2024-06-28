import { useState } from 'react';
import styles from '../../styles/CreateProduct.module.css';

export default function CreateProduct() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState({});
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState(null);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleQuantityChange = (size, color, value) => {
    setQuantity({
      ...quantity,
      [`${size}-${color}`]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !category || !size || !color || !image) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('size', size);
    formData.append('color', color);
    formData.append('image', image);
    formData.append('quantity', JSON.stringify(quantity));

    console.log('Submitting form with data:', {
      name, description, price, category, size, color, image, quantity
    });

    try {
      const res = await fetch('/api/products/create', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      const data = await res.json();
      alert('Product created successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`An error occurred while creating the product: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {step === 1 && (
        <>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            required
            className={styles.input}
          />
          <button type="button" onClick={handleNext} className={styles.button}>Next</button>
        </>
      )}
      {step === 2 && (
        <>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className={styles.textarea}
          />
          <button type="button" onClick={handlePrev} className={styles.button}>Back</button>
          <button type="button" onClick={handleNext} className={styles.button}>Next</button>
        </>
      )}
      {step === 3 && (
        <>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
            className={styles.input}
          />
          <button type="button" onClick={handlePrev} className={styles.button}>Back</button>
          <button type="button" onClick={handleNext} className={styles.button}>Next</button>
        </>
      )}
      {step === 4 && (
        <>
          <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required className={styles.input}>
            <option value="">Select Category</option>
            <option value="homem">Homem</option>
            <option value="mulher">Mulher</option>
            <option value="unissex">Unissex</option>
          </select>
          <button type="button" onClick={handlePrev} className={styles.button}>Back</button>
          <button type="button" onClick={handleNext} className={styles.button}>Next</button>
        </>
      )}
      {step === 5 && (
        <>
          <input
            type="text"
            id="color"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
            required
            className={styles.input}
          />
          <button type="button" onClick={handlePrev} className={styles.button}>Back</button>
          <button type="button" onClick={handleNext} className={styles.button}>Next</button>
        </>
      )}
      {step === 6 && (
        <>
          <select id="size" name="size" value={size} onChange={(e) => setSize(e.target.value)} required className={styles.input}>
            <option value="">Select Size</option>
            <option value="PP">PP</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
          </select>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            value={quantity[`${size}-${color}`] || ''}
            onChange={(e) => handleQuantityChange(size, color, e.target.value)}
            className={styles.input}
            required
          />
          <button type="button" onClick={handlePrev} className={styles.button}>Back</button>
          <button type="button" onClick={handleNext} className={styles.button}>Next</button>
        </>
      )}
      {step === 7 && (
        <>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
            className={styles.input}
          />
          <button type="button" onClick={handlePrev} className={styles.button}>Back</button>
          <button type="submit" className={styles.button}>Submit</button>
        </>
      )}
    </form>
  );
}
