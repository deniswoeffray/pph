/* Update user */
function updateUser(id, form) {
    // Call PUT for updating the user
    superagent.put('/users')
        .send({
            id: id,
            nom: form.lastname.value,
            prenom: form.firstname.value,
            email: form.email.value,
            password: form.password.value,
            role: form.role.value
        })
        .then(console.log('user saved')); // Log successful update
}

/* Delete user */
function deleteUser(id) {
    console.log(`/users/${id}`)
    // Call DELETE for removing the user
    superagent.delete(`/users/${id}`) // Delete current user
        .then(() => {
            console.log('user deleted'); // Log successful delete
            window.location.href = '/users'; // Reload users page
        });
}
