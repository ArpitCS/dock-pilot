/* Container template definitions for the Container Lab page */

const containerTemplates = {
  mysql: {
    name: "MySQL",
    thumbnail: "https://cdn.simpleicons.org/mysql/ffffff",
    image: "mysql:8.0",
    port: "3306:3306",
    env: [
      "MYSQL_ROOT_PASSWORD=rootpassword",
      "MYSQL_DATABASE=mydatabase",
      "MYSQL_USER=user",
      "MYSQL_PASSWORD=password"
    ].join("\n"),
    volumes: [
      "./mysql-data:/var/lib/mysql"
    ].join("\n"),
    options: "--restart=unless-stopped",
    category: "database",
    description: "MySQL is an open-source relational database management system.",
    version: "8.0",
    pulls: "30k+",
    background: "bg-gradient-to-r from-blue-500 to-indigo-600",
    badge: {
      bg: "bg-blue-100",
      text: "text-blue-800",
    },
    config: `version: '3'
services:
  mysql:
    image: mysql:8.0
    container_name: mysql-db
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=mydatabase
      - MYSQL_USER=user
      - MYSQL_PASSWORD=password
    volumes:
      - ./mysql-data:/var/lib/mysql
    restart: unless-stopped`
  },

  postgres: {
    name: "PostgreSQL",
    thumbnail: "https://cdn.simpleicons.org/postgresql/ffffff",
    image: "postgres:15",
    port: "5432:5432",
    env: [
      "POSTGRES_USER=postgres",
      "POSTGRES_PASSWORD=password",
      "POSTGRES_DB=postgres"
    ].join("\n"),
    volumes: [
      "./postgres-data:/var/lib/postgresql/data"
    ].join("\n"),
    options: "--restart=unless-stopped",
    category: "database",
    description: "PostgreSQL is an advanced, enterprise-class, open-source RDBMS.",
    version: "15",
    pulls: "25k+",
    background: "bg-gradient-to-r from-emerald-500 to-teal-600",
    badge: {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
    },
    config: `version: '3'
services:
  postgres:
    image: postgres:15
    container_name: postgres-db
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=postgres
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    restart: unless-stopped`
  },

  nginx: {
    name: "Nginx",
    thumbnail: "https://cdn.simpleicons.org/nginx/ffffff",
    port: "80:80",
    env: "",
    volumes: [
      "./nginx/html:/usr/share/nginx/html"
    ].join("\n"),
    options: "--restart=unless-stopped",
    category: "web",
    description: "Nginx is a high-performance web server, reverse proxy, and load balancer.",
    version: "1.25",
    pulls: "50k+",
    background: "bg-gradient-to-r from-green-500 to-lime-600",
    badge: {
      bg: "bg-green-100",
      text: "text-green-800",
    },
    config: `version: '3'
services:
  nginx:
    image: nginx:1.25
    container_name: nginx-web
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/html:/usr/share/nginx/html
    restart: unless-stopped
networks:
  default:
    driver: bridge`
  },

  wordpress: {
    name: "WordPress",
    thumbnail: "https://cdn.simpleicons.org/wordpress/ffffff",
    image: "wordpress:latest",
    port: "80:80",
    env: [
      "WORDPRESS_DB_HOST=db:3306",
      "WORDPRESS_DB_USER=wordpress",
      "WORDPRESS_DB_PASSWORD=wordpress",
      "WORDPRESS_DB_NAME=wordpress"
    ].join("\n"),
    volumes: [
      "./wordpress:/var/www/html"
    ].join("\n"),
    options: "--link mysql-db:db --restart=unless-stopped",
    category: "cms",
    description: "WordPress is a free and open-source CMS written in PHP and paired with MySQL.",
    version: "latest",
    pulls: "40k+",
    background: "bg-gradient-to-r from-blue-400 to-cyan-500",
    badge: {
      bg: "bg-blue-100",
      text: "text-blue-800",
    },
    config: `version: '3'
services:
  db:
    image: mysql:5.7
    container_name: mysql-db
    environment:
      - MYSQL_ROOT_PASSWORD=somewordpress
      - MYSQL_DATABASE=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=wordpress
    volumes:
      - db_data:/var/lib/mysql
    restart: unless-stopped

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    container_name: wordpress
    ports:
      - "80:80"
    environment:
      - WORDPRESS_DB_HOST=db:3306
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress
      - WORDPRESS_DB_NAME=wordpress
    volumes:
      - wordpress:/var/www/html
    restart: unless-stopped
volumes:
  db_data: {}
  wordpress: {}`
  },

  redis: {
    name: "Redis",
    thumbnail: "https://cdn.simpleicons.org/redis/ffffff",
    image: "redis:7.0",
    port: "6379:6379",
    env: "",
    volumes: [
      "./redis-data:/data"
    ].join("\n"),
    options: "--restart=unless-stopped",
    category: "tools",
    description: "Redis is an in-memory data structure store, used as a database, cache, and message broker.",
    version: "7.0",
    pulls: "35k+",
    background: "bg-gradient-to-r from-red-500 to-pink-500",
    badge: {
      bg: "bg-red-100",
      text: "text-red-800",
    },
    config: `version: '3'
services:
  redis:
    image: redis:7.0
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - ./redis-data:/data
    command: ["redis-server", "--appendonly", "yes"]
    restart: unless-stopped`
  },

  mongodb: {
    name: "MongoDB",
    thumbnail: "https://cdn.simpleicons.org/mongodb/ffffff",
    image: "mongo:6.0",
    port: "27017:27017",
    env: [
      "MONGO_INITDB_ROOT_USERNAME=admin",
      "MONGO_INITDB_ROOT_PASSWORD=password"
    ].join("\n"),
    volumes: [
      "./mongo-data:/data/db"
    ].join("\n"),
    options: "--restart=unless-stopped",
    category: "tools",
    description: "MongoDB is a source-available cross-platform document-oriented database program.",
    version: "6.0",
    pulls: "32k+",
    background: "bg-gradient-to-r from-purple-500 to-violet-600",
    badge: {
      bg: "bg-purple-100",
      text: "text-purple-800",
    },
    config: `version: '3'
services:
  mongo:
    image: mongo:6.0
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - ./mongo-data:/data/db
    restart: unless-stopped`
  }
};

// Export for Node or browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { containerTemplates };
} else {
  window.containerTemplates = containerTemplates;
}
