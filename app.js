const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');
const { active_jobs, users, users_details, global_jobs_count } = require('./src/dataHolder');
const { use } = require('express/lib/application');

app.use(express.json());

app.use(cors());

const port = 3000;

const corsOptions = {
    origin: 'http://localhost:4200'
};
  
app.use(cors(corsOptions));


/*app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.get('/about', (req, res) => {
    //console.log('about')
    res.send('About page');
});*/



//sign in a client
app.post('/sign-in-client', (req, res) => {
    //console.log("signing in = ",req.body);
    ////console.log(req,res)
    let userdata = req.body;
    
    for(let x=0;x<users.length;x++){
        let i = users[x]
        
        if(i['username']==userdata['username'] && i['password']==userdata['password']){
            //console.log("user found");
            res.send({'res':true})
            return;
        }
        
    }
    res.send({'res':false});
});


//sign up a client
app.post('/sign-up-client', (req, res) => {
    console.log("siging up = ",req.body);
    ////console.log(req,res)
    let userdata = req.body;
    //console.log(userdata + ' trying to sign up')
    users_details.push(
        {
            'username':userdata['username'],
            'password':userdata['password'],
            'name':userdata['name'],
            'email':'',
            'phone':'',
            'jobs':[],
            'pendingJobs':0,
            'activeJobs':0,
            'completedJobs':0
        }
    )
    users.push(
        {
            'username':userdata['username'],
            'password':userdata['password']
        }
    )

    console.log("current users = ",users);
    console.log("current users details = ",users_details);


    res.send({'res':true})
});

//get all details of a user
app.post('/get-all-details', (req, res) => {
    //console.log(req.body);
    let user = req.body;
    let x=0;
    for(let i=0;i<users_details.length;i++){
        if(users_details[i]['username']==user['username'] && users_details[i]['password']==user['password'])
        {
            x=i;
            break;
        }
    }
    ////console.log(req,res)
    res.send(users_details[x]);
});

//get active jobs of a client
app.post('/get-active-jobs', (req, res) => {
    //console.log(req.body);
    ////console.log(req,res)
    res.send(active_jobs);
});

//get pending jobs of a client

//get completed jobs of a client

//post a job of a client
app.post('/post-a-job', (req, res) => {
    //console.log("posting a job = ",req.body);
    let user = req.body['client'];
    let job = req.body['job'];
    job['id']="j-"+String(global_jobs_count)
    let x=0;
    for(let i=0;i<users_details.length;i++){
        if(users_details[i]['username']==user['username'] && users_details[i]['password']==user['password'])
        {
            users_details[i]['jobs'].push(job);
            users_details[i]['pendingJobs']+=1;
            x=i;
            break;
        }
    }
    ////console.log(req,res)
    res.send(users_details[x]);
});

//post user email
app.post('/post-user-email', (req, res) => {
    //console.log("posting a job = ",req.body);
    let user = req.body['client'];
    let email = req.body['email'];
    
    let x=0;
    for(let i=0;i<users_details.length;i++){
        if(users_details[i]['username']==user['username'] && users_details[i]['password']==user['password'])
        {
            users_details[i]['email']=email
            x=i;
            break;
        }
    }
    ////console.log(req,res)
    res.send(users_details[x]);
});

//post user phone
app.post('/post-user-phone', (req, res) => {
    //console.log("posting a job = ",req.body);
    let user = req.body['client'];
    let phone = req.body['phone'];
    
    let x=0;
    for(let i=0;i<users_details.length;i++){
        if(users_details[i]['username']==user['username'] && users_details[i]['password']==user['password'])
        {
            users_details[i]['phone']=phone
            x=i;
            break;
        }
    }
    ////console.log(req,res)
    res.send(users_details[x]);
});


//get details of a client

//get applications of a job posted by a client

//delete a job of a client
app.post('/delete-a-job', (req, res) => {
    //console.log("deleting a job = ",req.body);
    let user = req.body['client'];
    let jobID = req.body['jobID'];
    let x=0;
    for(let i=0;i<users_details.length;i++){
        if(users_details[i]['username']==user['username'] && users_details[i]['password']==user['password'])
        {
            for(let j=0;j<users_details[i]['jobs'].length;j++){
                if(users_details[i]['jobs']['id'] == jobID){
                    users_details[i]['jobs'].splice(j,1);
                    users_details[i]['pendingJobs']-=1;
                    break;
                }
            }
            break;
        }
    }
    ////console.log(req,res)
    res.send(users_details[x]);
});

//mark a active job as completed


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    //console.log("current users = ",users);
    //console.log("current users details = ",users_details);
});