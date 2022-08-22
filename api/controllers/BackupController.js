const mysqlConnect = require('../config');

const runBackup = (req, res) => {
    const cron = require('node-cron')
    const moment = require('moment')
    const fs = require('fs')
    const spawn = require('child_process').spawn
    const uuid = require('uuid');
    
    // Use moment.js or any other way to dynamically generate file name
    const fileName = `${process.env.DB_NAME_DATABASE}_${moment().format('YYYY_MM_DD')}.sql`
    const wstream = fs.createWriteStream(`api/backups/${fileName}`)
    console.log('---------------------')
    console.log('Running Database Backup Cron Job')
    const mysqldump = spawn('mysqldump', [ '-u', process.env.DB_USER, `-p${process.env.DB_PASSWORD}`, process.env.DB_NAME_DATABASE ])

    mysqldump 
        .stdout
        .pipe(wstream)
        .on('finish', () => {
        console.log('DB Backup Completed!')
            res.json({message: 'ok'})
        })
        .on('error', (err) => {
        console.log(err)
        })
}

const runRestore = (req, res) => {
    const cron = require('node-cron')
    const moment = require('moment')
    const fs = require('fs')
    const spawn = require('child_process').spawn
    const uuid = require('uuid');
    
    // Use moment.js or any other way to dynamically generate file name
    /* const fileName = `${process.env.DB_NAME_DATABASE}_${moment().format('YYYY_MM_DD')}.sql`
    const wstream = fs.createWriteStream(`api/backups/${fileName}`) */
    console.log('---------------------') 
    console.log('Running Restore Database Cron Job')
    const mysqldump = spawn('mysqldump', ['-u', process.env.DB_USER,  '–p', process.env.DB_NAME_DATABASE  < `api/backups/cabotaje_supplier_2022_08_16.sql`])

    mysqldump 
        .stdout
        .pipe(wstream)
        .on('finish', () => {
        console.log('DB Restore Completed!')
        })
        .on('error', (err) => {
        console.log(err)
        })
}

module.exports = {
    runBackup,
    runRestore
}