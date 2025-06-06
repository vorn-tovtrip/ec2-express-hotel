pipeline {
    agent any

    environment {
        EC2_USER = "ec2-user"
        EC2_HOST = "3.83.158.214"
        BACK_END_VERSION ="1.0.${BUILD_ID}"
    }

    stages {

        stage('Pre Deploy Docker') {
            steps {  
                echo 'Cleaning the workspace...'
            }
     
        }

stage('Build and Push Docker Image') {
  steps {
    withCredentials([usernamePassword(credentialsId: 'docker-hub-registry', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
      sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

      // Build the Docker image
      sh 'docker build -t vorni/hotel-express-ec2 .'

      // Push the Docker image
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
  ssh -t -o StrictHostKeyChecking=no -i "$PEM_FILE" "$EC2_USER@$EC2_HOST" << 'EOF'

pwd
    cd backend/ec2-express-hotel
    pwd
    echo "Pulling git"
    git pull
    docker pull vorni/hotel-express-ec2
    echo 'backend version is $BACK_END_VERSION '
    pwd
     echo 'BACK_END_VERSION=$BACK_END_VERSION'>>.env.dev
     cat .env.dev
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
            cleanWs()  
            echo 'Task has completed'
            
        }
    }
}
