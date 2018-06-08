/* Update user */
function updateUser(id, form) {
    // Call PUT for updating the user
    superagent.put('/users')
        .send({
            id: id,
            nom: form.lastname.value,
            prenom: form.firstname.value,
            email: form.email.value,
            password_clear : form.password.value,
            role: form.role.value
        })
        .then(window.location.href = '/users'); // Log successful update
}

/* Delete user */
function deleteUser(id) {
    // Call DELETE for removing the user
    superagent.delete(`/users/${id}`) // Delete current user
        .then(() => {
            window.location.href = '/users'; // Reload users page
        });
}
