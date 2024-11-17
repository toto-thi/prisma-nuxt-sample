<template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }} ({{ user.email }})</li>
    </ul>
  </div>
  <br>
  <div>
  <input v-model="newUser.id" type="number" placeholder="ID" />
  <input v-model="newUser.name" type="text" placeholder="Name" />
  <input v-model="newUser.email" type="email" placeholder="Email" />
  <button @click="addUser">Add User</button>
</div>
</template>


<script setup lang="ts">
interface User {
  id: number;
  name: string;
  email: string;
}

const users = ref<User[]>([]);

const newUser = ref<User>({ id: 0, name: '', email: '' });

const addUser = async () => {
    const response = await fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser.value)
    });
    const data = await response.json();
    users.value.push(data.user);
    newUser.value = { id: 0, name: '', email: '' };
  };
  
  onMounted(async () => {
  const response = await fetch("/api/users");
  const data = await response.json();
  users.value = data.users;
});
</script>
