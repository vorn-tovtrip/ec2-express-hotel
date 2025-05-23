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
    sshagent(['ec2']) {
 sh '''
    ls -la
    pwd
    ssh -o StrictHostKeyChecking=no ec2-user@3.83.158.214 ls
'''

                     }
            }
        }

        stage('Test') {
            steps {
                echo 'Running gitshussb...'
           
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying thes project...'
                
                
            }
        }
        
    }
    post{
        success {
            echo 'Task has completed'
        }
    }
}
