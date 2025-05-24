pipeline {
    agent any

    environment {
        EC2_USER = "ec2-user"
        EC2_HOST = "3.83.158.214"
    }

    stages {
        stage('Pre') {
            steps {
                echo 'Cleaning the workspace...'
            }
        }

        stage('SSH to EC2') {
            steps {
                withCredentials([file(credentialsId: 'ec2-pem', variable: 'PEM_FILE')]) {
                    sh '''
                        chmod 400 "$PEM_FILE"
                        ssh -o StrictHostKeyChecking=no -i "$PEM_FILE" "$EC2_USER@$EC2_HOST" "echo '✅ Connected to EC2 instance!'"
                    '''
                }
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

    post {
        success {
            echo 'Task has completed'
        }
    }
}
