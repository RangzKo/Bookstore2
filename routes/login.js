const express = require('express')
const router = express.Router()
const flash = require('express-flash')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt')

const users = []

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }



router.get('/', (req, res) => {
    res.render('login/index',)
  })

  router.get('/login', (req, res) => {
    res.render('/')
  })

  router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  module.exports = router