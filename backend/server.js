// Importing CORS
const cors = require('cors');
// Importing the cookie parser
const cookieParser = require('cookie-parser');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
//Test function 
app.get('/',(req, res)=>{
  res.json({message:"ekhdem ya maki)"})
})

// Connection to the database
mongoose.connect('mongodb://localhost:27017/MED-BOOKING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Creating mongoose models for each entity
const adminSchema = new mongoose.Schema({
  CIN: String,
  nom: String,
  prenom: String,
  adresse: String,
  tel: String,
  email: String,
  mot_de_passe: String,
});

const Admin = mongoose.model('Admin', adminSchema);

const medecinSchema = new mongoose.Schema({
  CIN: String,
  nom: String,
  prenom: String,
  adresse: String,
  tel: String,
  email: String,
  mot_de_passe: String,
  matricule: String,
  specialite: String,
  hopital: String,
});

const Medecin = mongoose.model('Medecin', medecinSchema);

const patientSchema = new mongoose.Schema({
  CIN: String,
  nom: String,
  prenom: String,
  adresse: String,
  tel: String,
  email: String,
  mot_de_passe: String,
});

const Patient = mongoose.model('Patient', patientSchema);

const agentSchema = new mongoose.Schema({
  CIN: String,
  nom: String,
  prenom: String,
  adresse: String,
  tel: String,
  email: String,
  mot_de_passe: String,
  id: String,
  hopital: String,
});

const Agent = mongoose.model('Agent', agentSchema);

// Middleware to parse JSON
app.use(bodyParser.json());

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, '#');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Routes

// sign up for admin 
app.post('/admin/register', async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
});

// login for admin 
app.post('/admin/login', async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(req.body.mot_de_passe, admin.mot_de_passe);
    if (!isMatch) {
      throw new Error('Unable to login');
    }

    const token = jwt.sign({ _id: admin._id.toString() }, '#');
    res.send({ admin, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// sign up for medecin 
app.post('/medecin/register', async (req, res) => {
  try {
    const medecin = new Medecin(req.body);
    await medecin.save();
    res.status(201).send(medecin);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login for Medecin
app.post('/medecin/login', async (req, res) => {
  try {
    const medecin = await Medecin.findOne({ email: req.body.email });
    if (!medecin) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(req.body.mot_de_passe, medecin.mot_de_passe);
    if (!isMatch) {
      throw new Error('Unable to login');
    }

    const token = jwt.sign({ _id: medecin._id.toString() }, '#');
    res.send({ medecin, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//sign up for agent 
app.post('/agent/register', async (req, res) => {
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.status(201).send(agent);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login for Agent
app.post('/agent/login', async (req, res) => {
  try {
    const agent = await Agent.findOne({ email: req.body.email });
    if (!agent) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(req.body.mot_de_passe, agent.mot_de_passe);
    if (!isMatch) {
      throw new Error('Unable to login');
    }

    const token = jwt.sign({ _id: agent._id.toString() }, '#');
    res.send({ agent, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// list of patients 
app.get('/admin/patients', authenticateUser, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to add a new patient (accessible for admin only)
app.post('/admin/patients', authenticateUser, async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route to delete a patient by ID
app.delete('/admin/patients/:id', authenticateUser, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to modify a patient by ID
app.patch('/admin/patients/:id', authenticateUser, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['nom', 'prenom', 'adresse', 'tel', 'email', 'mot_de_passe'];

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// list of medecins 
app.get('/admin/medecins', authenticateUser, async (req, res) => {
  try {
    const medecins = await Medecin.find();
    res.status(200).send(medecins);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to add a new medecin (accessible to admin only)
app.post('/admin/medecins', authenticateUser, async (req, res) => {
  try {
    const medecin = new Medecin(req.body);
    await medecin.save();
    res.status(201).send(medecin);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route to delete a medecin by ID (accessible to admin only)
app.delete('/admin/medecins/:id', authenticateUser, async (req, res) => {
  try {
    const medecin = await Medecin.findByIdAndDelete(req.params.id);

    if (!medecin) {
      return res.status(404).send({ error: 'Medecin not found' });
    }

    res.status(200).send(medecin);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to modify a medecin by ID (accessible to admin only)
app.patch('/admin/medecins/:id', authenticateUser, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'nom',
    'prenom',
    'adresse',
    'tel',
    'email',
    'mot_de_passe',
    'matricule',
    'specialite',
    'hopital',
  ];

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const medecin = await Medecin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!medecin) {
      return res.status(404).send({ error: 'Medecin not found' });
    }

    res.status(200).send(medecin);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use(cookieParser());
app.use(cors());
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
