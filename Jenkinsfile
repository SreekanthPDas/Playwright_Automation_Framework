pipeline {
    agent any

    tools {
        nodejs "NodeJS" 
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/SreekanthPDas/Playwright_Automation_Framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat "set ENV=${params.ENV} && npx playwright test"
            }
        }

    }

    post {

        always {
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
        }

        success {
            echo 'Tests Passed!'
        }

        failure {
            echo 'Tests Failed!'
        }
    }
}