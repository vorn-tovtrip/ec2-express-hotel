pipeline {
    agent any
    stages {
        stage('Pre') {
            steps {
                cleanWs()
                echo 'Cleaning the workspace...'
               
            }
        }
        stage('Ssh to agent') {
            steps {
                sshagent(['ssh-express-hotel']) {
   sh '''
        ssh -o StrictHostKeyChecking=no -l cloudbees 3.83.158.214 "
            echo Connected to $(hostname);
            echo I am in;
            ls -la;
            whoami;
            uptime
        "
    '''
                     }
            }
        }

        stage('Test') {
            steps {
                echo 'Running github...'
           
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the project...'
                
                
            }
        }
        
    }
    post{
        success {
            echo 'Task has completed'
        }
    }
}
