pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/SreekanthPDas/Playwright_Automation_Framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                results: [[path: 'allure-results']]
            ])
        }
    }
}