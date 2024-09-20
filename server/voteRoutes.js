// voteRoutes.js
const express = require('express');
const router = express.Router();
const MJ = require('./models/MJ')
const Lebron = require('./models/Lebron')


const initializeVotes = async (req, res) => {
    try {
        const mjVote = await MJ.findOne()
        const lebronVote = await Lebron.findOne()

        if (!mjVote) {
            await MJ.create({ votes: 0 });
            console.log('Initialized vote count for Michael Jordan');
        }

        if (!lebronVote) {
            await Lebron.create({ votes: 0 });
            console.log('Initialized vote count for LeBron James');
        }
    }
    catch (error) {
        console.error(error)
    }
}

initializeVotes()

// GET /api/votes/mj - Retrieve Michael Jordan's vote count
router.get('/mj', async (req, res) => {
    try {
        const mjVote = await MJ.findOne();

        res.json({
            MichaelJordan: mjVote ? mjVote.votes : 0,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// GET /api/votes/lebron - Retrieve LeBron James' vote count
router.get('/lebron', async (req, res) => {
    try {
        const lebronVote = await Lebron.findOne();

        res.json({
            LeBronJames: lebronVote ? lebronVote.votes : 0,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



//post - vote for mj
router.post('/mj', async (req, res) => {
    try {

        const mjVote = await MJ.findOne()

        if (mjVote) {
            mjVote.votes += 1
            await mjVote.save()
            res.status(200).json({ message: 'Vote counted for Michael Jordan', count: mjVote.count })
        }
        else {
            res.status(400).json({ message: 'Michael Jordan candidate not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})

//post - vote for lebron
router.post('/lebron', async (req, res) => {
    try {

        const lebronVote = await Lebron.findOne()

        if (lebronVote) {
            lebronVote.votes += 1;
            await lebronVote.save();
            res.status(200).json({ message: 'Vote counted for LeBron James', count: lebronVote.count })
        }
        else {
            res.status(400).json({ message: 'LeBron James candidate not found' })
        }

    }
    catch (error) {
        res.status(400).json({ message: 'LeBron candidate not found' })
    }
})


// Export the router directly
module.exports = router;
