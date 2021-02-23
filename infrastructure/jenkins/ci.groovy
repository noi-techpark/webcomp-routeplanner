pipeline {
    agent {
        dockerfile {
            filename 'infrastructure/docker/node.dockerfile'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=$(id -u jenkins) --build-arg JENKINS_GROUP_ID=$(id -g jenkins)'
        }
    }
    options {
        ansiColor('xterm')
    }
    stages {
        stage('Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                // FIXME
                sh '''
                    echo "FIXME: yarn run lint missing"
                    echo "FIXME: yarn run test missing"
                '''
            }
        }
        stage('Build') {
            steps {
                sh 'yarn run build'
            }
        }
    }
}
