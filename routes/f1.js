const express = require('express');
const router = express.Router();
const { getF1Teams, getTeamById, addTeam, getF1Drivers, getDriverById, addDriver, getF1Principals, getPricipalById, addPrincipal } = require('../services/f1.dal')

router.get('/', async (req, res) => {
    try {
        let teams = await getF1Teams(); // from postgresql
        res.render('teams', {teams});
    } catch {
        res.render('503');
    }
});

router.get('/:id', async (req, res) => {
    try {
        let aTeam = await getTeamById(req.params.id); // from postgresql
        if (aTeam.length === 0)
            res.render('norecord')
        else
            res.render('teams', {aTeam});
    } catch {
        res.render('503');
    }
});

// issue here need to figue out how
router.post('/', async (req, res) => {
    if(DEBUG) console.log("actors.POST");
    try {
        await addTeam(req.body.name, req.body.country, req.body.engine );
        res.redirect('/teams/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    } 
});

module.exports = router