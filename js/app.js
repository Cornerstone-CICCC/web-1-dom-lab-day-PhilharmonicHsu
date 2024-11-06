let emailInput = document.querySelector('#email');
emailInput.setAttribute('pattern', '[a-zA-Z0-9]+@canada\\.ca');
emailInput.setAttribute('title', 'Only @canada.ca employees can register');
emailInput.addEventListener('input', function () {
    emailInput.setCustomValidity('')

    if (! emailInput.validity.valid) {
        emailInput.setCustomValidity('Only @canada.ca employees can register');
    }
});

const form = document.querySelector('form');
const tableBody = document.querySelector('#employeeList');

let userId = 1;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const currentUserId = userId;

    tableBody.appendChild(
        getEmployeeRow(new FormData(form))
    )

    document.querySelector(`#delete_user_${currentUserId}`)
        .addEventListener('click', (e) => {
            if (confirm("Are you sure?") === true) {
                let deletedEmployee = document.querySelector(`#user_${currentUserId}`)
                tableBody.removeChild(deletedEmployee);
            }
        });

    userId+=1;

    form.reset();
})

function getEmployeeRow(formData) {
    const firstName = formData.get('firstname');
    const lastName = formData.get('lastname');
    const email = formData.get('email');
    const hireDate = formData.get('hire_date');
    const photo = formData.get('photo');

    const employeeRow = document.createElement('tr');

    employeeRow.id = `user_${userId}`;
    employeeRow.innerHTML = `
      <td class="avatar"><img src="images/${photo.name}" alt="${photo.name}"></td>
      <td class="first-name">${firstName}</td>
      <td class="last-name">${lastName}</td>
      <td class="email">${email}</td>
      <td class="hire-date">${hireDate}</td>
      <td class="delete-btn" id="delete_user_${userId}"><button>delete</button></td>
    `;

    return employeeRow;
}