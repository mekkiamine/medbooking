import React, { useState } from 'react';
import './signin.css';

export const SignInPat = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    tel: '',
    email: '',
    mot_de_passe: '',
    city: '', // Added field for city
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/patient/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Patient registered successfully');
        // Optionally, redirect or show a success message
      } else {
        const errorMessage = await response.text();
        console.error('Failed to register patient:', errorMessage);
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
        crossOrigin="anonymous"
      />
      <body>
        <section className="login">
          <div className="login_box">
            <div className="left">
              <div className="top_link">
                <h3>Welcome To MedBooking</h3>
              </div>
              <div className="contact">
                <form onSubmit={handleSubmit}>
                  <h3>SIGN IN</h3>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="adresse"
                    placeholder="Adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                  />
                  <input
                    type="tel"
                    name="tel"
                    placeholder="Téléphone"
                    value={formData.tel}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="mot_de_passe"
                    placeholder="Mot de passe"
                    value={formData.mot_de_passe}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <button type="submit" className="submit">
                    LET'S GO
                  </button>
                </form>
              </div>
            </div>
            {/* ... existing JSX ... */}
          </div>
        </section>
      </body>
    </>
  );
};
