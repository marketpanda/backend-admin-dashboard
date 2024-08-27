import express from 'express';
import { exec } from 'child_process'

const app = express()
app.use('/webhook', (req, res) => {
    const repo = req.body.repository.name
    const branch = req.body.ref.split('/').pop()
    const repo2 = req.repository.name
    const branch2 = req.ref.split('/').pop()

    console.log(repo)
    console.log(branch)
    console.log(repo2)
    console.log(branch2)

    //https://github.com/WTMSI/backend-watatrip-dashboard.git
    if (repo === 'backend-watatrip-dashboard' && branch === 'main') {
        exec('../deploy.sh', (error, stdout, strerr) => {
            if (error) {
                console.error(`execution error: ${error}`)
                return res.status(500).send(`Deployment failed`)
            }
            console.log(`stdout: ${stdout}`)
            console.log(`strerr: ${strerr}`)
            res.status(200).send('Deployed successfully!')
        })
    } else {
        res.status(200).send('Ignored')
    }
        
})

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Webhook server is listening on port ${PORT}`)
})