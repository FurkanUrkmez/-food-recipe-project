import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingIngredient, setEditingIngredient] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchIngredients();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:3000/categories');
    setCategories(response.data);
  };

  const fetchIngredients = async () => {
    const response = await axios.get('http://localhost:3000/ingredients');
    setIngredients(response.data);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/categories', 
        { name: newCategory },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setNewCategory('');
      fetchCategories();
      alert('Kategori eklendi!');
    } catch (error) {
      alert('Kategori eklenemedi!');
    }
  };

  const handleAddIngredient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/ingredients', 
        { name: newIngredient },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setNewIngredient('');
      fetchIngredients();
      alert('Malzeme eklendi!');
    } catch (error) {
      alert('Malzeme eklenemedi!');
    }
  };

  const handleUpdateCategory = async (id, name) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/categories/${id}`, 
        { name },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setEditingCategory(null);
      fetchCategories();
      alert('Kategori güncellendi!');
    } catch (error) {
      alert('Kategori güncellenemedi!');
    }
  };

  const handleUpdateIngredient = async (id, name) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/ingredients/${id}`, 
        { name },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setEditingIngredient(null);
      fetchIngredients();
      alert('Malzeme güncellendi!');
    } catch (error) {
      alert('Malzeme güncellenemedi!');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCategories();
        alert('Kategori silindi!');
      } catch (error) {
        alert('Kategori silinemedi!');
      }
    }
  };

  const handleDeleteIngredient = async (id) => {
    if (window.confirm('Bu malzemeyi silmek istediğinize emin misiniz?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/ingredients/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchIngredients();
        alert('Malzeme silindi!');
      } catch (error) {
        alert('Malzeme silinemedi!');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1>Admin Panel</h1>
      
      <div style={styles.section}>
        <h2>Kategoriler</h2>
        <form onSubmit={handleAddCategory} style={styles.form}>
          <input
            type="text"
            placeholder="Yeni kategori"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.addButton}>Ekle</button>
        </form>
        
        <div style={styles.list}>
          {categories.map(cat => (
            <div key={cat.id} style={styles.item}>
              {editingCategory === cat.id ? (
                <input
                  type="text"
                  defaultValue={cat.name}
                  onBlur={(e) => handleUpdateCategory(cat.id, e.target.value)}
                  style={styles.editInput}
                  autoFocus
                />
              ) : (
                <span onClick={() => setEditingCategory(cat.id)} style={styles.itemName}>
                  {cat.name}
                </span>
              )}
              <button 
                onClick={() => handleDeleteCategory(cat.id)}
                style={styles.deleteButton}
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2>Malzemeler</h2>
        <form onSubmit={handleAddIngredient} style={styles.form}>
          <input
            type="text"
            placeholder="Yeni malzeme"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.addButton}>Ekle</button>
        </form>
        
        <div style={styles.list}>
          {ingredients.map(ing => (
            <div key={ing.id} style={styles.item}>
              {editingIngredient === ing.id ? (
                <input
                  type="text"
                  defaultValue={ing.name}
                  onBlur={(e) => handleUpdateIngredient(ing.id, e.target.value)}
                  style={styles.editInput}
                  autoFocus
                />
              ) : (
                <span onClick={() => setEditingIngredient(ing.id)} style={styles.itemName}>
                  {ing.name}
                </span>
              )}
              <button 
                onClick={() => handleDeleteIngredient(ing.id)}
                style={styles.deleteButton}
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  section: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  addButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  itemName: {
    flex: 1,
    cursor: 'pointer'
  },
  editInput: {
    flex: 1,
    padding: '0.5rem',
    border: '1px solid #3498db',
    borderRadius: '4px'
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default AdminPanel;