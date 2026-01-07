import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchIngredients();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const handleIngredientChange = (ingredientId) => {
    if (selectedIngredients.includes(ingredientId)) {
      setSelectedIngredients(selectedIngredients.filter(id => id !== ingredientId));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/recipes', {
        title,
        instructions,
        imageUrl,
        prepTime: parseInt(prepTime),
        categoryId: parseInt(categoryId),
        ingredientIds: selectedIngredients
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Tarif eklendi!');
      navigate('/');
    } catch (error) {
      alert('Tarif eklenemedi!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>Yeni Tarif Ekle</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tarif Adı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Kategori Seçin</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Hazırlama Süresi (dakika)"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Görsel URL (opsiyonel)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Tarif (adım adım)"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            style={styles.textarea}
            rows="6"
            required
          />

          <div style={styles.ingredientsSection}>
            <h4>Malzemeler:</h4>
            <div style={styles.checkboxGrid}>
              {ingredients.map(ing => (
                <label key={ing.id} style={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(ing.id)}
                    onChange={() => handleIngredientChange(ing.id)}
                  />
                  {ing.name}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" style={styles.button}>Tarif Ekle</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  ingredientsSection: {
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '0.5rem',
    marginTop: '0.5rem'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  },
  button: {
    width: '100%',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

export default AddRecipe;