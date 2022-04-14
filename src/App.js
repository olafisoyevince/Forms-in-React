import './App.css';
import { useState, useReducer } from 'react';


const formReducer = (state, event) => {
  if(event.reset) {
    return {
      firstname: '',
      lastname: '',
      gender: '',
      email: '',
      address: '',
      bio: ''
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}


function App() {

  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    

    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true
      })
    }, 3500);
  };


  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }


  return (
    <div className="wrapper">
      <h1>Forms</h1>
      {submitting && 
      <div>
        You are submitting the following:
        <ul>
          {Object.entries(formData).map(([name, value]) => (
            <li key={name}><strong>{name}</strong>: {value.toString()}</li>
          ))}
        </ul>
      </div>
      }
      <form onSubmit={handleSubmit}>
        <fieldset disabled={submitting}>
          <label>
            <p>First Name</p>
            <input name="firstname" onChange={handleChange} value={formData.firstname || ''}/>
          </label>

          <label>
            <p>Last Name</p>
            <input name="lastname" onChange={handleChange} value={formData.lastname || ''}/>
          </label>

          <label>
            <p>Email</p>
            <input name="email" onChange={handleChange} value={formData.email || ''}/>
          </label>

          <label>
            <p>Gender</p>
              <select name="gender" onChange={handleChange} value={formData.gender || ''}>
                  <option value="">--Please choose an option--</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefernottosay">Prefer not to say</option>
              </select>
          </label>

          <label>
            <p>Address</p>
            <input name="address" onChange={handleChange} value={formData.address || ''}/>
          </label>

          <label>
            <p>Bio</p>
            <textarea name="bio" cols="30" rows="5" onChange={handleChange} value={formData.bio || ''}></textarea>
          </label>

        </fieldset>
        <button type="submit" disabled={submitting}>Submit</button>
      </form>
    </div>
  );
}

export default App;
