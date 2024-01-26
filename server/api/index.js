const express = require("express").router;
const bodyParser = require("body-parser");

const { get, getById, save, update, deleteById } = require("./database");

const app = express();
const port = 8000;
const database = "alumninet";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
   res.json({ users: ["Zhalgas", "Daniyar", "Yersultan"] });
});

router.route.get(`/api/${entity}`, async (req, res) => {
   try {
      const users = await getUsers(database);
      res.json(users);
   } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

app.get("/api/users/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const user = await getUserById(database, id);
      res.json(user);
   } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

app.post("/api/users", async (req, res) => {
   try {
      const { email, firstname } = req.body;
      const user = await saveUser(database, email, firstname);
      res.json(user);
   } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

app.put("/api/users/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const { updatedEmail, updatedFirstName } = req.body;
      const updatedUser = await updateUser(
         database,
         id,
         updatedEmail,
         updatedFirstName
      );
      res.json(updatedUser);
   } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});
app.delete("/api/users/:id", async (req, res) => {
   const { id } = req.params;

   try {
      await deleteUser(database, id);
      res.json({ message: "User deleted successfully" });
   } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
