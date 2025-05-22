pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                cleanWs()
                echo 'Building the project...'
               
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
           
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
