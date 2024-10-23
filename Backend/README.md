
# 🛠️ Science Fixit Backend

## 🏓 Table of Contents

- [🛠️ Science Fixit Backend](#️-science-fixit-backend)
  - [🏓 Table of Contents](#-table-of-contents)
  - [🤔 What is Science Fixit Backend?](#-what-is-science-fixit-backend)
  - [🛠️ Features](#️-features)
  - [🚀 Technologies](#-technologies)
  - [⚙️ Setup and Installation](#️-setup-and-installation)
  - [📝 License](#-license)
  - [💕 Contributors](#-contributors)

## 🤔 What is Science Fixit Backend?

The **Science Fixit Backend** serves as the server-side component of the Science Fixit platform. It is responsible for managing data, processing requests, and ensuring smooth communication between the frontend and the database. This backend system allows users to report repairs, track the status of their requests, and manage user roles, all while maintaining secure data handling and efficient database interactions. Built using modern technologies, it is designed to be scalable and reliable, providing a seamless experience for users at the Faculty of Science at King Mongkut's Institute of Technology Ladkrabang (KMITL).

## 🛠️ Features

1. **Report Repairs**: Easily report issues or request repairs for equipment.
2. **View Repair Requests with Status**: Check submitted requests along with their current status.
3. **User Management**: Effectively manage both technician users and general users.
4. **Repair Statistics**: View statistics on repair request statuses in chart form.

## 🚀 Technologies

- 💻 **TypeScript** - A typed superset of JavaScript for better code quality.
- 🐦 **NestJS** - A framework for building scalable server-side applications.
- 🗄️ **Prisma** - An ORM for simplified database management.
- 🐘 **PostgreSQL** - A powerful open-source relational database.
- 🐳 **Docker** - A platform for containerizing applications.
- 🌐 **Node.js** - A JavaScript runtime for server-side development.
- ⚡ **Bun** - A fast JavaScript runtime for running and bundling apps.

## ⚙️ Setup and Installation

To set up the Science Fixit Backend, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jumpogpo/science-fixit.git
   cd science-fixit
   ```

2. **Create and Configure the .env File**:
   - Copy the `.env.example` file to `.env`.
   - Add the following environment variables in your `.env` file:
     ```
     DATABASE_URL=<your_database_url>
     JWT_SECRET=<your_jwt_secret>
     GOOGLE_CLIENT_ID=<your_google_client_id>
     GOOGLE_CLIENT_SECRET=<your_google_client_secret>
     ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Database Container:**:
    - Before starting the container, ensure you set the database POSTGRES_USER and POSTGRES_PASSWORD in the [docker-compose.yml](./docker-compose.yml) file.
    - Then, run:
    ```bash
    docker compose up -d
    ```

5. **Migrate the Database with Prisma**:
   ```bash
   npx prisma migrate dev
   ```

6. **Run the Application**:
   ```bash
   npm run start:dev
   ```
    Once the application is running, you can access the AP  documentation at [http://localhost:3000/docs](http://localhost:3000/docs) to explore the available endpoints an their functionalities.

## 📝 License

This project is licensed under the GNU General Public License v3.0. For more details, please refer to the [LICENSE](../LICENSE) file.

## 💕 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/jumpogpo">
        <img src="https://avatars.githubusercontent.com/u/14148557?v=4" width="100px;" alt="jumpogpo"/>
        <br />
        <sub><b>jumpogpo</b></sub>
      </a>
      <br />
      <a title="Backend Developer" href="https://github.com/jumpogpo">💻</a>
    </td>
    <td align="center">
      <a href="https://github.com/chomphoo46">
        <img src="https://avatars.githubusercontent.com/u/140147946?v=4" width="100px;" alt="chomphoo46"/>
        <br />
        <sub><b>Chomphoo Inchan</b></sub>
      </a>
      <br />
      <a title="Frontend Developer" href="https://github.com/chomphoo46">🎨</a>
    </td>
  </tr>
</table>
