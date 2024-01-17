const sqlite3 = require("sqlite3").verbose();

const createArticulosTable = `CREATE TABLE IF NOT EXISTS articulos (
    id          INTEGER PRIMARY KEY,
    nombre      TEXT NOT NULL,
    descripcion TEXT,
    precio      DECIMAL(10,2),
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

const createProveedoresTable = `CREATE TABLE IF NOT EXISTS proveedores (
    id          INTEGER PRIMARY KEY,
    nombre      VARCHAR(200) NOT NULL,
    telefono    INTEGER(9),
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./db.sqlite",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to the SQLite database.");
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the articulos table if it doesn't exist
  db.run(createArticulosTable,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created articulos table.");

      // Clear the existing data in the articulos table
      db.run(`DELETE FROM articulos`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from articulos");

        // Insert new data into the articulos table
        const values1 = ["Teclado", "Mi teclado favorito", 22.01];
        const values2 = ["Monitor", "Monitor de 17 pulgadas", 99.99];

        const insertSql = `INSERT INTO articulos(nombre, descripcion, precio) VALUES(?, ?, ?)`;

        db.run(insertSql, values1, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted into articulos, ID ${id}`);
        });

        db.run(insertSql, values2, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted into articulos, ID ${id}`);
        });

        // Continue with the creation and population of the proveedores table
        db.run(createProveedoresTable,
          (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log("Created proveedores table.");

            // Clear the existing data in the proveedores table
            db.run(`DELETE FROM proveedores`, (err) => {
              if (err) {
                return console.error(err.message);
              }
              console.log("All rows deleted from proveedores");

              // Insert new data into the proveedores table
              const proveedorValues1 = ["Proveedor1", 123456789];
              const proveedorValues2 = ["Proveedor2", 987654321];

              const insertProveedorSql = `INSERT INTO proveedores(nombre, telefono) VALUES(?, ?)`;

              db.run(insertProveedorSql, proveedorValues1, function (err) {
                if (err) {
                  return console.error(err.message);
                }
                const id = this.lastID; // get the id of the last inserted row
                console.log(`Rows inserted into proveedores, ID ${id}`);
              });

              db.run(insertProveedorSql, proveedorValues2, function (err) {
                if (err) {
                  return console.error(err.message);
                }
                const id = this.lastID; // get the id of the last inserted row
                console.log(`Rows inserted into proveedores, ID ${id}`);
              });

              // Close the database connection after all insertions are done
              db.close((err) => {
                if (err) {
                  return console.error(err.message);
                }
                console.log("Closed the database connection.");
              });
            });
          }
        );
      });
    }
  );
});
