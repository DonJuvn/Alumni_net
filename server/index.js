const express = require("express");const bodyParser = require("body-parser");

const {
   getUsers,
   getUserById,
   saveUser,
   updateUser,
   deleteUser,
} = require("./database");

const app = express();
const port = 8000;

app.get("/api", (req, res) => {
   res.json({ users: ["Zhalgas", "Daniyar", "Yersultan"] });
});

app.get("/api/users", async (req, res) => {
   try {
      const users = await getUsers();
      res.json(users);
   } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

app.get("/api/users/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const user = await getUserById(id);
      res.json(user);
   } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

app.post("/api/users", async (req, res) => {
   try {
      const { email, firstname } = req.body;
      const user = await saveUser(email, firstname);
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
      await updateUser(id, updatedEmail, updatedFirstName);
      const updatedUser = await getUserById(id);
      res.json(updatedUser);
   } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});
app.delete("/api/users/:id", async (req, res) => {
   const { id } = req.params;

   try {
      await deleteUser(id);
      res.json({ message: "User deleted successfully" });
   } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
