
const express = require('express');
const fs = require('fs');
const mysql = require('mysql2');


const viewDept = () => {
    db.query('SELECT * FROM department', function (err, results) {
          if (err) {
            console.error(err);
          }
          console.log(results);
          console.table(results);
        }); 
};

module.exports = {viewDept};