/* Update user */
function updateUser(id, form) {
    // Call PUT for updating the user
    console.log("updateUser");

    superagent.put('/users')
        .send({
            id: id,
            nom: form.lastname.value,
            prenom: form.firstname.value,
            email: form.email.value,
            password_clear : form.password.value,
            role: form.role.value
        })
        .then(function(){
            window.location.href = '/users'; // Reload users page
        });


}

/* Delete user */
function deleteUser(id) {
    // Call DELETE for removing the user
    superagent.delete(`/users/${id}`) // Delete current user
        .then(() => {
            window.location.href = '/users'; // Reload users page
        });
}

/* Show save button, replace role field by dropdown list */
function showForm(id) {
    console.log("LOG : show edit button");
    $(`#saveUserButton-${id}`).show();
    $(`#user-${id}-role`).prop('disabled',false);
    $(`#editUserButton-${id}`).hide();
    $(`#user-${id}-lastname`).prop('readonly', false);
    $(`#user-${id}-firstname`).prop('readonly', false);
    $(`#user-${id}-email`).prop('readonly', false);
    $(`#user-${id}-password`).prop('readonly', false);
}