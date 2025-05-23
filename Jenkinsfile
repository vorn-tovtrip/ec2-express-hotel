pipeline {
    agent any
    stages {
        stage('Pre') {
            steps {
              
                echo 'Cleaning the workspace...'
               
            }
        }
        stage('Ssh to agent') {
            steps {
        sshagent(['ssh-express-hotel']) {
 sh '''
    ls -la
    pwd
    ssh -o StrictHostKeyChecking=no ec2-user@3.83.158.214 "echo Connected && whoami && uptime"
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
