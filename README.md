# cloud-thought

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Github-action](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![microsoft-azure](https://img.shields.io/badge/microsoft%20azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white)
![dynamodb](https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![multer](https://img.shields.io/badge/Multer-ff6600?style=for-the-badge&logoColor=white)

## Description

- A blog website where users can post their thoughts and upload images.

- The application is deployed on an [Azure Standard B2als v2](https://learn.microsoft.com/en-us/azure/virtual-machines/basv2) virtual machine, with a self-hosted runner to facilitate CI/CD workflows through GitHub Actions.

- Thoughts are stored in [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), while images are stored in an [Amazon S3 bucket](https://aws.amazon.com/s3/). The application follows the Infrastructure as a Service (IaaS) model.

View the deployed website: http://20.29.208.6

## Usage

Enter your name and thoughts, then click 'Submit' to post a thought. Click on the avatar of each thought card to view all posts from that user.

### Screenshot(s)

![demo](./client/public/assets/demo.png)

## Technologies Used

- Amazon Web Services
- Microsoft Azure
- Github Action
- Express
- Multer

## Contact

ruxinqu@gmail.com or open an issue on this repository
