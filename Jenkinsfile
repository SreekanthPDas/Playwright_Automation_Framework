pipeline {

agent any

tools {
    nodejs "NodeJS"
}

parameters {
    choice(
        name: 'ENV',
        choices: ['dev', 'qa', 'stage'],
        description: 'Select Environment to run tests'
    )
}

environment {
    ENV = "${params.ENV}"
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

    stage('Debug Environment') {
        steps {
            bat 'echo Running tests in ENV=%ENV%'
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
