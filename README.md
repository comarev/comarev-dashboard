# Comarev - Front End

# Welcome Contributors!

If you are new here, there are some things you need to know:
- This is a 100% volunteer-supported project, please be patient with your correspondence.
- Check the Development section before starting to contribute.
- This is the front end part of the Comarev project. Check the backend side by clicking [here](https://github.com/comarev/comarev).
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The core teams leads are: @belgamo @m-pereira

## README

## Origins
First of all, let's introduce what Comarev is. Comarev is a social project based in Batatais - São Paulo, Brazil. Their goal is to offer an opportunity and a new life for drug addicts by giving them full support through sports, work out and psychological treatment FOR FREE. You can get more information [here](http://comarev.com.br/). During the COVID-19 pandemic in 2020, they lost some financial support from the government and had to come up with new ideas to raise money for the project because they have a lot of costs and serious professionals working there.
Monthly, the institution used to get some money from contributors, so they wanted to expand the number of contributors by offering some benefits such as discounts in local stores, supermarkets and so on. To make this possible, they needed a system to control everything. Immediatelly, we opened up a group on discord and started meeting weekly to study and develop the code to release a MVP as soon as possible. And we got it!

## About
This application is a partner management system. Basically, the Comarev admins register the interested companies that want to give a discount on their products/services to the Comarev contributors who are also registered in the system. Then, when the contributor buys something at the company (Comarev partner), they just have to scan a QR Code emmited in our dashboard and the system will return if they are ok with the payment (contribution), or not. If so, the contributor can get a discount.

## Roadmap
Check [our board](https://github.com/comarev/comarev-dashboard/projects/2) for more details about what we're building.
- [x] Comarev dashboard MVP

The core of this system is ready and running on production. But there are lot of improvements we can do and we need your help!

## Development
### Tech Stack
Some of the most famous libraries that we're using:
- react
- redux
- axios
- styled-components
- react-hook-form + yup

### Pre-requisites
- Node `v12.19.0` or higher
- Yarn `v1.22.10` or higher

### Getting started
First of all, make sure you have your [backend](https://github.com/comarev/comarev) running.

Clone the project from Github:
```
git@github.com:comarev/comarev-dashboard.git
cd comarev-dashboard
```

Install dependencies:
```
yarn
```

Create a __.env__ file by copying the existing one:
```
cp .env.sample .env
```

Set the value of `REACT_APP_BASE_URL` pointing to your backend address and then run:

```
yarn start
```

## Application Concepts

### Users
A user can be an `admin`, `manager`, `emplyoee` or a `customer`.
 - Admins are the Comarev employees and can constrol the entire system. They are able to create the other kind of users. To become an admin, the user need the `admin` attibute `true`.
 - Managers are the company managers. They can emmit their QR Code and also check if a user is able to get discount. To become a manager, the user needs to be assigned to a company.
 - Employees do the same as managers, but they can't invite other employees or manage the company config.
 - Customers are the Comarev contributors. They are supposed to pay invoices and get discounts. If the user is neither an admin nor a manager, he's a customer.

### Companies
A company is a comarev partner. They offer discounts to the Comarev contributors.

### Invoices
A invoice is created for a user. When all invoices are paid, the user is able to get a discount. Invoices can only be created and mark as paid by an admin user, but customers can visualize them.

### 



Thanks!
