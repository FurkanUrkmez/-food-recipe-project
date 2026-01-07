import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>Yemek Tarifleri</Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Ana Sayfa</Link>
          {token ? (
            <>
              <Link to="/add-recipe" style={styles.link}>Tarif Ekle</Link>
              <Link to="/my-recipes" style={styles.link}>Tariflerim</Link>
              {user.role === 'admin' && (
                <Link to="/admin" style={styles.link}>Admin Panel</Link>
              )}
              <span style={styles.username}>{user.name}</span>
              <button onClick={handleLogout} style={styles.button}>Çıkış</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Giriş</Link>
              <Link to="/register" style={styles.link}>Kayıt Ol</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '1rem 0',
    marginBottom: '2rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem'
  },
  logo: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  username: {
    color: '#ecf0f1'
  },
  button: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Navbar;