import express from 'express';
import { exec } from 'child_process'

const app = express()
const PORT = 4000

app.use(express.json())
app.post('/webhook', (req, res) => {
    const repo = req.body.repository.name
    const branch = req.body.ref.split('/').pop()
    
    console.log(repo)
    console.log(branch) 

    //https://github.com/WTMSI/backend-watatrip-dashboard.git
    if (repo === 'backend-watatrip-dashboard' && branch === 'main') {
        exec('../deploy.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`execution error: ${error}`)
                return res.status(500).send(`Deployment failed`)
            }
            console.log(`stdout: ${stdout}`)
            console.log(`stderr: ${stderr}`)
            res.status(200).send('Deployed successfully!')
        })
    } else {
        res.status(200).send('Ignored')
    }
        
})


app.listen(PORT, () => {
    console.log(`Webhook server is listening on port ${PORT}`)
})