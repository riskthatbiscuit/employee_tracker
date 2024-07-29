const express = require('express')
// Import and require mysql2

const mysql = require('mysql2')
const cors = require('cors')
const path = require('path'); // Ensure path is imported
const questions = require('./queries/questions.js')
const {
  viewAllEmployees,
  viewAllDepartments,
  viewAllRoles,
  executeQuery,
  viewEmployeeById,
  viewEmployeesManagedBy,
} = require('./queries/displays.js')
const {
  addDepartment,
  addRole,
  addEmployee,
} = require('./queries/additions.js')
const {
  deleteDepartment,
  deleteRole,
  deleteEmployee,
} = require('./queries/deletions.js')

const PORT = process.env.PORT || 3001
const app = express()

// Cors middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  }),
)

// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'banjo',
    database: process.env.DB_NAME || 'employee_db',
    port: process.env.DB_PORT || 3306,
  },
  console.log(`Connected to the employee_db database.`),
)

// Views
app.get('/api/employees', (req, res) => {
  viewAllEmployees(db, (result) => {
    res.json(result)
  })
})

app.get('/api/departments', (req, res) => {
  viewAllDepartments(db, (result) => {
    res.json(result)
  })
})

app.get('/api/roles', (req, res) => {
  viewAllRoles(db, (result) => {
    res.json(result)
  })
})

app.get('/api/employees/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  viewEmployeeById(db, id, (result) => {
    res.json(result)
  })
})

app.get('/api/employees/managed-by/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  viewEmployeesManagedBy(db, id, (result) => {
    res.json(result)
  }
)})

// Additions
app.post('/api/employees', (req, res) => {
  console.log(req.body)
  const { first_name, last_name, job_title, manager } = req.body
  addEmployee(db, first_name, last_name, job_title, manager)

  res.json('Employee added')
})

app.post('/api/departments', (req, res) => {
  console.log(req.body)
  const { department_name } = req.body
  addDepartment(db, department_name)
  res.json('Department added')
})

app.post('/api/roles', (req, res) => {
  const { title, salary, department } = req.body
  addRole(db, title, salary, department)
  res.json('Role added')
})

// Deletions
app.delete('/api/departments/:id', (req, res) => {
  const id = req.params.id
  deleteDepartment(db, id)
  res.json('Department deleted')
})

app.delete('/api/roles/:id', (req, res) => {
  const id = req.params.id
  deleteRole(db, id)
  res.json('Role deleted')
})
app.delete('/api/employees/:id', (req, res) => {
  const id = req.params.id
  deleteEmployee(db, id)
  res.json('Employee deleted')
})

// Catch-all handler to serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
