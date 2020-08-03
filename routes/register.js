const express = require('express')
const router = express.Router()
const flash = require('express-flash')
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



router.get('/',(req, res) => {
    res.render('register/index')
  })
  
router.get('/register', (req, res) => {
    res.render('register/index')
  })

  router.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }

    

    

   
  }) 

module.exports = router