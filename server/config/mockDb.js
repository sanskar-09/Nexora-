// Mock database for development when MongoDB is not available
const mockDb = {
  users: [],
  medications: [],
  healthData: [],
  symptomChecks: [],
  appointments: [],
  articles: [],
  
  // User methods
  findUserById: (id) => mockDb.users.find(user => user._id === id),
  findUserByEmail: (email) => mockDb.users.find(user => user.email === email),
  createUser: (userData) => {
    const newUser = { 
      _id: `user_${Date.now()}`, 
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockDb.users.push(newUser);
    return newUser;
  },
  
  // Medication methods
  findMedicationsByUser: (userId) => mockDb.medications.filter(med => med.user === userId),
  findMedicationById: (id) => mockDb.medications.find(med => med._id === id),
  createMedication: (medicationData) => {
    const newMedication = { 
      _id: `med_${Date.now()}`, 
      ...medicationData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockDb.medications.push(newMedication);
    return newMedication;
  },
  
  // Health data methods
  findHealthDataByUser: (userId) => mockDb.healthData.filter(data => data.user === userId),
  findHealthDataById: (id) => mockDb.healthData.find(data => data._id === id),
  createHealthData: (healthData) => {
    const newHealthData = { 
      _id: `health_${Date.now()}`, 
      ...healthData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockDb.healthData.push(newHealthData);
    return newHealthData;
  },
  
  // Symptom check methods
  findSymptomChecksByUser: (userId) => mockDb.symptomChecks.filter(check => check.user === userId),
  findSymptomCheckById: (id) => mockDb.symptomChecks.find(check => check._id === id),
  createSymptomCheck: (symptomData) => {
    const newSymptomCheck = { 
      _id: `symptom_${Date.now()}`, 
      ...symptomData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockDb.symptomChecks.push(newSymptomCheck);
    return newSymptomCheck;
  },
  
  // Appointment methods
  findAppointmentsByUser: (userId) => mockDb.appointments.filter(
    apt => apt.patient === userId || apt.doctor === userId
  ),
  findAppointmentById: (id) => mockDb.appointments.find(apt => apt._id === id),
  createAppointment: (appointmentData) => {
    const newAppointment = { 
      _id: `apt_${Date.now()}`, 
      ...appointmentData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockDb.appointments.push(newAppointment);
    return newAppointment;
  },
  
  // Article methods
  findArticles: () => mockDb.articles,
  findArticleById: (id) => mockDb.articles.find(article => article._id === id),
  createArticle: (articleData) => {
    const newArticle = { 
      _id: `article_${Date.now()}`, 
      ...articleData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockDb.articles.push(newArticle);
    return newArticle;
  }
};

// Add some initial mock data
mockDb.users.push({
  _id: 'user_1',
  name: 'Dr. John Smith',
  email: 'doctor@example.com',
  password: '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LG1dXgGkFAuDzTxKhJF8PHhv/hMtHDO', // "password"
  role: 'doctor',
  createdAt: new Date(),
  updatedAt: new Date()
});

mockDb.users.push({
  _id: 'user_2',
  name: 'Jane Doe',
  email: 'patient@example.com',
  password: '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LG1dXgGkFAuDzTxKhJF8PHhv/hMtHDO', // "password"
  role: 'patient',
  createdAt: new Date(),
  updatedAt: new Date()
});

mockDb.users.push({
  _id: 'user_3',
  name: 'Admin User',
  email: 'admin@example.com',
  password: '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LG1dXgGkFAuDzTxKhJF8PHhv/hMtHDO', // "password"
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
});

export default mockDb;
