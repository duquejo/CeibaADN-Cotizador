pipeline{
	
		agent {
		label 'Slave_Induccion'
		}
	
        
		triggers {
        pollSCM('@hourly')
		}
	
		options {
			buildDiscarder(logRotator(numToKeepStr: '5'))
			disableConcurrentBuilds()
		}
		
		stages{
		
			stage('Checkout') {
				steps {
                echo '------------>Checkout desde Git Microservicio<------------'
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default' , submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'GitHub_duquejo01', url: 'https://github.com/duquejo01/CeibaADN-Cotizador']]])
				}
			}
		
		
			stage('compilar servidor '){
                steps {
					dir('server') {
						sh 'npm i'
						sh 'npm run build'	
					}
				}
            }
            stage('test servidor '){
                steps {
					dir('server') {
                    	sh 'npm run test:cov'
					}					
				}
            }
		
			stage('compilar cliente '){
                steps {
					sh 'cd client'
                    sh 'npm i'
                    sh 'npm run build'					
				}
            }
            stage('test cliente '){
                steps {
					sh 'cd client'
                    sh 'npm run test:coverage'					
				}
            }

			
			stage('Sonar Analysis'){
			 	steps{
			 		echo '------------>Analisis de código estático<------------'
			 		  withSonarQubeEnv('Sonar') {
                         sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=./sonar-project.properties"
                      }
			 	}
			 }

		}
		post {
			success {
				mail(to: 'jose.duque@ceiba.com.co',
				body:"Build success in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}",
				subject: "SUCCESSFULL CI: ${env.JOB_NAME}")
			}
			failure {
				mail(to: 'jose.duque@ceiba.com.co',
				body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
				subject: "ERROR CI: ${env.JOB_NAME}")
			}
		}	
			
}