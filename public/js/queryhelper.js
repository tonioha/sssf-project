let queryUrl = 'https://env-3595870.jelastic.metropolia.fi/'; // change when using jelastic

// functions which are used by frontend when making graphql queries

const makeAQuery = async (query) => {
    let respJson;
    try {
        const resp = await fetch(queryUrl + 'graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(query)
        });
        respJson = await resp.json();
    } catch (err) {
        console.log(err);
    }
    return respJson;
};

// when query needs authentication
const makeATokenQuery = async (query) => {
    let respJson;
    try {
        const resp = await fetch(queryUrl + 'graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(query)
        });
        respJson = await resp.json();
    } catch (err) {
        console.log(err);
    }
    return respJson;
};