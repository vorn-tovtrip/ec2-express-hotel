pipeline {
    agent any

    environment {
        EC2_USER = "ec2-user"
        EC2_HOST = "3.83.158.214"
    }

    stages {

        stage('Pre Deploy Docker') {
            steps {
                // cleanWs()
                echo 'Cleaning the workspace...'
            }
     
        }

    stage('Docker Push Image') {
  steps {
    withCredentials([usernamePassword(credentialsId: 'docker-hub-registry', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
      sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
      sh 'docker push vorni/hotel-express-ec2'
    }
  }
}


        stage('SSH EC2 AWS') {
            steps {
                withCredentials([file(credentialsId: 'ec2-pem', variable: 'PEM_FILE')]) {
                 sh """
  ssh -o StrictHostKeyChecking=no -i "$PEM_FILE" "$EC2_USER@$EC2_HOST"
  """
                }
            }

           
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }

  stage('Deploy hotel express') {
  steps {
    withCredentials([file(credentialsId: 'ec2-pem', variable: 'PEM_FILE')]) {
      sh """
        chmod 400 "$PEM_FILE"
        ssh -o StrictHostKeyChecking=no -i "$PEM_FILE" "$EC2_USER@$EC2_HOST" << 'EOF'
         
         docker --version
         docker pull vorni/hotel-express-ec2 
         docker stack deploy -c docker-compose.yml hotel
         docker stack services hotel
        EOF
      """
    }
  }
}

    }

    post {
        success {
            echo 'Task has completed'
        }
    }
}
