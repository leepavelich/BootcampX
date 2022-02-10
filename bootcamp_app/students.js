const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const args = process.argv.slice(2);
const cohortName = args[0];
const limit = args[1] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

pool.query(`
    SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
    FROM students
    JOIN cohorts ON cohorts.id = cohort_id
    WHERE cohorts.name LIKE $1
    LIMIT $2;
  `, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    })
  })
  .catch(err => console.error('query error', err.stack));