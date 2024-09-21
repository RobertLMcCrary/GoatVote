// script.js

// API Base URL
const API_BASE_URL = "http://54.204.148.244:5001/api/votes"

// DOM Elements
const voteMjButton = document.getElementById('vote-mj');
const voteLebronButton = document.getElementById('vote-lebron');
const messageDisplay = document.getElementById('message');
const mjVotesDisplay = document.getElementById('count-mj');
const lebronVotesDisplay = document.getElementById('count-lebron');

// Function to display messages
function showMessage(text, type) {
    messageDisplay.textContent = text;
    messageDisplay.className = `message ${type}`;
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDisplay.textContent = '';
        messageDisplay.className = 'message';
    }, 3000);
}

//function to fetch MJ votes
async function fetchMjVotes() {
    try {
        const response = await fetch(`${API_BASE_URL}/mj`)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log(data.votes)
        mjVotesDisplay.textContent = `Votes: ${data.MichaelJordan}`
    }
    catch(error) {
        console.error('Error fetching MJ votes:', error)
    }
}

//function to fetch LeBron votes
async function fetchLeBronVotes() {
    try {
        const response = await fetch(`${API_BASE_URL}/lebron`)
        if (!response.ok) {
            console.error('Error fetching LeBron votes:', error)
        }
        const data = await response.json()
        lebronVotesDisplay.textContent = `Votes: ${data.LeBronJames}`
    }
    catch(error) {
        console.error('Error fetching LeBron votes:', error)
    }
}

//function to fetch all votes
function fetchAllVotes() {
    fetchLeBronVotes()
    fetchMjVotes()
}

// Function to cast a vote
async function castVote(candidate) {
    try {
        let endpoint = '';
        if (candidate === 'MJ') {
            endpoint = `${API_BASE_URL}/mj`;
        } else if (candidate === 'LeBron') {
            endpoint = `${API_BASE_URL}/lebron`;
        } else {
            throw new Error('Invalid candidate');
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ candidate })
        });

        const result = await response.json();

        if (response.ok) {
            showMessage(result.message, 'success');
            // Update the specific vote count
            if (candidate === 'MJ') {
                countMjDisplay.textContent = result.count;
            } else if (candidate === 'LeBron') {
                countLebronDisplay.textContent = result.count;
            }
        } else {
            showMessage(result.message || 'Error casting vote', 'error');
        }
    } catch (error) {
        console.error(error);
        showMessage('Error casting vote', 'error');
    }
    finally {
        //reload the page so they can see the vote count
        location.reload()
        fetchAllVotes()
    }
}

// Event Listeners
voteMjButton.addEventListener('click', () => {
    castVote('MJ');
});

voteLebronButton.addEventListener('click', () => {
    castVote('LeBron');
});

// Initial Fetch
window.addEventListener('DOMContentLoaded', fetchAllVotes);
